from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            self.send_verification_email(user, request)
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_verification_email(self, user, request):
        """Send account verification email to the user."""
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        current_site = get_current_site(request)
        relative_link = reverse(
            'verify-email', kwargs={'uidb64': uid, 'token': token})
        full_url = f'http://{current_site.domain}{relative_link}'
        print("Relative Link:", relative_link)
        print("Full URL:", full_url)

        email_subject = "Activate your account"
        email_message = render_to_string(
            'registration/activation_email.html',
            {'user': user, 'activation_url': full_url}
        )

        send_mail(
            email_subject,
            email_message,
            'jeeneetpulseofficial@gmail.com',
            [user.email],
            fail_silently=False,
            html_message=email_message
        )

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return Response({'message': 'Email verified successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid token!'}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'message': 'Invalid token!'}, status=status.HTTP_400_BAD_REQUEST)


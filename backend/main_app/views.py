from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer,UserProfileSerializer
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
from .serializers import UserAuthenticationSerializer
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken


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



class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserAuthenticationSerializer(
            data=request.data, 
            context={'request': request}
        )

        serializer.is_valid(raise_exception=True)
        token_data = serializer.validated_data
        access_token = token_data['access']
        refresh_token = token_data['refresh']

        response = Response(
            {"message": "Login successful."},
            status=status.HTTP_200_OK
        )

      
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            samesite='None',
            secure=True, 
        )

       
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            samesite='None',
            secure=True
        )

        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Try to get refresh token from cookie
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token is None:
            return Response({"detail": "Refresh token missing"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data={"refresh": refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)


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
    """
    Handles user authentication and sets access and refresh tokens
    in secure HttpOnly cookies.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        # Initialize the serializer with request data
        serializer = UserAuthenticationSerializer(
            data=request.data, 
            context={'request': request}
        )
        
        # Validate the data, raising an exception if it's invalid
        serializer.is_valid(raise_exception=True)

        # Extract token data from the validated serializer
        token_data = serializer.validated_data
        access_token = token_data['access']
        refresh_token = token_data['refresh']

        # Create a response object
        response = Response(
            {"message": "Login successful."},
            status=status.HTTP_200_OK
        )

        # Set the access token cookie 🍪
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,  # Prevents client-side JS from accessing the cookie
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            samesite='Lax', # Provides CSRF protection
            secure=not settings.DEBUG, # Ensures cookie is sent only over HTTPS in production
        )

        # Set the refresh token cookie 🍪
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True, # Prevents client-side JS from accessing the cookie
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            samesite='Lax', # Provides CSRF protection
            secure=not settings.DEBUG, # Ensures cookie is sent only over HTTPS in production
        )

        return response

class CustomTokenRefreshView(TokenRefreshView):
    """
    Custom token refresh view that reads the refresh token from an
    HttpOnly cookie and returns the new access token in another one.
    """
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response(
                {"error": "Refresh token not found in cookies."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Add the refresh token to the request data so that the
        # parent class can process it.
        request.data['refresh'] = refresh_token

        try:
            # Call the parent class's post method to refresh the token
            response = super().post(request, *args, **kwargs)

            if response.status_code == 200:
                access_token = response.data.get('access')

                # The parent class's response includes the new access token
                # in the body. We create a new response to set it in a cookie.
                new_response = Response(
                    {"message": "Access token refreshed successfully"},
                    status=status.HTTP_200_OK
                )
                
                new_response.set_cookie(
                    key='access_token',
                    value=access_token,
                    httponly=True,
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    samesite='Lax',
                    secure=settings.DEBUG is False,
                )
                return new_response

            return response # Return original error response if refresh failed
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

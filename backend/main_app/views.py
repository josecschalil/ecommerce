import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer, UserSerializer,UserProfileSerializer
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
from rest_framework_simplejwt.views import TokenRefreshView # type: ignore
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken  # type: ignore
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

User = get_user_model()

class UserRegisterView(APIView):
    permission_classes = [AllowAny]
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

        full_url = f"http://localhost:3000/verify-email/{uid}/{token}/"
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
class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Retrieve the refresh token from the cookie
            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token is None:
                return Response(
                    {"error": "Refresh token not found in cookies."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            # Prepare a response
            response = Response(
                {"message": "Logout successful."},
                status=status.HTTP_200_OK
            )

            # Delete the cookies from the user's browser
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')

            return response
            
        except Exception as e:
            return Response(
                {"error": "An error occurred during logout."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
       
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


class ProductListCreateView(APIView):
    permission_classes = [AllowAny]

    # GET: List all products
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

 
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProductDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            # Convert string to UUID object for querying
            uuid_obj = uuid.UUID(str(pk))  # Convert to string first
            return get_object_or_404(Product, pk=uuid_obj)
        except (ValueError, TypeError):
            # If it's not a valid UUID, return 404
            return get_object_or_404(Product, pk=None)  # This will always 404

    def get(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = self.get_object(pk)
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
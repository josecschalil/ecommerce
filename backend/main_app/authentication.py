from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CustomJWTAuthentication(JWTAuthentication):
    """
    Custom authentication class that reads the JWT access token from an
    HttpOnly cookie instead of the 'Authorization' header.
    """
    def authenticate(self, request):
        # Get the access token from the cookie
        access_token = request.COOKIES.get('access_token')

        if not access_token:
            return None # No token found, authentication fails

        # The rest of the logic relies on the parent class to validate the token
        try:
            # The 'enforce_csrf' check is part of the parent class but can cause
            # issues in a pure API setup. We'll manually validate the token.
            validated_token = self.get_validated_token(access_token)
            return self.get_user(validated_token), validated_token
        except Exception as e:
            # Token is invalid or expired
            return None

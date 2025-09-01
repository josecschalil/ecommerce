from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

class CustomJWTAuthentication(JWTAuthentication):
    """
    Custom authentication class that reads the JWT access token from an
    HttpOnly cookie.
    """
    def authenticate(self, request):
        # Get the access token from the cookie
        raw_token = request.COOKIES.get('access_token')

        if raw_token is None:
            # No token found in cookies, so no authentication is attempted.
            return None

        try:
            # Validate the token using the parent class's method
            validated_token = self.get_validated_token(raw_token)
            
            # Get the user associated with the validated token
            user = self.get_user(validated_token)
            
            return (user, validated_token)
        
        except InvalidToken:
            # If the token is invalid, you can handle it here.
            # For example, you might want to try refreshing the token.
            # For now, we'll just let it fail.
            return None

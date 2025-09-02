from django.urls import path
# Import your custom views
from .views import CookieTestView, UserProfileView, UserRegisterView, VerifyEmailView, LoginView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path("signup/", UserRegisterView.as_view(), name="user-signup"),
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('cookie-test/', CookieTestView.as_view(), name='cookie-test'),
]
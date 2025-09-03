from django.urls import path
# Import your custom views
from .views import  LogoutView, ProductDetailView, ProductListCreateView, UserProfileView, UserRegisterView, VerifyEmailView, LoginView, CustomTokenRefreshView

from rest_framework_simplejwt.views import (
    TokenVerifyView,
)

urlpatterns = [
    path("signup/", UserRegisterView.as_view(), name="user-signup"),
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('logout/', LogoutView.as_view(), name='logout'), 
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<uuid:pk>/', ProductDetailView.as_view(), name='product-detail'),
]
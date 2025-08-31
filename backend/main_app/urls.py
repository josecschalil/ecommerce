from django.urls import path
from .views import UserRegisterView, VerifyEmailView

urlpatterns = [
    path("signup/", UserRegisterView.as_view(), name="user-signup"),
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'),

]

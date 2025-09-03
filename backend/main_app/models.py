from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid


class UserManager(BaseUserManager):
    def create_user(self, email, name, phone, password=None, **extra_fields):

        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, phone=phone, **extra_fields)
        user.set_password(password)   # hash password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, phone, password=None, **extra_fields):

        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_superuser", True)  # required by PermissionsMixin
        extra_fields.setdefault("is_active", True)

        return self.create_user(email, name, phone, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    newsletter_subscription = models.BooleanField(default=False)

    # Required for Django auth
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"   # login using email
    REQUIRED_FIELDS = ["name", "phone"]  # extra fields asked when creating superuser

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    key_features = models.JSONField(default=list)  # Store array as JSON
    size = models.JSONField(default=list)          # Store array as JSON
    image1 = models.TextField(null=True)
    image2 = models.TextField(null=True)
    image3 = models.TextField(null=True)
    image4 = models.TextField(null=True)
    category = models.CharField(max_length=100)  # Could also be a ForeignKey if needed

    def __str__(self):
        return self.name
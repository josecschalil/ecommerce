from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("email", "name", "phone", "newsletter_subscription", "is_admin", "is_active")
    search_fields = ("email", "name", "phone")
    ordering = ("email",)

    list_filter = ("is_admin", "is_active", "is_superuser")

    fieldsets = (
        (None, {"fields": ("email", "name", "phone", "password")}),
        ("Permissions", {"fields": ("is_admin", "is_active", "is_superuser", "groups", "user_permissions")}),
        ("Other Info", {"fields": ("newsletter_subscription",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "name", "phone", "password1", "password2", "is_admin", "is_active"),
        }),
    )

admin.site.register(User, CustomUserAdmin)

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(
        max_length=150,
        blank=False,
        null=False,
        unique=True,
        error_messages={
            'unique': _("A user with that email already exists."),
        }
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


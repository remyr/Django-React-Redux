from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from . import views

urlpatterns = [
    url(r'^register$', views.UserCreate.as_view(), name='register'),
    url(r'^token', obtain_jwt_token),
    url(r'^check-token', verify_jwt_token),
    url(r'^refresh-token', refresh_jwt_token),
]
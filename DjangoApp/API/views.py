from django.contrib.auth import get_user_model
from rest_framework import generics

from .serializers import UserSerializer

User = get_user_model()


class UserCreate(generics.CreateAPIView):
    """
    Create an user instance.
    """
    permission_classes = ()
    authentication_classes = ()
    queryset = User.objects.all()
    serializer_class = UserSerializer


def jwt_response_payload_handler(token, user=None, request=None):
    """
    Object returned by the login view
    :param token: string
    :param user: User
    :param request:
    :return: Object
    """
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }

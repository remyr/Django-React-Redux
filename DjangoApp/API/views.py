from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.decorators import authentication_classes, permission_classes
from .serializers import UserSerializer

User = get_user_model()


@authentication_classes([])
@permission_classes([])
class UserCreate(generics.CreateAPIView):
    """
    Create an user instance.
    """
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
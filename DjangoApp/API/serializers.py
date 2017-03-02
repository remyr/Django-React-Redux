from django.contrib.auth import get_user_model
from rest_framework import serializers
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'confirmPassword')
        write_only_fields = ('password', 'confirmPassword')

    def create(self, validated_data):
        if validated_data['password'] != validated_data['confirmPassword']:
            raise serializers.ValidationError({'password': 'Passwords must be identical'})

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

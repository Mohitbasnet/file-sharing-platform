from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["id"] = user.id
        token["email"] = user.email
        return token


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "full_name",
            "profile_image",
            "is_organization",
            "password",
        ]

    def create(self, validated_data):
        role = validated_data.get("role")
        requested_user = self.context["request"].user

        if role == "admin" and requested_user.role != "admin":
            raise serializers.ValidationError(
                "You are not authorized to create admin user"
            )

        if not requested_user and role != "admin":
            user = CustomUser.objects.create_user(**validated_data)
            return user

        user_ = CustomUser.objects.create_user(**validated_data)
        return user_

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get("full_name", instance.full_name)
        instance.email = validated_data.get("email", instance.email)
        instance.profile_image = validated_data.get(
            "profile_image", instance.profile_image
        )

        password = validated_data.get("password")
        if password:
            instance.set_password(password)
        instance.save()
        return instance

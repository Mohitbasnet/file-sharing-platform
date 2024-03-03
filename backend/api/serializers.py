from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from users.serializers import UserSerializer


class OrganizationSerializer(ModelSerializer):
    members = serializers.SerializerMethodField()
    creator = UserSerializer(read_only=True)
    creator_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="creator", write_only=True
    )

    class Meta:
        model = Organization
        fields = ["id", "name", "created_at", "creator", "creator_id", "members"]

    def get_members(self, obj):
        members = obj.members.all()
        return OrganizationMemberSerializer(members, many=True).data


class OrganizationSummarySerializer(ModelSerializer):
    class Meta:
        model = Organization
        fields = ["id", "name", "created_at"]


class OrganizationMemberSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    organization_id = serializers.PrimaryKeyRelatedField(
        queryset=Organization.objects.all(), source="organization", write_only=True
    )
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="user", write_only=True
    )

    class Meta:
        model = OrganizationMember
        fields = ["id", "user", "user_id", "organization_id", "role", "created_at"]


class InvitationSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    organization = OrganizationSummarySerializer(read_only=True)
    organization_id = serializers.PrimaryKeyRelatedField(
        queryset=Organization.objects.all(), source="organization", write_only=True
    )
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="user", write_only=True
    )

    class Meta:
        model = Invitation
        fields = [
            "id",
            "user",
            "user_id",
            "status",
            "organization",
            "organization_id",
            "created_at",
        ]

from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from users.serializers import *
from typing import List, Dict, Any


class OrganizationSerializer(ModelSerializer):
    members = serializers.SerializerMethodField()
    creator = UserSerializer(read_only=True)
    creator_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="creator", write_only=True
    )

    class Meta:
        model = Organization
        fields = [
            "id",
            "name",
            "created_at",
            "creator",
            "creator_id",
            "members",
            "slug",
        ]

    def get_members(self, obj: Organization) -> List[Dict[str, Any]]:
        members = obj.members.all()
        return OrganizationMemberSerializer(members, many=True).data


class OrganizationSummarySerializer(ModelSerializer):
    class Meta:
        model = Organization
        fields = ["id", "name", "created_at", "slug"]


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
        fields = [
            "id",
            "user",
            "user_id",
            "organization_id",
            "role",
            "created_at",
        ]


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
            "message",
            "organization",
            "organization_id",
            "created_at",
        ]


class FileSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    organization = OrganizationSummarySerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="user", write_only=True
    )
    organization_id = serializers.PrimaryKeyRelatedField(
        queryset=Organization.objects.all(),
        source="organization",
        write_only=True,
        required=False,
    )

    class Meta:
        model = File
        fields = [
            "id",
            "user",
            "file",
            "file_name",
            "file_type",
            "file_path",
            "created_at",
            "is_private",
            "organization",
            "user_id",
            "organization_id",
            "is_trashed",
            "created_at",
        ]


class FileSummarySerializer(ModelSerializer):
    user = UserSummarySerializer(read_only=True)
    organization = OrganizationSummarySerializer(read_only=True)

    class Meta:
        model = File
        fields = [
            "id",
            "file",
            "user",
            "file_name",
            "file_type",
            "created_at",
            "is_private",
            "is_trashed",
            "organization",
        ]


class FavouriteSerializer(ModelSerializer):
    user = UserSummarySerializer(read_only=True)
    file = FileSummarySerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="user", write_only=True
    )
    file_id = serializers.PrimaryKeyRelatedField(
        queryset=File.objects.all(), source="file", write_only=True
    )

    class Meta:
        model = Favourite
        fields = ["id", "user", "file", "user_id", "file_id"]

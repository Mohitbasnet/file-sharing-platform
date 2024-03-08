from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from users.permissions import CustomPermission
from .serializers import *
from .models import *


class OrganizationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, CustomPermission]
    serializer_class = OrganizationSerializer
    lookup_field = "slug"

    def get_queryset(self):
        member = self.request.query_params.get("member", None)
        queryset = Organization.objects.select_related("creator")

        if member == "yes":
            queryset = queryset.filter(members__user=self.request.user)

        return queryset


class OrganizationMemberViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OrganizationMemberSerializer

    def get_queryset(self):
        org_id = self.request.query_params.get("org_id")
        queryset = OrganizationMember.objects.select_related("user", "organization")

        if org_id:
            queryset = queryset.filter(organization__id=org_id)

        return queryset


class InvitationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = InvitationSerializer

    def get_queryset(self):
        org_id = self.request.query_params.get("org_id")
        my_invitations = self.request.query_params.get("my_invitations")
        status = self.request.query_params.get("status")

        queryset = Invitation.objects.select_related("user", "organization")

        if org_id:
            queryset = queryset.filter(organization__id=org_id)

        if my_invitations == "true":
            queryset = queryset.filter(user=self.request.user)

        if status:
            queryset = queryset.filter(status=status)

        return queryset


class FileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = File.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return FileSummarySerializer
        return FileSerializer

    def get_queryset(self):
        own = self.request.query_params.get("own", None)
        org_id = self.request.query_params.get("org_id", None)
        queryset = File.objects.select_related("user", "organization")

        if own == "true":
            queryset = queryset.filter(user=self.request.user)

        if org_id:
            queryset = queryset.filter(organization__id=org_id)

        return queryset


class FavouriteViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, CustomPermission]
    serializer_class = FavouriteSerializer

    def get_queryset(self):
        own = self.request.query_params.get("own", None)
        user = self.request.user
        queryset = Favourite.objects.select_related("file", "user")
        if own == "yes":
            queryset = queryset.filter(user=user)
        return queryset

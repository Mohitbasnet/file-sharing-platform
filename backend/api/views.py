from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from users.permissions import CustomPermission
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import status


class OrganizationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, CustomPermission]
    serializer_class = OrganizationSerializer

    def get_queryset(self):
        member = self.request.query_params.get("member", None)
        if member == "yes":
            return Organization.objects.filter(owner=self.request.user)
        return Organization.objects.all()


class OrganizationMemberViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OrganizationMemberSerializer

    def get_queryset(self):
        org_id = self.request.query_params.get("org_id", None)
        if org_id:
            return OrganizationMember.objects.filter(organization__id=org_id)
        return OrganizationMember.objects.all()


class InvitationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = InvitationSerializer

    def get_queryset(self):
        org_id = self.request.query_params.get("org_id", None)
        my_invitations = self.request.query_params.get("my_invitations", None)
        status = self.request.query_params.get("status", None)
        if org_id:
            return Invitation.objects.filter(organization__id=org_id)
        if my_invitations == "true":
            return Invitation.objects.filter(user=self.request.user)
        if status:
            return Invitation.objects.filter(status=status)

        return Invitation.objects.all()


class FileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer
    queryset = File.objects.all()


class FavouriteViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = FavouriteSerializer
    queryset = Favourite.objects.all()

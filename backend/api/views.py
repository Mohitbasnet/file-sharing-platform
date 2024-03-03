from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *


class OrganizationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class OrganizationMemberViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = OrganizationMember.objects.all()
    serializer_class = OrganizationMemberSerializer


class InvitationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Invitation.objects.all()
    serializer_class = InvitationSerializer


class FileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = File.objects.all()
    serializer_class = FileSerializer


class FavouriteViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Favourite.objects.all()
    serializer_class = FavouriteSerializer

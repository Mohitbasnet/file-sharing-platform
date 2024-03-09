from django.shortcuts import render
from .models import CustomUser as User
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer
from .permissions import CustomPermission
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404


class UserViewSet(ModelViewSet):
    permission_classes = [CustomPermission]
    serializer_class = UserSerializer

    def get_queryset(self):
        own = self.request.query_params.get("own", None)
        email = self.request.query_params.get("email", None)

        if own == "true":
            queryset = User.objects.filter(id=self.request.user.id)
            return queryset

        if email and own != "true":
            user_found = User.objects.filter(email=email).first()
            if user_found:
                queryset = User.objects.filter(email=email)
                return queryset
            else:
                raise Http404("User not found with this email")

        return User.objects.all()

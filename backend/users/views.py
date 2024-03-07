from django.shortcuts import render
from .models import CustomUser as User
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from .permissions import CustomPermission


class UserViewSet(ModelViewSet):
    permission_classes = [CustomPermission]
    serializer_class = UserSerializer

    def get_queryset(self):
        own = self.request.query_params.get("own", None)
        if own == "true":
            queryset = User.objects.filter(id=self.request.user.id)
            return queryset
        return User.objects.all()

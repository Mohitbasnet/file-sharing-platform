from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r"organization", OrganizationViewSet, basename="organization")
router.register(r"member", OrganizationMemberViewSet, basename="member")
router.register(r"invitation", InvitationViewSet, basename="invitation")
router.register(r"file", FileViewSet, basename="file")
router.register(r"favourite", FavouriteViewSet, basename="favourite")

urlpatterns = []

urlpatterns += router.urls

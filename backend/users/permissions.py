from rest_framework.permissions import BasePermission, SAFE_METHODS


class CustomPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True
        return bool(getattr(obj, "can_change")(request))

    def has_permission(self, request, view):
        return True

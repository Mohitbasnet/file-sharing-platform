from rest_framework.permissions import BasePermission, SAFE_METHODS


class CustomPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS or request.user.is_staff:
            return True

        if hasattr(obj, "can_change") and callable(getattr(obj, "can_change")):
            return obj.can_change(request.user)

        return False

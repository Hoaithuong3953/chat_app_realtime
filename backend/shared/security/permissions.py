from rest_framework.permissions import BasePermission

from apps.accounts.enums import Role
from shared.exceptions.auth.account import PermissionDeniedException

class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        if request.user.role != Role.ADMIN:
            raise PermissionDeniedException()

        return True
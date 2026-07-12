from fastapi import Depends
from typing import Callable, Any
from uuid import UUID
from core.exceptions import AppException
from core.security import get_current_user
from shared.models import User
from shared.enums import Role

def require_verified_and_assigned() -> Callable:
    def dependency(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role == Role.User.value:
            raise AppException(
                status_code=403,
                message="Your account is pending role assignment. Contact an administrator."
            )
        return current_user
    return dependency

def require_role(*allowed_roles: Role) -> Callable:
    def dependency(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role == Role.Admin.value:
            return current_user
        if current_user.role not in [role.value for role in allowed_roles]:
            raise AppException(
                status_code=403,
                message="You do not have permission to perform this action."
            )
        return current_user
    return dependency

def check_department_scope(current_user: User, resource_department_id: UUID) -> None:
    """
    Called after loading a resource to verify department scope.
    """
    if current_user.role in [Role.Admin.value, Role.AssetManager.value]:
        return
        
    if current_user.role == Role.DepartmentHead.value:
        # Since department_id on User can be nullable, we ensure they have one and it matches
        if not current_user.department_id or str(current_user.department_id) != str(resource_department_id):
            raise AppException(
                status_code=403,
                message="This request is outside your department's scope."
            )
    else:
        # For standard employees, scoping rules might be tighter (e.g. only own allocations),
        # but this generic department check enforces the DepartmentHead logic requested.
        pass

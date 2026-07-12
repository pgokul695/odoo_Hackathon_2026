from enum import Enum

class Role(str, Enum):
    User = "User"
    Admin = "Admin"
    AssetManager = "AssetManager"
    DepartmentHead = "DepartmentHead"
    Employee = "Employee"

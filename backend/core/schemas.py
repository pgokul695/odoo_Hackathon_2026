from pydantic import BaseModel
from typing import List, Optional, Any

# Department
class DepartmentBase(BaseModel):
    name: str
    code: str
    manager: str
    employeeCount: int = 0
    budget: str

class DepartmentCreate(DepartmentBase):
    id: Optional[str] = None

class Department(DepartmentBase):
    id: str

    class Config:
        from_attributes = True

# Employee
class EmployeeBase(BaseModel):
    name: str
    email: str
    role: str
    departmentId: str
    activeAssetsCount: int = 0

class EmployeeCreate(EmployeeBase):
    id: Optional[str] = None

class Employee(EmployeeBase):
    id: str

    class Config:
        from_attributes = True

# Category
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    totalAssets: int = 0
    allocatedAssets: int = 0

class CategoryCreate(CategoryBase):
    id: Optional[str] = None

class Category(CategoryBase):
    id: str

    class Config:
        from_attributes = True

# Asset
class AssetBase(BaseModel):
    name: str
    categoryId: str
    departmentId: str
    assignedToId: str = "none"
    status: str = "Available"
    purchaseDate: str
    purchaseValue: float = 0.0
    lastActivity: str = "Just now"
    serialNumber: str
    notes: Optional[str] = None
    history: List[Any] = []
    attachments: List[Any] = []

class AssetCreate(AssetBase):
    id: Optional[str] = None

class Asset(AssetBase):
    id: str

    class Config:
        from_attributes = True

# Allocation
class AllocationBase(BaseModel):
    assetId: str
    employeeId: str
    allocatedDate: str
    returnDate: Optional[str] = None
    status: str = "Active"
    notes: Optional[str] = None

class AllocationCreate(AllocationBase):
    id: Optional[str] = None

class Allocation(AllocationBase):
    id: str

    class Config:
        from_attributes = True

# Transfer
class TransferBase(BaseModel):
    assetId: str
    fromDepartmentId: str
    toDepartmentId: str
    status: str = "Pending"
    requestedDate: str
    approvedDate: Optional[str] = None
    requestedBy: str

class TransferCreate(TransferBase):
    id: Optional[str] = None

class Transfer(TransferBase):
    id: str

    class Config:
        from_attributes = True

# Booking
class BookingBase(BaseModel):
    assetId: str
    requesterName: str
    startDate: str
    endDate: str
    purpose: str
    status: str = "Pending"

class BookingCreate(BookingBase):
    id: Optional[str] = None

class Booking(BookingBase):
    id: str

    class Config:
        from_attributes = True

# Maintenance
class MaintenanceBase(BaseModel):
    assetId: str
    issue: str
    priority: str = "Medium"
    status: str = "Requested"
    assignedTechnician: str = "None"
    createdDate: str
    cost: Optional[float] = None

class MaintenanceCreate(MaintenanceBase):
    id: Optional[str] = None

class Maintenance(MaintenanceBase):
    id: str

    class Config:
        from_attributes = True

# Audit
class AuditBase(BaseModel):
    assetId: str
    auditorName: str
    auditDate: str
    status: str = "Found"
    notes: Optional[str] = None

class AuditCreate(AuditBase):
    id: Optional[str] = None

class Audit(AuditBase):
    id: str

    class Config:
        from_attributes = True

# Notification
class NotificationBase(BaseModel):
    category: str
    message: str
    timestamp: str
    read: bool = False

class NotificationCreate(NotificationBase):
    id: Optional[str] = None

class Notification(NotificationBase):
    id: str

    class Config:
        from_attributes = True

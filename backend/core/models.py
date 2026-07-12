from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, JSON
from core.db import Base

class Department(Base):
    __tablename__ = "departments"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    code = Column(String, nullable=False)
    manager = Column(String, nullable=False)
    employeeCount = Column(Integer, default=0)
    budget = Column(String, nullable=False)

class Employee(Base):
    __tablename__ = "employees"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    role = Column(String, nullable=False)
    departmentId = Column(String, ForeignKey("departments.id"), nullable=False)
    activeAssetsCount = Column(Integer, default=0)

class Category(Base):
    __tablename__ = "categories"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    totalAssets = Column(Integer, default=0)
    allocatedAssets = Column(Integer, default=0)

class Asset(Base):
    __tablename__ = "assets"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    categoryId = Column(String, ForeignKey("categories.id"), nullable=False)
    departmentId = Column(String, ForeignKey("departments.id"), nullable=False)
    assignedToId = Column(String, default="none")
    status = Column(String, default="Available") # Available, Allocated, Under Maintenance, Retired
    purchaseDate = Column(String, nullable=False)
    purchaseValue = Column(Float, default=0.0)
    lastActivity = Column(String, default="Just now")
    serialNumber = Column(String, nullable=False)
    notes = Column(String, nullable=True)
    history = Column(JSON, default=list)
    attachments = Column(JSON, default=list)

class Allocation(Base):
    __tablename__ = "allocations"
    id = Column(String, primary_key=True, index=True)
    assetId = Column(String, ForeignKey("assets.id"), nullable=False)
    employeeId = Column(String, ForeignKey("employees.id"), nullable=False)
    allocatedDate = Column(String, nullable=False)
    returnDate = Column(String, nullable=True)
    status = Column(String, default="Active") # Active, Returned
    notes = Column(String, nullable=True)

class Transfer(Base):
    __tablename__ = "transfers"
    id = Column(String, primary_key=True, index=True)
    assetId = Column(String, ForeignKey("assets.id"), nullable=False)
    fromDepartmentId = Column(String, ForeignKey("departments.id"), nullable=False)
    toDepartmentId = Column(String, ForeignKey("departments.id"), nullable=False)
    status = Column(String, default="Pending") # Pending, Approved, Rejected
    requestedDate = Column(String, nullable=False)
    approvedDate = Column(String, nullable=True)
    requestedBy = Column(String, nullable=False)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(String, primary_key=True, index=True)
    assetId = Column(String, ForeignKey("assets.id"), nullable=False)
    requesterName = Column(String, nullable=False)
    startDate = Column(String, nullable=False)
    endDate = Column(String, nullable=False)
    purpose = Column(String, nullable=False)
    status = Column(String, default="Pending") # Pending, Confirmed, Cancelled

class Maintenance(Base):
    __tablename__ = "maintenance"
    id = Column(String, primary_key=True, index=True)
    assetId = Column(String, ForeignKey("assets.id"), nullable=False)
    issue = Column(String, nullable=False)
    priority = Column(String, default="Medium") # Low, Medium, High, Critical
    status = Column(String, default="Requested") # Requested, Approved, In Progress, Completed
    assignedTechnician = Column(String, default="None")
    createdDate = Column(String, nullable=False)
    cost = Column(Float, nullable=True)

class Audit(Base):
    __tablename__ = "audits"
    id = Column(String, primary_key=True, index=True)
    assetId = Column(String, ForeignKey("assets.id"), nullable=False)
    auditorName = Column(String, nullable=False)
    auditDate = Column(String, nullable=False)
    status = Column(String, default="Found") # Found, Missing, Damaged
    notes = Column(String, nullable=True)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(String, primary_key=True, index=True)
    category = Column(String, nullable=False) # Assets, Maintenance, Bookings, Audits, System
    message = Column(String, nullable=False)
    timestamp = Column(String, nullable=False)
    read = Column(Boolean, default=False)

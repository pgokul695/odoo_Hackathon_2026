import uuid
from sqlalchemy import Column, String, Boolean, DateTime, Integer, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from core.database import Base
from shared.enums import Role


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    email_verified_at = Column(DateTime, nullable=True)
    two_factor_enabled = Column(Boolean, default=False)
    role = Column(String, default=Role.User.value)
    department_id = Column(UUID(as_uuid=True), ForeignKey('departments.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    otp_codes = relationship("OtpCode", back_populates="user")
    department = relationship("Department", back_populates="users")
    activity_logs = relationship("ActivityLog", back_populates="user")



class OtpCode(Base):
    __tablename__ = "otp_codes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    purpose = Column(String, nullable=False) # SIGNUP_VERIFICATION, PASSWORD_RESET, LOGIN_2FA
    code_hash = Column(String, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    attempts = Column(Integer, default=0)
    max_attempts = Column(Integer, default=5)
    consumed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="otp_codes")

class Department(Base):
    __tablename__ = "departments"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    
    users = relationship("User", back_populates="department")

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    module = Column(String, nullable=False)
    action = Column(String, nullable=False)
    details = Column(String, nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="activity_logs")

class Category(Base):
    __tablename__ = "categories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

class Asset(Base):
    __tablename__ = "assets"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey('departments.id'), nullable=True)
    status = Column(String, default="AVAILABLE")
    is_active = Column(Boolean, default=True)

class Allocation(Base):
    __tablename__ = "allocations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    asset_id = Column(UUID(as_uuid=True), ForeignKey('assets.id'), nullable=False)
    employee_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    status = Column(String, default="ACTIVE")
    allocated_at = Column(DateTime, default=datetime.utcnow)
    returned_at = Column(DateTime, nullable=True)
    condition_notes = Column(String, nullable=True)
    
    asset = relationship("Asset")
    employee = relationship("User")

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    asset_id = Column(UUID(as_uuid=True), ForeignKey('assets.id'), nullable=False)
    employee_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    status = Column(String, default="CONFIRMED") # CONFIRMED, CANCELLED
    created_at = Column(DateTime, default=datetime.utcnow)
    
    asset = relationship("Asset")

class MaintenanceRequest(Base):
    __tablename__ = "maintenance_requests"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    asset_id = Column(UUID(as_uuid=True), ForeignKey('assets.id'), nullable=False)
    employee_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey('departments.id'), nullable=True)
    status = Column(String, default="REQUESTED") # REQUESTED, APPROVED, REJECTED, COMPLETED
    resolution_notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    asset = relationship("Asset")

class Audit(Base):
    __tablename__ = "audits"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    status = Column(String, default="OPEN") # OPEN, CLOSED
    created_at = Column(DateTime, default=datetime.utcnow)

class Report(Base):
    __tablename__ = "reports"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_type = Column(String, nullable=False)
    filters = Column(JSON, nullable=True)
    generated_by_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    generated_at = Column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    message = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Transfer(Base):
    __tablename__ = "transfers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    asset_id = Column(UUID(as_uuid=True), ForeignKey('assets.id'), nullable=False)
    requested_by_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    from_department_id = Column(UUID(as_uuid=True), ForeignKey('departments.id'), nullable=True)
    to_department_id = Column(UUID(as_uuid=True), ForeignKey('departments.id'), nullable=True)
    status = Column(String, default="PENDING") # PENDING, APPROVED, REJECTED
    requested_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    
    asset = relationship("Asset")
    requested_by = relationship("User")

class MaintenanceLog(Base):
    __tablename__ = "maintenance_logs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    request_id = Column(UUID(as_uuid=True), ForeignKey('maintenance_requests.id'), nullable=False)
    action = Column(String, nullable=False)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditResult(Base):
    __tablename__ = "audit_results"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    audit_id = Column(UUID(as_uuid=True), ForeignKey('audits.id'), nullable=False)
    asset_id = Column(UUID(as_uuid=True), ForeignKey('assets.id'), nullable=False)
    result = Column(String, nullable=False) # FOUND, MISSING, DAMAGED
    notes = Column(String, nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)

class NotificationPreference(Base):
    __tablename__ = "notification_preferences"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False, unique=True)
    email_enabled = Column(Boolean, default=True)
    push_enabled = Column(Boolean, default=True)

class OrganizationSettings(Base):
    __tablename__ = "organization_settings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, default="AssetFlow")
    logo_url = Column(String, nullable=True)
    timezone = Column(String, default="UTC")

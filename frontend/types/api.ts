// Enums as Literal Unions
export type Role = 'User' | 'Admin' | 'AssetManager' | 'DepartmentHead' | 'Employee';
export type AssetStatus = 'AVAILABLE' | 'ALLOCATED' | 'UNDER_MAINTENANCE' | 'RETIRED';
export type TransferStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type BookingStatus = 'CONFIRMED' | 'CANCELLED';
export type MaintenanceStatus = 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
export type AuditStatus = 'OPEN' | 'CLOSED';
export type AuditResultType = 'FOUND' | 'MISSING' | 'DAMAGED';
export type OtpPurpose = 'SIGNUP_VERIFICATION' | 'PASSWORD_RESET' | 'LOGIN_2FA';

// Entities
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department_id: string | null;
  two_factor_enabled: boolean;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  name: string;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

export interface Asset {
  id: string;
  name: string;
  category_id: string;
  department_id: string | null;
  status: AssetStatus;
  is_active: boolean;
}

export interface Allocation {
  id: string;
  asset_id: string;
  employee_id: string;
  status: string; // Typically ACTIVE, RETURNED
  allocated_at: string;
  returned_at: string | null;
  condition_notes: string | null;
}

export interface Transfer {
  id: string;
  asset_id: string;
  requested_by_id: string;
  from_department_id: string | null;
  to_department_id: string | null;
  status: TransferStatus;
  requested_at: string;
  resolved_at: string | null;
}

export interface Booking {
  id: string;
  asset_id: string;
  employee_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  created_at: string;
}

export interface MaintenanceRecord {
  id: string;
  asset_id: string;
  employee_id: string;
  department_id: string | null;
  status: MaintenanceStatus;
  resolution_notes: string | null;
  created_at: string;
}

export interface Audit {
  id: string;
  name: string;
  status: AuditStatus;
  created_at: string;
}

export interface AuditResult {
  id: string;
  audit_id: string;
  asset_id: string;
  result: AuditResultType;
  notes: string | null;
  recorded_at: string;
}

export interface ActivityLogEntry {
  id: string;
  module: string;
  action: string;
  details: string | null;
  user_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  email_enabled: boolean;
  push_enabled: boolean;
}

// Request/Response Shapes
export interface AssetCreate {
  name: string;
  department_id: string;
  category_id: string;
}

export interface AssetUpdate {
  name?: string;
  department_id?: string;
  status?: string;
}

export interface AllocationCreate {
  asset_id: string;
  employee_id: string;
}

export interface ReturnRequest {
  condition_notes: string;
}

export interface TransferCreate {
  asset_id: string;
  from_department_id?: string;
  to_department_id?: string;
}

export interface BookingCreate {
  asset_id: string;
  start_time: string;
  end_time: string;
}

export interface MaintenanceCreate {
  asset_id: string;
}

export interface MaintenanceComplete {
  resolution_notes: string;
}

export interface AuditCreate {
  name: string;
}

export interface AuditResultSubmit {
  asset_id: string;
  result: AuditResultType;
  notes?: string;
}

export interface CategoryCreate {
  name: string;
}

export interface CategoryUpdate {
  name: string;
}

export interface DepartmentCreate {
  name: string;
}

export interface DepartmentUpdate {
  name: string;
}

export interface RoleAssignmentRequest {
  role: Role;
  department_id?: string | null;
}

export interface ReportGenerate {
  report_type: string;
  filters?: Record<string, any>;
}

export interface PrefsUpdate {
  email_enabled: boolean;
  push_enabled: boolean;
}

export interface ProfileUpdate {
  name: string;
  email: string;
}

export interface PasswordUpdate {
  current_password?: string;
  new_password?: string;
}

export interface OrgSettingsUpdate {
  name: string;
  logo_url?: string;
  timezone: string;
}

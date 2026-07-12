# AssetFlow ERP — Generated API Reference

*Source: [assetflow-api-contract-final.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-api-contract-final.md) and [assetflow-business-rules.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-business-rules.md)*

> [!NOTE]
> This API Reference is mechanically generated and locked against the frozen API contract and the active business decisions. To regenerate or make modifications, follow the team's official Change Process (Decision 19).

---

## Global Validation and Envelope Conventions

### Response Envelopes

1. **Success Envelope (Standard):**
   Used for all successful responses.
   ```json
   { "success": true, "data": [], "message": "", "meta": {} }
   ```

2. **Error Envelope (App-level errors - 400, 403, 404, 409):**
   Used for all application-level errors.
   ```json
   { "success": false, "message": "string", "errors": {} }
   ```

3. **Validation Envelope (FastAPI Native - 422):**
   Used exclusively when FastAPI native request validation fails.
   ```json
   {
     "detail": [
       { "loc": ["string", 0], "msg": "string", "type": "string", "input": "string", "ctx": {} }
     ]
   }
   ```

> [!IMPORTANT]
> **Validation Envelope Inconsistency:** The application deviates from its standard envelope on `422 Unprocessable Entity` status codes. The server will return FastAPI's native validation structure, not the standard `{success, message, errors}` shape. Frontend clients must branch specifically on HTTP `422` and parse `detail[].msg` / `detail[].loc` rather than looking for a `message` or `errors` root key.

### Trailing Slash Routing Convention

> [!WARNING]
> **Trailing Slash Inconsistency:** Most collection and action routes end in a trailing slash (e.g., `/api/assets/`), but single-resource `{id}` routes and select named sub-resources do **not** (e.g., `/api/assets/{id}`). Trailing slashes must be copied verbatim in client calls. Omission or addition will result in `307/308 Redirects` or `404 Not Found` responses depending on the path.

---

## 2. Auth

*Public routes are the only unauthenticated endpoints in the system.*
*No business-rule decisions are recorded for this module in the current log.*

### POST /api/auth/signup/
* **Roles:** Public (No Auth Required)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `SignupRequest { name, email, password }`
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `422` - Invalid body structure or constraints (e.g., weak password, invalid email format).

### POST /api/auth/verify-signup-otp/
* **Roles:** Public (No Auth Required)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `VerifyOtpRequest { email, code }`
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `400` - Invalid or expired OTP.
  * `422` - Invalid input structure.

### POST /api/auth/resend-otp/
* **Roles:** Public (No Auth Required)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `ResendOtpRequest { email, purpose }` (Note: `purpose` must be one of `OtpPurpose` enums)
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `400` - Cannot resend OTP (e.g., limit exceeded, invalid purpose).
  * `422` - Invalid input structure.

### POST /api/auth/login/
* **Roles:** Public (No Auth Required)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `LoginRequest { email, password }`
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `400` - Invalid email or password.
  * `422` - Invalid input structure.

### POST /api/auth/login/verify-otp/
* **Roles:** Public (No Auth Required)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `VerifyOtpRequest { email, code }`
* **Success:** `200`, `{ success: true, data: { access_token }, message, meta }`
* **Errors:**
  * `400` - Invalid or expired OTP.
  * `422` - Invalid input structure.

### POST /api/auth/forgot-password/
* **Roles:** Public (No Auth Required)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `ForgotPasswordRequest { email }`
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `400` - Email not found or cannot send OTP.
  * `422` - Invalid input structure.

### POST /api/auth/reset-password/
* **Roles:** Public (No Auth Required)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `ResetPasswordRequest { email, code, new_password }`
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `400` - Invalid OTP code or expired session.
  * `422` - Invalid input structure.

### GET /api/auth/me/
* **Roles:** Any authenticated role (`User`, `Employee`, `DepartmentHead`, `AssetManager`, `Admin`)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <User/Employee Profile>, message, meta }`
* **Errors:**
  * `401` - Unauthorized (missing or invalid Bearer token).

### POST /api/auth/logout/
* **Roles:** Any authenticated role (`User`, `Employee`, `DepartmentHead`, `AssetManager`, `Admin`)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `401` - Unauthorized.

### PUT /api/auth/settings/two-factor/
* **Roles:** Any authenticated role (`User`, `Employee`, `DepartmentHead`, `AssetManager`, `Admin`)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `TwoFactorSettingsRequest { enabled, current_password }`
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `400` - Incorrect password.
  * `401` - Unauthorized.
  * `422` - Invalid input structure.

---

## 3. Dashboard

*No business-rule decisions are recorded for this module in the current log.*

### GET /api/dashboard/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <DashboardStats>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden (caller is not an Admin).

---

## 4. Assets

### GET /api/assets/
* **Roles:** `Employee` (scopes list to own allocated assets only), `DepartmentHead` (scopes list to department assets only), `AssetManager` (unscoped), `Admin` (unscoped)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Asset>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden (caller lacks assigned role).

### POST /api/assets/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** *(AssetCreate - not exposed as a named schema)*
  > [!WARNING]
  > **Resolution Status - Unresolved Schema:** The `AssetCreate` schema is not exposed as a named schema in the current OpenAPI output. Callers must verify the actual required fields against the live `/openapi.json` before constructing the creation payload.
* **Success:** `201`, `{ success: true, data: <Asset>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid body structure.

### GET /api/assets/{id}
* **Roles:** `Employee` (own allocated only), `DepartmentHead` (dept only), `AssetManager` (unscoped), `Admin` (unscoped)
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: <Asset>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `404` - Asset not found, or asset is out of the caller's role-based scoping (the server returns `404` instead of `403` to prevent resource enumeration).

### PUT /api/assets/{id}
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Body:** `AssetUpdate { name?, department_id?, status? }` (all fields optional)
* **Success:** `200`, `{ success: true, data: <Asset>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Asset not found.
* **Business rule reference:** Decision 6. Audits note that if an asset is incorrectly marked `UNDER_MAINTENANCE` due to a `MISSING` audit finding, the `AssetUpdate.status` field here serves as the primary manual override path for administrators to restore the asset status.

### DELETE /api/assets/{id}
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Asset not found.

### GET /api/assets/{id}/allocations
* **Roles:** Same scoping as asset detail (`Employee` own only, `DepartmentHead` dept only, `AssetManager`/`Admin` unscoped)
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Allocation>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `404` - Asset not found or out of scope.

### GET /api/assets/{id}/maintenance
* **Roles:** Same scoping as asset detail
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<MaintenanceRecord>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `404` - Asset not found or out of scope.

### GET /api/assets/{id}/attachments
* **Roles:** Same scoping as asset detail
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Attachment>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `404` - Asset not found or out of scope.

### POST /api/assets/{id}/attachments
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Body:** multipart form, field `file`
* **Success:** `201`, `{ success: true, data: <Attachment>, message, meta }`
* **Errors:**
  * `400` - File empty or invalid format.
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Asset not found.

### GET /api/assets/{id}/qr
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: { qr_code_url }, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Asset not found.

---

## 5. Categories

*No business-rule decisions are recorded for this module in the current log.*

### GET /api/categories/
* **Roles:** Any assigned role except `User` (`Employee`, `DepartmentHead`, `AssetManager`, `Admin`)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Category>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden (caller is a standard `User`).

### POST /api/categories/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `CategoryCreate { name }`
  > [!IMPORTANT]
  > **Schema Limitation:** The category schema is simplified to `{ name }` only. No `description` or `depreciation_policy` fields exist in the active schema.
* **Success:** `201`, `{ success: true, data: <Category>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid input structure.

### PUT /api/categories/{id}
* **Roles:** `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Body:** `CategoryUpdate { name }`
* **Success:** `200`, `{ success: true, data: <Category>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Category not found.
  * `422` - Invalid input structure.

### DELETE /api/categories/{id}
* **Roles:** `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Category not found.

---

## 6. Departments

*No business-rule decisions are recorded for this module in the current log.*

### GET /api/departments/
* **Roles:** Any assigned role except `User` (`Employee`, `DepartmentHead`, `AssetManager`, `Admin`)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Department>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### POST /api/departments/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `DepartmentCreate { name }`
  > [!IMPORTANT]
  > **Schema Limitation:** The department schema is simplified to `{ name }` only. No `head_employee_id` or `parent_department_id` fields exist in the active schema.
* **Success:** `201`, `{ success: true, data: <Department>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid input structure.

### PUT /api/departments/{id}
* **Roles:** `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Body:** `DepartmentUpdate { name }`
* **Success:** `200`, `{ success: true, data: <Department>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Department not found.
  * `422` - Invalid input structure.

### DELETE /api/departments/{id}
* **Roles:** `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Department not found.

---

## 7. Employees

*No business-rule decisions are recorded for this module in the current log.*

### GET /api/employees/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Employee>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### GET /api/employees/pending/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Employee>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### PUT /api/employees/{id}/role/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `RoleAssignmentRequest { role, department_id }` (Note: `role` must be one of `Role` enums)
* **Success:** `200`, `{ success: true, data: <Employee>, message, meta }`
* **Errors:**
  * `400` - Department not found.
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Employee not found.
  * `422` - Invalid input structure.

> [!NOTE]
> There is no direct employee creation endpoint. Accounts must first be created via `/api/auth/signup/` (which defaults to a `User` role with no permissions) and then upgraded to a staff role here.

---

## 8. Allocations

### GET /api/allocations/
* **Roles:** `Employee` (scopes list to own allocations only), `DepartmentHead` (scopes list to department allocations only), `AssetManager` (unscoped), `Admin` (unscoped)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Allocation>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### POST /api/allocations/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** *(AllocationCreate - not exposed as a named schema)*
  > [!WARNING]
  > **Resolution Status - Unresolved Schema:** The `AllocationCreate` schema is not exposed as a named schema in the OpenAPI output. Callers must verify the required fields against the live `/openapi.json` before constructing the allocation payload.
* **Success:** `201`, `{ success: true, data: <Allocation>, message, meta }`
* **Errors:**
  * `400` - Asset not available or invalid employee selected.
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid body structure.

### PUT /api/allocations/{id}/return/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `ReturnRequest { condition_notes }`
* **Success:** `200`, `{ success: true, data: <Allocation>, message, meta }`
* **Errors:**
  * `400` - Allocation is already returned.
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Allocation not found.
  * `422` - Invalid body structure.

---

## 9. Transfers

### GET /api/transfers/
* **Roles:** `Employee` (scopes list to transfers they personally initiated), `DepartmentHead` (scopes list to transfers involving their department on either the sending or receiving side), `AssetManager` (unscoped), `Admin` (unscoped)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Transfer>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### POST /api/transfers/
* **Roles:** `Employee`, `DepartmentHead`, `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `TransferCreate { asset_id, from_department_id?, to_department_id? }`
* **Success:** `201`, `{ success: true, data: <Transfer>, message, meta }`
* **Errors:**
  * `400` - Asset current status is `UNDER_MAINTENANCE` or `RETIRED` (not eligible for transfer).
  * `400` - `to_department_id` is omitted in the body payload.
  * `400` - `from_department_id` is provided in the body but does not match the asset's actual current `department_id`.
  * `401` - Unauthorized.
  * `409` - Duplicate Pending Transfer: the asset already has an active transfer request in a `PENDING` state.
  * `422` - Invalid input structure.
* **Business rule reference:** Decision 3. If `from_department_id` is omitted, the backend derives it automatically from the asset's current state.

### PUT /api/transfers/{id}/approve/
* **Roles:** `DepartmentHead` (only if caller's department matches the *receiving* side `to_department_id`), `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <Transfer>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden (the Department Head caller is on the releasing/sending department side, or has no relation to the transfer).
  * `404` - Transfer not found.
  * `409` - Conflict: The transfer is no longer in a `PENDING` state (terminal state constraint), or the asset's current `department_id` has drifted from the transfer's recorded `from_department_id` (approval-time re-validation).
* **Business rule reference:** Decision 3. Approving a transfer updates only `Asset.department_id` and shifts the transfer to `APPROVED`. It does not touch `Asset.status`.

### PUT /api/transfers/{id}/reject/
* **Roles:** `DepartmentHead` (only if caller's department matches the *receiving* side `to_department_id`), `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <Transfer>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Transfer not found.
  * `409` - Conflict: The transfer has already left the `PENDING` state.
* **Business rule reference:** Decision 3. Shifting a transfer to `REJECTED` has no side effects on the asset itself.

---

## 10. Bookings

### GET /api/bookings/
* **Roles:** `Employee` (scopes list to own bookings only), `DepartmentHead` (scopes list to department bookings only), `AssetManager` (unscoped), `Admin` (unscoped)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Booking>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### POST /api/bookings/
* **Roles:** `Employee`, `DepartmentHead`, `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `BookingCreate { asset_id, start_time, end_time }`
  > [!NOTE]
  > **Resolution Status - Resolved Schema:** The schema for creating a booking is resolved to take `{ asset_id, start_time, end_time }` only, with no `purpose` or `notes` fields.
* **Success:** `201`, `{ success: true, data: <Booking>, message, meta }`
* **Errors:**
  * `400` - Invalid timeline: `end_time` is before/equal to `start_time`, or `start_time` is in the past.
  * `400` - Asset availability gate: The asset's current status is not `AVAILABLE` (assets marked `ALLOCATED`, `UNDER_MAINTENANCE`, or `RETIRED` cannot be booked, even for future non-overlapping slots).
  * `401` - Unauthorized.
  * `409` - Conflict: Overlapping Booking. Another booking for the same asset conflicts on the half-open interval `start_time < other.end_time AND end_time > other.start_time`. (Only conflicts with `CONFIRMED` bookings; `CANCELLED` bookings are ignored).
  * `422` - Invalid input structure.
* **Business rule reference:** Decision 1, Decision 4. Creating a booking never writes `Asset.status`. Bookings bypass a `PENDING` state and are created directly as `CONFIRMED`.

### PUT /api/bookings/{id}/cancel/
* **Roles:** `Employee` (own bookings only), `DepartmentHead` (any booking within their own department), `AssetManager` (any booking), `Admin` (any booking)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <Booking>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden (cancelling another user's/department's booking).
  * `404` - Booking not found.
  * `409` - Conflict: Booking is already in a `CANCELLED` state.
* **Business rule reference:** Decision 4. Cancelling is allowed regardless of whether the booking slot has already passed.

---

## 11. Maintenance

### GET /api/maintenance/
* **Roles:** `Employee` (own requests only), `DepartmentHead` (scopes list to department maintenance only), `AssetManager` (unscoped), `Admin` (unscoped)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<MaintenanceRecord>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### POST /api/maintenance/
* **Roles:** `Employee`, `DepartmentHead`, `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `MaintenanceCreate { asset_id }`
  > [!IMPORTANT]
  > **Schema Limitation:** `MaintenanceCreate` only takes `asset_id`. No `issue_description` or `priority` fields exist in the active schema.
* **Success:** `201`, `{ success: true, data: <MaintenanceRecord>, message, meta }`
* **Errors:**
  * `400` - Asset status is `RETIRED` or already `UNDER_MAINTENANCE` (not eligible for new requests).
  * `401` - Unauthorized.
  * `409` - Conflict: The asset has a duplicate open request (a request currently in `REQUESTED` or `APPROVED` status).
  * `422` - Invalid input structure.
* **Business rule reference:** Decision 5. Eligible asset statuses at request time are `AVAILABLE` and `ALLOCATED`.

### PUT /api/maintenance/{id}/approve/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <MaintenanceRecord>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Maintenance record not found.
  * `409` - Conflict: The record is not in `REQUESTED` state.
* **Business rule reference:** Decision 5. Approving a maintenance record shifts its status to `APPROVED` and immediately changes the linked asset's status to `UNDER_MAINTENANCE`.

### PUT /api/maintenance/{id}/reject/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <MaintenanceRecord>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Maintenance record not found.
  * `409` - Conflict: The record is not in `REQUESTED` state.
* **Business rule reference:** Decision 5. Rejecting a request sets its status to `REJECTED` but has no side effects on the asset.

### PUT /api/maintenance/{id}/complete/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `MaintenanceComplete { resolution_notes }`
* **Success:** `200`, `{ success: true, data: <MaintenanceRecord>, message, meta }`
* **Errors:**
  * `400` - Validation: `resolution_notes` is missing or blank.
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Maintenance record not found.
  * `409` - Conflict: The record is not in `APPROVED` state.
  * `422` - Invalid input structure.
* **Business rule reference:** Decision 5. Completing the request shifts its status to `COMPLETED` and changes the linked asset's status back to `AVAILABLE`.

### GET /api/maintenance/{id}/logs
* **Roles:** Same scoping as maintenance list (`Employee` own only, `DepartmentHead` dept only, `AssetManager`/`Admin` unscoped)
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<MaintenanceLogEntry>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `404` - Maintenance record not found or out of scope.
* **Business rule reference:** Decision 5. Logs are read-only and automatically populated as a side effect of creating, approving, rejecting, or completing maintenance requests.

---

## 12. Audits

### GET /api/audits/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Audit>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### POST /api/audits/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `AuditCreate { name }`
  > [!IMPORTANT]
  > **Schema Limitation:** `AuditCreate` is `{ name }` only. No `start_date` or `end_date` fields exist in the active schema.
* **Success:** `201`, `{ success: true, data: <Audit>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid input structure.

### GET /api/audits/{id}
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Does **not** end with a trailing slash.
* **Success:** `200`, `{ success: true, data: <Audit>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Audit not found.

### PUT /api/audits/{id}/close/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <Audit>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Audit not found.
  * `409` - Conflict: The audit is already in `CLOSED` state.
* **Business rule reference:** Decision 6. Audits are created in `OPEN` state. Closing them sets status to `CLOSED`. No completeness validation is performed (partial audits can be closed).

### GET /api/audits/{id}/results/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<AuditResult>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Audit not found.

### POST /api/audits/{id}/results/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `AuditResultSubmit { asset_id, result, notes }` (Note: `result` must be one of `AuditResultType` enums)
* **Success:** `201`, `{ success: true, data: <AuditResult>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `404` - Audit or Asset not found.
  * `409` - Conflict: The parent audit is `CLOSED`, or a result has already been submitted for this `asset_id` in this audit (exactly one result per asset per audit is enforced).
  * `422` - Invalid input structure.
* **Business rule reference:** Decision 2, Decision 6.
  * Submitting `DAMAGED` or `MISSING` immediately modifies the asset's status to `UNDER_MAINTENANCE`, unless the asset status is currently `RETIRED`.
  * `RETIRED` assets are exempt from audit status changes (stay `RETIRED`).
  * Submitting `FOUND` has no status side effects on the asset.

---

## 13. Activity Logs

*No business-rule decisions are recorded for this module in the current log.*

### GET /api/activity-logs/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Query Params:** `user_id?`, `module?`, `date_from?`, `date_to?` (all optional)
* **Success:** `200`, `{ success: true, data: [<ActivityLogEntry>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid query parameter formatting.

---

## 14. Reports

*No business-rule decisions are recorded for this module in the current log.*

### GET /api/reports/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<ReportMetadata>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### POST /api/reports/generate/
* **Roles:** `AssetManager`, `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `ReportGenerate { report_type, filters: {} }`
* **Success:** `200`, `{ success: true, data: <ReportData>, message, meta }`
* **Errors:**
  * `400` - Invalid report type or unsupported filters.
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid input structure.

---

## 15. Notifications

*No business-rule decisions are recorded for this module in the current log.*

### GET /api/notifications/
* **Roles:** Any assigned role except `User` (Always scoped to caller, including for `Admin`)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: [<Notification>], message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### PUT /api/notifications/{id}/read/
* **Roles:** Owner of the notification only (Any assigned role except `User`)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <Notification>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `404` - Notification not found or belongs to another user (404 is returned instead of 403 to prevent resource enumeration).

### GET /api/notifications/preferences/
* **Roles:** Any assigned role except `User` (own preferences only)
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <NotificationPreferences>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### PUT /api/notifications/preferences/
* **Roles:** Any assigned role except `User` (own preferences only)
* **Path Slash:** Ends with a trailing slash.
* **Body:** `PrefsUpdate { email_enabled, push_enabled }`
  > [!IMPORTANT]
  > **Schema Limitation:** Preferences are single `email_enabled` and `push_enabled` boolean toggles, not granular configurations per event type.
* **Success:** `200`, `{ success: true, data: <NotificationPreferences>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid input structure.

---

## 16. Settings

*No business-rule decisions are recorded for this module in the current log.*

### GET /api/settings/profile/
* **Roles:** Any assigned role except `User`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <ProfileData>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### PUT /api/settings/profile/
* **Roles:** Any assigned role except `User`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `ProfileUpdate { name, email }`
* **Success:** `200`, `{ success: true, data: <ProfileData>, message, meta }`
* **Errors:**
  * `400` - Email already in use.
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid input structure.

### PUT /api/settings/password/
* **Roles:** Any assigned role except `User`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `PasswordUpdate { current_password, new_password }`
* **Success:** `200`, `{ success: true, data: {}, message, meta }`
* **Errors:**
  * `400` - Incorrect current password or weak new password.
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid input structure.

### GET /api/settings/organization/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Success:** `200`, `{ success: true, data: <OrgSettings>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.

### PUT /api/settings/organization/
* **Roles:** `Admin`
* **Path Slash:** Ends with a trailing slash.
* **Body:** `OrgSettingsUpdate { name, logo_url, timezone }`
* **Success:** `200`, `{ success: true, data: <OrgSettings>, message, meta }`
* **Errors:**
  * `401` - Unauthorized.
  * `403` - Forbidden.
  * `422` - Invalid input structure.

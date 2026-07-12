# AssetFlow ERP — Final API Contract (FROZEN)

**Status: locked.** This reflects the actual backend, verified endpoint-by-endpoint against the live OpenAPI schema. No endpoint, path, field, or shape changes past this document without both team leads reopening it explicitly. Frontend builds against this exactly as written, including its quirks (noted below) — don't "fix" anything on either side without updating this file first.

Base URL: `/api`. Auth: `Authorization: Bearer <jwt>` header, required on everything except the seven public auth routes in section 2.

---

## 1. Global Conventions (unchanged from earlier, confirmed as implemented)

**Success envelope:**
```json
{ "success": true, "data": [], "message": "", "meta": {} }
```

**Error envelope (app-level errors, e.g. 400/403/404/409):**
```json
{ "success": false, "message": "string", "errors": {} }
```

**Validation envelope (422, FastAPI native — different shape, frontend must handle both):**
```json
{
  "detail": [
    { "loc": ["string", 0], "msg": "string", "type": "string", "input": "string", "ctx": {} }
  ]
}
```
This is the one place the app deviates from its own standard envelope — 422s come back in FastAPI's native validation shape, not the `{success, message, errors}` shape. Frontend must branch on status code 422 specifically and parse `detail[].msg` / `detail[].loc` rather than expecting `errors`.

**Known inconsistency, not being fixed:** most collection/action routes end in a trailing slash (`/api/assets/`, `/api/allocations/{id}/return/`), but single-resource `{id}` routes and a few sub-resources do **not** (`/api/assets/{id}`, `/api/categories/{id}`, `/api/departments/{id}`, `/api/audits/{id}`, `/api/maintenance/{id}/logs`, `/api/assets/{id}/qr`, `/api/assets/{id}/allocations`, `/api/assets/{id}/maintenance`, `/api/assets/{id}/attachments`). This is documented exactly as generated — every path below is copied verbatim, not normalized. Get the trailing slash wrong in frontend API client code and you'll get a redirect or 404 depending on server config, so copy paths from this table exactly.

---

## 2. Auth (public routes are the only unauthenticated endpoints in the system)

| Method | Path | Body | Auth required |
|---|---|---|---|
| POST | `/api/auth/signup/` | `SignupRequest { name, email, password }` | No |
| POST | `/api/auth/verify-signup-otp/` | `VerifyOtpRequest { email, code }` | No |
| POST | `/api/auth/resend-otp/` | `ResendOtpRequest { email, purpose }` | No |
| POST | `/api/auth/login/` | `LoginRequest { email, password }` | No |
| POST | `/api/auth/login/verify-otp/` | `VerifyOtpRequest { email, code }` | No |
| POST | `/api/auth/forgot-password/` | `ForgotPasswordRequest { email }` | No |
| POST | `/api/auth/reset-password/` | `ResetPasswordRequest { email, code, new_password }` | No |
| GET | `/api/auth/me/` | — | Yes, any role including `User` |
| POST | `/api/auth/logout/` | — | Yes, any role including `User` |
| PUT | `/api/auth/settings/two-factor/` | `TwoFactorSettingsRequest { enabled, current_password }` | Yes, any role including `User` |

---

## 3. Dashboard

| Method | Path | Roles |
|---|---|---|
| GET | `/api/dashboard/` | Admin |

---

## 4. Assets

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/assets/` | — | Employee (own allocated only), DepartmentHead (dept only), AssetManager, Admin (unscoped) |
| POST | `/api/assets/` | *(AssetCreate — not exposed as a named schema in the current OpenAPI output; verify actual required fields against the live `/openapi.json` before building the frontend form)* | AssetManager, Admin |
| GET | `/api/assets/{id}` | — | same scoping as list; 404 (not 403) if out of scope |
| PUT | `/api/assets/{id}` | `AssetUpdate { name?, department_id?, status? }` — all fields optional | AssetManager, Admin |
| DELETE | `/api/assets/{id}` | — | AssetManager, Admin |
| GET | `/api/assets/{id}/allocations` | — | same scoping as asset detail |
| GET | `/api/assets/{id}/maintenance` | — | same scoping |
| GET | `/api/assets/{id}/attachments` | — | same scoping |
| POST | `/api/assets/{id}/attachments` | multipart form, field `file` | AssetManager, Admin |
| GET | `/api/assets/{id}/qr` | — | AssetManager, Admin |

---

## 5. Categories

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/categories/` | — | any assigned role (not `User`) |
| POST | `/api/categories/` | `CategoryCreate { name }` | Admin |
| PUT | `/api/categories/{id}` | `CategoryUpdate { name }` | Admin |
| DELETE | `/api/categories/{id}` | — | Admin |

Note: the actual schema is `{ name }` only — no `description` or `depreciation_policy` fields exist despite earlier planning drafts. Build frontend forms against this reality.

---

## 6. Departments

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/departments/` | — | any assigned role (not `User`) |
| POST | `/api/departments/` | `DepartmentCreate { name }` | Admin |
| PUT | `/api/departments/{id}` | `DepartmentUpdate { name }` | Admin |
| DELETE | `/api/departments/{id}` | — | Admin |

Note: same simplification as categories — `{ name }` only, no `head_employee_id` or `parent_department_id` fields exist in the actual schema.

---

## 7. Employees

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/employees/` | — | Admin |
| GET | `/api/employees/pending/` | — | Admin |
| PUT | `/api/employees/{id}/role/` | `RoleAssignmentRequest { role, department_id }` | Admin |

There is no direct employee-creation endpoint — accounts are created only via `/api/auth/signup/` and start as `User` role until assigned here.

---

## 8. Allocations

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/allocations/` | — | Employee (own), DepartmentHead (dept), AssetManager/Admin (unscoped) |
| POST | `/api/allocations/` | *(AllocationCreate — not exposed as a named schema; verify against live `/openapi.json`)* | AssetManager, Admin |
| PUT | `/api/allocations/{id}/return/` | `ReturnRequest { condition_notes }` | AssetManager, Admin |

---

## 9. Transfers

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/transfers/` | — | Employee (initiated by them), DepartmentHead (their dept, either side), AssetManager/Admin (unscoped) |
| POST | `/api/transfers/` | `TransferCreate { asset_id, from_department_id?, to_department_id? }` | Employee, DepartmentHead, AssetManager, Admin |
| PUT | `/api/transfers/{id}/approve/` | — | DepartmentHead (own department only), AssetManager, Admin |
| PUT | `/api/transfers/{id}/reject/` | — | DepartmentHead (own department only), AssetManager, Admin |

---

## 10. Bookings

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/bookings/` | — | Employee (own), DepartmentHead (dept), AssetManager/Admin (unscoped) |
| POST | `/api/bookings/` | *(BookingCreate — not exposed as a named schema; verify against live `/openapi.json`)* | Employee, DepartmentHead, AssetManager, Admin |
| PUT | `/api/bookings/{id}/cancel/` | — | Employee/DepartmentHead (own booking only), AssetManager/Admin (any) |

---

## 11. Maintenance

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/maintenance/` | — | Employee (own requests), DepartmentHead (dept), AssetManager/Admin (unscoped) |
| POST | `/api/maintenance/` | `MaintenanceCreate { asset_id }` | Employee, DepartmentHead, AssetManager, Admin |
| PUT | `/api/maintenance/{id}/approve/` | — | AssetManager, Admin |
| PUT | `/api/maintenance/{id}/reject/` | — | AssetManager, Admin |
| PUT | `/api/maintenance/{id}/complete/` | `MaintenanceComplete { resolution_notes }` | AssetManager, Admin |
| GET | `/api/maintenance/{id}/logs` | — | same scoping as maintenance list |

Note: `MaintenanceCreate` only takes `asset_id` — no `issue_description` or `priority` fields exist in the actual schema. Frontend's "raise a maintenance request" form should reflect this unless/until the schema is deliberately extended (which would require reopening this contract).

---

## 12. Audits

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/audits/` | — | AssetManager, Admin |
| POST | `/api/audits/` | `AuditCreate { name }` | Admin |
| GET | `/api/audits/{id}` | — | AssetManager, Admin |
| PUT | `/api/audits/{id}/close/` | — | Admin |
| GET | `/api/audits/{id}/results/` | — | AssetManager, Admin |
| POST | `/api/audits/{id}/results/` | `AuditResultSubmit { asset_id, result, notes }` | AssetManager, Admin |

Note: `AuditCreate` is `{ name }` only — no `start_date`/`end_date` fields in the actual schema, unlike earlier planning drafts.

---

## 13. Activity Logs

| Method | Path | Query params | Roles |
|---|---|---|---|
| GET | `/api/activity-logs/` | `user_id?`, `module?`, `date_from?`, `date_to?` (all optional) | Admin |

---

## 14. Reports

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/reports/` | — | AssetManager, Admin |
| POST | `/api/reports/generate/` | `ReportGenerate { report_type, filters: {} }` | AssetManager, Admin |

---

## 15. Notifications

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/notifications/` | — | any assigned role (not `User`), always scoped to self, including for Admin |
| PUT | `/api/notifications/{id}/read/` | — | owner only — 404 if it belongs to someone else |
| GET | `/api/notifications/preferences/` | — | any assigned role, own preferences only |
| PUT | `/api/notifications/preferences/` | `PrefsUpdate { email_enabled, push_enabled }` | any assigned role, own preferences only |

Note: preferences are a single `{ email_enabled, push_enabled }` toggle pair — not per-event-type granularity as originally drafted.

---

## 16. Settings

| Method | Path | Body | Roles |
|---|---|---|---|
| GET | `/api/settings/profile/` | — | any assigned role (not `User`) |
| PUT | `/api/settings/profile/` | `ProfileUpdate { name, email }` | any assigned role (not `User`) |
| PUT | `/api/settings/password/` | `PasswordUpdate { current_password, new_password }` | any assigned role (not `User`) |
| GET | `/api/settings/organization/` | — | Admin |
| PUT | `/api/settings/organization/` | `OrgSettingsUpdate { name, logo_url, timezone }` | Admin |

---

## 17. Shared Enums

```
Role                = User | Admin | AssetManager | DepartmentHead | Employee
AssetStatus         = AVAILABLE | ALLOCATED | UNDER_MAINTENANCE | RETIRED
TransferStatus      = PENDING | APPROVED | REJECTED
BookingStatus       = PENDING | CONFIRMED | CANCELLED
MaintenanceStatus   = REQUESTED | APPROVED | REJECTED | IN_PROGRESS | COMPLETED
AuditStatus         = OPEN | CLOSED
AuditResultType     = FOUND | MISSING | DAMAGED
OtpPurpose          = SIGNUP_VERIFICATION | PASSWORD_RESET | LOGIN_2FA
```

`status`/`result` fields are typed as `string` in the actual schemas shown (not enums at the OpenAPI level) — validate against these value sets on the frontend regardless, since the backend isn't enforcing them via schema constraint.

---

## 18. Full endpoint count (for sanity-checking frontend coverage)

15 modules, **66 endpoints** total: Auth (10), Dashboard (1), Assets (10), Categories (4), Departments (4), Employees (3), Allocations (3), Transfers (4), Bookings (3), Maintenance (6), Audits (6), Activity Logs (1), Reports (2), Notifications (4), Settings (5).

Cross-check your frontend `api/*.ts` files against every row in sections 2–16 individually rather than relying on this summary count alone.

---

## 19. Change process (only path to modifying this document)

1. Proposed change written up against this file specifically, not verbally agreed elsewhere.
2. Both team leads sign off in writing (PR comment, chat thread — anything durable).
3. This file updated in the same change as the code.
4. No endpoint, field, role, or path ships without existing here first — this includes the "not exposed as a named schema" items flagged above; if those get formalized, this document gets updated to reflect their real shape, not left as a TODO.

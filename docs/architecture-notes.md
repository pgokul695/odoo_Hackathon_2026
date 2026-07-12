# AssetFlow ERP — Architecture Notes

*Source: [assetflow-api-contract-final.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-api-contract-final.md) and [assetflow-business-rules.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-business-rules.md)*

This document summarizes the architectural patterns, API schemas, routing behaviors, and authorization policies enforced across the AssetFlow ERP system.

---

## 1. Envelope & Error-Handling Conventions

The system uses three response envelope formats depending on the nature of the request outcome and the status code.

### Standard Success Envelope
Used for all successful responses (HTTP 2xx):
```json
{
  "success": true,
  "data": [], // Contains the returned entity or collection
  "message": "", // Optional success summary
  "meta": {} // Pagination and metadata details
}
```

### Standard Error Envelope
Used for application-level errors (HTTP 400, 403, 404, 409):
```json
{
  "success": false,
  "message": "Detailed error explanation",
  "errors": {} // Field-specific error details (if any)
}
```

### Validation Error Envelope (HTTP 422 Exception)
Used exclusively for FastAPI native request schema validation failures:
```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "field required",
      "type": "value_error.missing",
      "input": null,
      "ctx": {}
    }
  ]
}
```

> [!IMPORTANT]
> **Validation Architecture Caveat:** The validation error response (422) is the only response structure that does not conform to the application's standard `{success, message, errors}` envelope. Integration layers must branch on HTTP `422` separately to parse the array of validation errors nested under `detail`.

---

## 2. Routing & Path Conventions

The API routing uses an explicit trailing-slash pattern. 

* **Trailing Slash Required:** Applied generally to collection routes, queries, and action endpoints:
  * `/api/auth/signup/`, `/api/auth/verify-signup-otp/`, `/api/auth/resend-otp/`, `/api/auth/login/`, `/api/auth/login/verify-otp/`, `/api/auth/forgot-password/`, `/api/auth/reset-password/`, `/api/auth/logout/`
  * `/api/auth/settings/two-factor/`
  * `/api/dashboard/`
  * `/api/assets/`
  * `/api/categories/`
  * `/api/departments/`
  * `/api/employees/`, `/api/employees/pending/`, `/api/employees/{id}/role/`
  * `/api/allocations/`, `/api/allocations/{id}/return/`
  * `/api/transfers/`, `/api/transfers/{id}/approve/`, `/api/transfers/{id}/reject/`
  * `/api/bookings/`, `/api/bookings/{id}/cancel/`
  * `/api/maintenance/`, `/api/maintenance/{id}/approve/`, `/api/maintenance/{id}/reject/`, `/api/maintenance/{id}/complete/`
  * `/api/audits/`, `/api/audits/{id}/close/`, `/api/audits/{id}/results/`
  * `/api/activity-logs/`
  * `/api/reports/`, `/api/reports/generate/`
  * `/api/notifications/`, `/api/notifications/{id}/read/`, `/api/notifications/preferences/`
  * `/api/settings/profile/`, `/api/settings/password/`, `/api/settings/organization/`

* **No Trailing Slash Allowed:** Applied to single-resource retrieval, deletion, and specific sub-resource details:
  * `/api/assets/{id}`, `/api/assets/{id}/allocations`, `/api/assets/{id}/maintenance`, `/api/assets/{id}/attachments`, `/api/assets/{id}/qr`
  * `/api/categories/{id}`
  * `/api/departments/{id}`
  * `/api/audits/{id}`
  * `/api/maintenance/{id}/logs`

---

## 3. State Ownership & Side Effects Matrix

The asset's operational status (`Asset.status`) is modified automatically as a side effect of actions across other system components.

> [!NOTE]
> **State Ownership Inference Note:** The following side-effects matrix is synthesized based on the business decisions log. State transitions are side effects driven by specific endpoint handlers rather than direct status writes by callers.

| Module | Initiating Endpoint | Operation | Triggering Condition | Resulting `Asset.status` | Rule Source |
|---|---|---|---|---|---|
| **Allocations** | `POST /api/allocations/` | Allocation Create | Successful Allocation | `ALLOCATED` | General Context |
| **Allocations** | `PUT /api/allocations/{id}/return/` | Allocation Return | Successful Return | `AVAILABLE` | General Context |
| **Maintenance** | `PUT /api/maintenance/{id}/approve/` | Request Approve | Approval of maintenance request | `UNDER_MAINTENANCE` | Decision 5 |
| **Maintenance** | `PUT /api/maintenance/{id}/complete/` | Request Complete | Completion of maintenance work | `AVAILABLE` | Decision 5 |
| **Audits** | `POST /api/audits/{id}/results/` | Result Submit | `DAMAGED` result submitted | `UNDER_MAINTENANCE` | Decision 2 |
| **Audits** | `POST /api/audits/{id}/results/` | Result Submit | `MISSING` result submitted | `UNDER_MAINTENANCE` | Decision 6 |
| **Assets** | `PUT /api/assets/{id}` | Asset Update | Direct status override by Administrator | Caller-specified status | Decision 6 |

---

## 4. RBAC (Role-Based Access Control) Matrix

This matrix maps access permission levels for all 15 modules based on the roles defined in the API contract.

* `Public`: No authentication required.
* `Own`: Read or write restricted to resources created by, allocated to, or associated with the caller.
* `Dept`: Read or write restricted to resources associated with the caller's assigned department.
* `All`: Unscoped read or write access across the entire system.
* `—`: No access allowed.

| Module | Endpoints | User | Employee | Department Head | Asset Manager | Admin |
|---|---|---|---|---|---|---|
| **Auth** | Signup, Login, Reset, 2FA | Public / Own | Public / Own | Public / Own | Public / Own | Public / Own |
| **Dashboard** | `GET /api/dashboard/` | — | — | — | — | All |
| **Assets** | List, Retrieve, Attachments | — | Own | Dept | All | All |
| **Assets** | Create, Update, Delete, QR | — | — | — | All | All |
| **Categories** | List Categories | — | All | All | All | All |
| **Categories** | Create, Update, Delete | — | — | — | — | All |
| **Departments** | List Departments | — | All | All | All | All |
| **Departments** | Create, Update, Delete | — | — | — | — | All |
| **Employees** | List Employees, Role Update | — | — | — | — | All |
| **Allocations** | List Allocations | — | Own | Dept | All | All |
| **Allocations** | Create, Return | — | — | — | All | All |
| **Transfers** | List Transfers | — | Own | Dept | All | All |
| **Transfers** | Create Request | — | Own | Dept | All | All |
| **Transfers** | Approve, Reject Request | — | — | Dept (Receiving) | All | All |
| **Bookings** | List Bookings | — | Own | Dept | All | All |
| **Bookings** | Create Booking | — | Own | Dept | All | All |
| **Bookings** | Cancel Booking | — | Own | Dept (Any) | All | All |
| **Maintenance** | List Requests, Logs | — | Own | Dept | All | All |
| **Maintenance** | Create Request | — | Own | Dept | All | All |
| **Maintenance** | Approve, Reject, Complete | — | — | — | All | All |
| **Audits** | List Audits, Details, Results | — | — | — | All | All |
| **Audits** | Create Audit, Close Audit | — | — | — | — | All |
| **Audits** | Submit Audit Result | — | — | — | All | All |
| **Activity Logs** | GET Logs | — | — | — | — | All |
| **Reports** | GET Reports, POST Generate | — | — | — | All | All |
| **Notifications**| List, Read, Preferences | — | Own | Own | Own | Own |
| **Settings** | Profile & Password Update | — | Own | Own | Own | Own |
| **Settings** | Org Settings View/Update | — | — | — | — | All |

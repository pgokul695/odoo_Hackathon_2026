# AssetFlow ERP — Glossary of Terms & Shared Enums

*Source: [assetflow-api-contract-final.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-api-contract-final.md) and [assetflow-business-rules.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-business-rules.md)*

This glossary defines the core entities and shared enumerations used in the AssetFlow ERP system.

---

## 1. ERP Entities

The system behaves around twelve core entities:

1. **Asset:** A trackable physical item of value within the organization. It is assigned to a department, classified by a category, and carries an operational status (e.g. `AVAILABLE`, `ALLOCATED`).
2. **Allocation:** A record representing the active checkout of an asset to an employee, including notes on the asset's condition when it is returned.
3. **Transfer:** A formal request to transfer asset ownership from a sending department to a receiving department. It requires approval by the receiving department's head.
4. **Booking:** A pre-confirmed reservation of an asset for a designated future time window. Bookings do not change the physical status of the asset itself.
5. **Maintenance Record:** A request tracking the diagnosis, approval, and completion of repair work on a faulty or damaged asset.
6. **Audit:** A structured inventory control campaign designed to verify the physical presence and condition of assets.
7. **Audit Result:** A single assessment record (e.g., confirming an asset is found, missing, or damaged) submitted for an asset within an open audit campaign.
8. **Activity Log Entry:** A system audit trail record detailing an administrative action, capturing the user, the module involved, and the timestamp.
9. **Notification:** An alert message scoped and delivered to an individual user, notifying them of relevant events (such as allocation checkouts or transfer requests).
10. **Category:** A tag-like classifier used to organize assets (e.g., "Laptops", "Office Chairs").
11. **Department:** A corporate division (e.g., "Engineering", "Sales") that owns assets and employs staff.
12. **Employee / User:** An identity registered in the system. An account begins as a raw `User` (no organizational access) and must be assigned an employee `Role` and department by an Admin to access the ERP.

---

## 2. Shared Enums

The system uses eight shared enumerations to represent roles, lifecycle states, and otp actions.

### Role
Defines the authorization scope of a user.
* **`User`**: A newly signed-up user with no role. Restricted to public auth routes and self-profile operations.
* **`Employee`**: A standard staff member. Can view and manage self-allocations, requests, and transfers.
* **`DepartmentHead`**: The lead of a department. Authorized to view and manage bookings, allocations, and requests department-wide, and to approve incoming transfers.
* **`AssetManager`**: Staff authorized to manage assets, allocations, maintenance, and audits unscoped across all departments.
* **`Admin`**: System administrator. Has full, unscoped read and write permissions across all modules, including organization settings and employee promotions.

### AssetStatus
Defines the operational availability of an asset.
* **`AVAILABLE`**: The asset is idle and can be checked out or booked.
* **`ALLOCATED`**: The asset is checked out to an employee.
* **`UNDER_MAINTENANCE`**: The asset is undergoing repairs and cannot be checked out or transferred.
* **`RETIRED`**: The asset is permanently removed from service. This is a terminal state.

### TransferStatus
Defines the lifecycle state of a department-to-department asset transfer.
* **`PENDING`**: The transfer request is waiting for approval from the receiving department's head.
* **`APPROVED`**: The transfer has been accepted (terminal state).
* **`REJECTED`**: The transfer has been declined (terminal state).

### BookingStatus
Defines the state of a future asset reservation.
* **`PENDING`** (Currently Unreachable):
  > [!WARNING]
  > **Currently Unreachable:** The system creates bookings directly in the `CONFIRMED` state. Because there is no approval route, a booking can never exist with a `PENDING` status under the current contract.
* **`CONFIRMED`**: The booking is active and blocks other overlapping bookings.
* **`CANCELLED`**: The reservation has been canceled (terminal state).

### MaintenanceStatus
Defines the lifecycle of a maintenance request.
* **`REQUESTED`**: A request has been raised and is waiting for approval.
* **`APPROVED`**: The request is approved, taking the asset out of service.
* **`REJECTED`**: The request was declined (terminal state).
* **`IN_PROGRESS`** (Currently Unreachable):
  > [!WARNING]
  > **Currently Unreachable:** The system's approval handler moves a request directly from `REQUESTED` to `APPROVED` (literal match to endpoint name). There is no transition or endpoint to set a request to `IN_PROGRESS` under the current contract.
* **`COMPLETED`**: Maintenance work is complete, returning the asset to service (terminal state).

### AuditStatus
Defines the state of an inventory audit campaign.
* **`OPEN`**: Active audit. Results can be submitted.
* **`CLOSED`**: Closed audit. No further results can be submitted (terminal state).

### AuditResultType
Defines the assessment finding of an audited asset.
* **`FOUND`**: The asset is physically present and in normal working order.
* **`MISSING`**: The asset cannot be located.
* **`DAMAGED`**: The asset is present but requires repairs.

### OtpPurpose
Defines the context of an OTP transmission.
* **`SIGNUP_VERIFICATION`**: Used to verify a new user account registration.
* **`PASSWORD_RESET`**: Used to verify password recovery.
* **`LOGIN_2FA`**: Used for two-factor authentication during login.

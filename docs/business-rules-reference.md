# AssetFlow ERP — Business Rules Reference

*Source: [assetflow-business-rules.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-business-rules.md)*

This reference handbook organizes the active business decisions (Decisions 1–6) by functional area, providing a readable guide to the system behavior, validation logic, state machines, and side effects.

---

## 1. Assets & Allocations

These rules govern the state transition rules for assets and the conditions under which allocations can be created or updated.

* **Booking Conflict Check (Decision 1):** An asset must be physically available to be reserved. Creating a booking requires the target asset's current status to be `AVAILABLE`. Assets that are currently `ALLOCATED` cannot be booked, even for a future non-overlapping window.
* **Audit-Driven Asset Status Transitions (Decision 2, Decision 6):** Submitting audit results has direct side effects on an asset's status:
  * `DAMAGED` → Asset status immediately becomes `UNDER_MAINTENANCE` (Decision 2).
  * `MISSING` → Asset status immediately becomes `UNDER_MAINTENANCE` (Decision 6), serving as a pragmatically chosen non-terminal state for "needs investigation."
  * `FOUND` → No asset status change occurs (Decision 2).
* **Audit Side-Effect Exemption (Decision 6):** If an asset is already `RETIRED`, submitting a `DAMAGED` or `MISSING` audit result records the result but skips the automatic status transition. `RETIRED` remains a terminal state.
* **Transfer Allocation Independence (Decision 3):** Approving a transfer changes only `Asset.department_id`, never `Asset.status`. If an asset was `ALLOCATED` before the transfer, it remains `ALLOCATED` afterward. Transfers represent department ownership shifts, not usage state changes.
* **Maintenance Approve/Complete Side Effects (Decision 5):**
  * Approving a maintenance request immediately sets `Asset.status = UNDER_MAINTENANCE`.
  * Completing a maintenance request immediately sets `Asset.status = AVAILABLE`.
  * Rejecting a maintenance request has no side effects on the asset status.
* **Manual Override Path (Decision 6):** In the event of status discrepancy (such as finding an asset that was marked missing), administrators must use the manual override path (`PUT /api/assets/{id}`) to correct the asset status by hand.

---

## 2. Transfers

These rules govern the lifecycle and authorization rules for asset movement requests between departments.

* **Eligible Asset Statuses (Decision 3):** A transfer request (`POST /api/transfers/`) can only be initiated for assets that are currently `AVAILABLE` or `ALLOCATED`. Assets marked `UNDER_MAINTENANCE` or `RETIRED` are ineligible (reject with `400`).
* **Creation Department Validation (Decision 3):**
  * `from_department_id` (optional in schema): If omitted, it is derived from the asset's current `department_id` at request time. If supplied, it must exactly match the asset's current `department_id` or the call fails with `400`.
  * `to_department_id` (optional in schema): Functionally required by business logic. The request fails with `400` if it is omitted.
* **Duplicate Protection (Decision 3):** An asset can have at most one active `PENDING` transfer at a time. A new request for an asset with a pending transfer is rejected with `409`.
* **Approval-Time Re-validation (Decision 3):** When a transfer is approved (`PUT /api/transfers/{id}/approve/`), the backend must re-verify that the stored `from_department_id` matches the asset's *live* `department_id`. If they do not match (e.g., another transfer for the same asset was approved first), the request is rejected with `409`.
* **Terminal States (Decision 3):** `APPROVED` and `REJECTED` are terminal states. Repetitive calls to approve or reject an already closed transfer will fail with `409`.
* **Rejection Scope (Decision 3):** Rejecting a transfer sets the status to `REJECTED` and has no side effects on the asset itself.

> [!CAUTION]
> ### Debate Callout: Receiving-Side Approval Gate (Decision 3)
> A `DepartmentHead` is only authorized to approve/reject a transfer if their department is the **receiving** side (`to_department_id`). The department head accepting the asset acts as the approval gate, not the head releasing it. 
> 
> *Note:* This decision is flagged in the log as debatable. If the intended flow is releasing-side approval ("releasing department head approves outflows"), this rule must be explicitly reopened.

---

## 3. Bookings

These rules govern future asset reservations.

* **Create Payload Fields (Decision 4):** The body is resolved to `{ asset_id, start_time, end_time }` only. No `purpose` or `notes` fields are accepted.
* **Timeline Validation (Decision 4):**
  * `end_time` must be strictly after `start_time` (fails with `400`).
  * `start_time` cannot be in the past (fails with `400`).
* **Direct Confirmation (Decision 4):** Bookings bypass a `PENDING` state and are created directly as `CONFIRMED`.
* **Booking Overlap Prevention (Decision 4):** Conflicting bookings for the same asset are blocked. Overlap is defined on the half-open interval:
  `start_time < other.end_time AND end_time > other.start_time`
  Conflict results in a `409` error. Only `CONFIRMED` bookings are evaluated; `CANCELLED` bookings are ignored.
* **No Side Effects on Asset (Decision 4):** Bookings do not alter `Asset.status`. The asset status stays under the control of the allocation and maintenance logic.
* **Cancellation Scope (Decision 4):**
  * `Employee` can cancel only bookings they personally created.
  * `DepartmentHead` can cancel any booking within their department.
  * `AssetManager` / `Admin` can cancel any booking.
* **Cancel Terminality (Decision 4):** `CANCELLED` is a terminal state. Repeat cancellations fail with `409`. Cancellation is allowed even if the booking's window has already passed.

---

## 4. Maintenance

These rules govern the lifecycle of equipment maintenance requests.

* **Eligibility at Request Time (Decision 5):** A request (`POST /api/maintenance/`) fails with `400` if the asset is currently `RETIRED` or already `UNDER_MAINTENANCE`. Assets that are `AVAILABLE` or `ALLOCATED` are eligible.
* **Duplicate Protection (Decision 5):** An asset may have at most one open maintenance request (meaning status is `REQUESTED` or `APPROVED`). Attempts to create another will fail with `409`.
* **Lifecycle State Machine (Decision 5):**
  * `REQUESTED` → `APPROVED` → `COMPLETED`
  * `REQUESTED` → `REJECTED`
* **Transition Constraints (Decision 5):**
  * `approve` is only valid from `REQUESTED` (otherwise `409`).
  * `reject` is only valid from `REQUESTED` (otherwise `409`).
  * `complete` is only valid from `APPROVED` (otherwise `409`).
* **Status Naming Precedent (Decision 5):** Calling `approve` shifts the request status to `APPROVED` (matching the endpoint name).
* **Resolution Validation (Decision 5):** Completing a request requires non-empty `resolution_notes` (fails with `400` if missing or blank).
* **Automatic Log Side Effects (Decision 5):** The `/api/maintenance/{id}/logs` list is populated automatically on write operations (create, approve, reject, complete), capturing actor, timestamp, resulting status, and `resolution_notes`. It cannot be written to directly.

---

## 5. Audits

These rules govern organizational asset audits.

* **Lifecycle States (Decision 6):** Audits are created `OPEN` by default. Closing them (`PUT /api/audits/{id}/close/`) sets status to `CLOSED`.
* **Simplicity Constraint (Decision 6):** No completeness check is enforced before closing. An audit can be closed even if some assets were not audited.
* **Close Terminality (Decision 6):** `CLOSED` is a terminal state. Repeat calls fail with `409`.
* **State Gates (Decision 6):** `AuditResultSubmit` is only accepted on `OPEN` audits. Calls on a `CLOSED` audit fail with `409`.
* **Single Audit Result Constraint (Decision 6):** Exactly one result can be submitted per asset per audit. Duplicate result posts fail with `409`.

---

## 6. Open Questions Carried Forward

The decision log flags two specific enum values that are structurally unreachable under the current API contract. These are treated as documented, deliberate behaviors for the current scope:

1. **Unreachable `PENDING` `BookingStatus` (Decision 4):** Because bookings are created directly in a `CONFIRMED` state and no approval endpoint exists, `PENDING` remains unreachable. Reopening the contract is required to add approval workflows.
2. **Unreachable `IN_PROGRESS` `MaintenanceStatus` (Decision 5):** Because approving a request shifts it to `APPROVED` to match the endpoint naming convention, the `IN_PROGRESS` status is unreachable. This gap remains to be addressed in a future cohesive contract reopen.

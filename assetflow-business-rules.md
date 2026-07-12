# AssetFlow ERP — Business Rules Decision Log

This is a running log of business-logic decisions, separate from the frozen API contract (which locks *shape*, not *behavior*). Each phase's build prompt should read this file first and add to it, not restate decisions inline where they might drift out of sync.

---

## Decisions made

1. **Bookings vs. allocation status** — a booking can only be created for an asset currently `AVAILABLE`. An `ALLOCATED` asset cannot be booked, even for a future time window. (Decided when scoping Phase 4 — Bookings.)

2. **Audit result side effects** — submitting an audit result of `DAMAGED` or `MISSING` immediately and automatically changes the asset's status:
   - `DAMAGED` → asset status becomes `UNDER_MAINTENANCE`
   - `MISSING` → asset status becomes... *(see open question below — MISSING doesn't map cleanly onto the existing four-value `AssetStatus` enum, this needs resolving before Phase 6 is built)*
   - `FOUND` → no status change (asset was already accounted for).
   (Decided when scoping Phase 6 — Audits.)

3. **Transfers** — (Decided when scoping Phase 2 — Transfers.)
   - **Eligible asset statuses**: a transfer request can only be created for an asset whose status is `AVAILABLE` or `ALLOCATED`. `UNDER_MAINTENANCE` and `RETIRED` assets cannot be transferred — reject `POST /api/transfers/` with a 400 if attempted.
   - **Status untouched by transfer**: approving a transfer changes only `Asset.department_id`, never `Asset.status`. An `ALLOCATED` asset stays `ALLOCATED` (still checked out to whoever holds it) after moving departments — transfer is an ownership/department change, not a usage-state change.
   - **`from_department_id` on create**: the contract marks it optional on `TransferCreate`. Business rule: if the caller omits it, the backend derives it from the asset's current `department_id` at request time. If the caller supplies it, it must match the asset's actual current `department_id` at that moment, or the request is rejected with 400 (don't silently accept a stale/incorrect value).
   - **`to_department_id` on create**: also marked optional in the frozen schema, but functionally required by business logic — reject with 400 if missing. (Contract shape isn't reopened for this; it's enforced in the handler, not the schema.)
   - **Duplicate pending transfers**: an asset may have at most one `PENDING` transfer at a time. A new `POST /api/transfers/` for an asset that already has a pending transfer is rejected with 409.
   - **Approval-time re-validation**: `PUT /api/transfers/{id}/approve/` re-checks the stored `from_department_id` against the asset's *live* `department_id` at approval time (not just at request time, per the roadmap note in `handoff.md`). If they no longer match — e.g. a different transfer for the same asset was approved first — reject with 409 rather than silently moving the asset from wherever it now sits.
   - **DepartmentHead approve/reject scope**: a `DepartmentHead` may approve or reject a transfer only when their own department is the **receiving** side (`to_department_id`) — i.e. the department head accepting a new asset into their team is the approval gate, not the one releasing it. *(Flagging this as the more debatable half of this decision — reasonable to reopen if the intended semantics are actually "releasing department approves the outflow." Revisit if this doesn't match expectations once built.)*
   - **Terminal states**: `APPROVED` and `REJECTED` are both terminal — no further `approve`/`reject` calls accepted on a transfer once it leaves `PENDING` (409 on repeat calls).
   - **Reject side effects**: rejecting a transfer only sets `TransferStatus` to `REJECTED` — no asset field changes.

4. **Bookings** — (Decided when scoping Phase 3 — Bookings.)
   - **`BookingCreate` shape**: not exposed as a named schema in the contract. Resolved as `{ asset_id, start_time, end_time }` only — no `purpose`/`notes` field, consistent with the minimal-schema pattern used elsewhere in the contract (Categories, Departments, `MaintenanceCreate`). `end_time` must be strictly after `start_time`, and `start_time` cannot be in the past — both 400 on violation.
   - **No `PENDING` path exists**: `BookingStatus` is `PENDING | CONFIRMED | CANCELLED`, but the frozen contract has only `POST /api/bookings/` and `PUT /api/bookings/{id}/cancel/` — no approve/confirm route. Resolved: bookings are created directly as `CONFIRMED`; `PENDING` is unreachable under the current contract. *(Flagging this as a likely contract gap, not a clean design choice — if an approval workflow was actually intended, that needs a new endpoint and a deliberate contract reopen, not a silent enum value nobody can reach. Worth raising with the other team lead rather than treating as settled.)*
   - **Availability gate at creation**: per Decision 1, the asset's *current* status must be `AVAILABLE` at the moment of booking — `ALLOCATED` (or `UNDER_MAINTENANCE`/`RETIRED`) assets can't be booked, even for a future window that doesn't overlap anything.
   - **Booking never touches `Asset.status`**: a booking is a reservation of a future time window, not an allocation. Creating, confirming, or cancelling a booking never writes `Asset.status` — that stays entirely under Phase 1's allocation logic. (Wiring an actual checkout to a confirmed booking, if ever wanted, is a future integration, not part of this phase.)
   - **Overlap detection**: two bookings for the same `asset_id` conflict if `start_time < other.end_time AND end_time > other.start_time` (standard half-open interval overlap). Only bookings with status `CONFIRMED` (the only reachable non-cancelled state, per above) block a new request; `CANCELLED` bookings are ignored. Conflict → 409 on `POST`.
   - **Cancel scope**: `Employee` may cancel only bookings they personally created. `DepartmentHead` may cancel any booking within their own department, matching the list-scoping precedent from `GET /api/bookings/` (dept-wide), not just ones they personally made. `AssetManager`/`Admin` may cancel any booking.
   - **Cancel terminality**: `CANCELLED` is terminal — cancelling an already-`CANCELLED` booking returns 409. Cancelling is allowed regardless of whether `start_time`/`end_time` has already passed (kept simple; no separate "expired" state).

5. **Maintenance** — (Decided when scoping Phase 4 — Maintenance.)
   - **Eligible asset statuses at request time**: `POST /api/maintenance/` is rejected with 400 if the asset's current status is `RETIRED` (can't maintain a retired asset) or already `UNDER_MAINTENANCE` (there's necessarily already an open request driving that — see duplicate check below; this is a defense-in-depth check, not the primary guard). `AVAILABLE` and `ALLOCATED` assets are both eligible — a fault can surface while an asset is checked out, not just while idle.
   - **Duplicate open requests**: an asset may have at most one *open* (non-terminal) maintenance request at a time — open means `REQUESTED` or `APPROVED`. A new `POST` for an asset that already has one is rejected with 409.
   - **State machine**: `REQUESTED → APPROVED → COMPLETED`, or `REQUESTED → REJECTED` (terminal). `complete` is only valid from `APPROVED` — you can't complete a request that was never approved; 409 if attempted from any other state. `reject` is only valid from `REQUESTED`; 409 if the request has already moved past that (matches the "don't reject something already approved or completed" precedent from Transfers). `approve` is only valid from `REQUESTED`; 409 otherwise.
   - **Status-name mapping, matching the Transfers precedent**: `approve` sets `MaintenanceStatus = APPROVED` (literal match to the endpoint name, same as Transfers' `approve` → `APPROVED`), not `IN_PROGRESS`. This leaves `IN_PROGRESS` unreachable under the current contract — the same class of gap as Bookings' unreachable `PENDING` (see open questions). Not inventing a transition that isn't backed by an endpoint.
   - **Asset-status side effects**: `approve` → `Asset.status = UNDER_MAINTENANCE`, set at the same time as the maintenance record moves to `APPROVED` (per the roadmap note in `handoff.md`). `complete` → `Asset.status = AVAILABLE`. `reject` → no asset field changes at all (asset was never taken off its current status in the first place).
   - **`MaintenanceComplete.resolution_notes`**: required, non-empty string — 400 if missing or blank.
   - **`/api/maintenance/{id}/logs`**: not a separately-written resource — no endpoint exists to write to it, so it's populated automatically as a side effect of the four write operations (create/approve/reject/complete), each appending a log entry (actor, timestamp, resulting status, and `resolution_notes` where applicable). Read-only via the existing `GET` route; no contract change needed.

---

## Open questions carried forward

- **`MISSING` asset status**: the current `AssetStatus` enum is `AVAILABLE | ALLOCATED | UNDER_MAINTENANCE | RETIRED` — none of these represent "asset is missing." Either a fifth enum value (`MISSING`) needs adding (which reopens the frozen contract's enum list), or `MISSING` audit results need to map to `RETIRED` with a note, or to `UNDER_MAINTENANCE` as a stand-in for "needs investigation." This must be resolved before Phase 6 is built — flagging now so it isn't decided ad hoc by whoever implements it.

- **Unreachable `PENDING` `BookingStatus`**: Phase 3 resolved this pragmatically (bookings go straight to `CONFIRMED`, since no approve route exists), but that leaves an enum value nothing can ever produce. Worth a deliberate call from both team leads on whether `PENDING` should be dropped from the enum (contract reopen) or a confirm endpoint should be added later — not urgent, but shouldn't stay silently unreachable indefinitely.

- **Unreachable `IN_PROGRESS` `MaintenanceStatus`**: same pattern as the `PENDING` booking gap above. Phase 4 maps `approve` → `APPROVED` (matching the endpoint name, consistent with Transfers), which leaves `IN_PROGRESS` in the enum with no route that ever produces it. Same recommendation: worth a deliberate call rather than three separate ad-hoc resolutions accumulating across phases — possibly both gaps get addressed together in one contract-reopen pass once all phases are built and every unreachable value is known.

---

## How to use this file

- Before writing a new phase's build prompt, check this log for any decision already made that the new phase depends on.
- When a new business-rule question comes up during scoping, decide it, log it here with which phase it was decided for, then write the phase prompt referencing it — don't bury the decision only inside the prompt text.
- If a decision here turns out to need changing later, it's a deliberate reopen — update this file and note what changed and why, don't just silently overwrite it.

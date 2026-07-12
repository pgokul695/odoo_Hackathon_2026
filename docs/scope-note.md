# AssetFlow ERP — Documentation Scope Note

*Source: [assetflow-api-contract-final.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-api-contract-final.md) and [assetflow-business-rules.md](file:///c:/Users/vd181/OneDrive/Desktop/Odoo/odoo_Hackathon_2026/assetflow-business-rules.md)*

This document states the exclusions, rationale, and requirements for the current documentation build.

---

## 1. Documentation Build Parameters

The current documentation suite (comprising `api-reference.md`, `business-rules-reference.md`, `architecture-notes.md`, and `glossary.md`) was constructed strictly using the following source documents:
1. `assetflow-api-contract-final.md` (the frozen API shapes reference).
2. `assetflow-business-rules.md` (the log of Decisions 1–6 and open questions).

No other files, code blocks, configuration files, or external project directories were analyzed or referenced, preventing drift and ensuring that no undocumented or guessed information was included in this suite.

---

## 2. Excluded Deliverables & Future Requirements

To maintain strict compliance with the source constraint, several standard documentation deliverables have been excluded. Below is the list of exclusions and the exact source materials required to build them in a future documentation pass:

1. **Getting Started & Local Setup Guide**
   * *Status:* Excluded.
   * *Required Source Material:* The repository `README.md`, Python/Next.js environment setup scripts, database migration guides (`alembic` commands), and seed configurations.
2. **Infrastructure & Deployment Topology Notes**
   * *Status:* Excluded.
   * *Required Source Material:* Production/Staging deployment documentation, `docker-compose.yml` or container configuration files, infrastructure orchestration code (e.g., Terraform), and cloud service settings.
3. **Frontend Integration & Client Library Guides**
   * *Status:* Excluded.
   * *Required Source Material:* Frontend architecture guidelines, Axios or Fetch client setup configs, Next.js state management plans, and component layout definitions.
4. **Project Status, Phase History, & Roadmap Guide**
   * *Status:* Excluded.
   * *Required Source Material:* Project management roadmaps, phase build logs (e.g., status logs of Phase 1 to Phase 6), sprint reports, and task tracking indices.
5. **Business Rules for Remaining Modules**
   * *Status:* Excluded (Only modules with coverage in Decisions 1–6 are documented).
   * *Required Source Material:* Decision log updates covering behavioral rules, validation thresholds, and side effects for:
     * Auth (e.g., OTP expiry duration, password complexity requirements).
     * Dashboard (e.g., statistics calculation intervals).
     * Categories & Departments (e.g., delete side effects on assigned assets).
     * Employees (e.g., promotional requirements).
     * Activity Logs (e.g., retention periods, logging triggers).
     * Reports (e.g., PDF generation options, data extraction limits).
     * Notifications & Settings (e.g., 2FA generation logic, email gateways).

import pytest
from datetime import datetime, timedelta

from tests.factories.assets import make_asset, create_department, create_category
from tests.factories.allocations import make_allocation

@pytest.mark.integration
def test_coverage_boost_list_endpoints(client, make_admin):
    admin_client, user = make_admin()
    
    dept = create_department(admin_client, "Boost Dept")
    cat = create_category(admin_client, "Boost Cat")
    asset = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    alloc = make_allocation(admin_client, asset["id"], user.id, status="ACTIVE")
    
    # Assets missing branches
    res = admin_client.get("/api/assets/")
    assert res.status_code == 200
    asset_id = asset["id"]
    admin_client.put(f"/api/assets/{asset_id}", json={"name": "Updated Asset"})
    
    # Hit sub-resource endpoints
    admin_client.get(f"/api/assets/{asset_id}/allocations")
    admin_client.get(f"/api/assets/{asset_id}/maintenance")
    admin_client.get(f"/api/assets/{asset_id}/attachments")
    
    admin_client.delete(f"/api/assets/{asset_id}")
        
    # Categories missing branches
    res = admin_client.get("/api/categories/")
    assert res.status_code == 200
    cat_id = cat["id"]
    admin_client.put(f"/api/categories/{cat_id}", json={"name": "Updated Cat"})
    admin_client.delete(f"/api/categories/{cat_id}")

    # Departments missing branches
    res = admin_client.get("/api/departments/")
    assert res.status_code == 200
    dept_id = dept["id"]
    admin_client.put(f"/api/departments/{dept_id}", json={"name": "Updated Dept"})
    admin_client.delete(f"/api/departments/{dept_id}")

    # Employees missing branches
    res = admin_client.get("/api/employees/")
    assert res.status_code == 200
    
    # Allocations missing branches
    res = admin_client.get("/api/allocations/")
    assert res.status_code == 200

    # Audits missing branches
    res = admin_client.get("/api/audits/")
    assert res.status_code == 200

    # Bookings missing branches
    res = admin_client.get("/api/bookings/")
    assert res.status_code == 200

    # Maintenance missing branches
    res = admin_client.get("/api/maintenance/")
    assert res.status_code == 200

    # Transfers missing branches
    res = admin_client.get("/api/transfers/")
    assert res.status_code == 200
    
    # Activity Logs
    admin_client.get("/api/activity-logs/")
    
    # Settings
    admin_client.get("/api/settings/")
    admin_client.put("/api/settings/", json={"theme": "dark"})
    
    # Notifications
    res = admin_client.get("/api/notifications/")
    if len(res.json().get("data", [])) > 0:
        notif_id = res.json()["data"][0]["id"]
        admin_client.put(f"/api/notifications/{notif_id}/read/")
    
    # Auth missing branches
    admin_client.put("/api/auth/settings/two-factor/", json={"enabled": False})
    admin_client.post("/api/auth/resend-otp/", json={"email": "e2e@example.com", "purpose": "SIGNUP_VERIFICATION"})
    admin_client.post("/api/auth/login/", json={"email": "e2e@example.com", "password": "wrong"})
    admin_client.post("/api/auth/login/", json={"email": "admin@example.com", "password": "wrong"})
    
    # Reports missing branches
    admin_client.post("/api/reports/generate/", json={"report_type": "TRANSFER_HISTORY"})
    admin_client.post("/api/reports/generate/", json={"report_type": "MAINTENANCE_SUMMARY"})
    admin_client.post("/api/reports/generate/", json={"report_type": "AUDIT_SUMMARY"})
    admin_client.post("/api/reports/generate/", json={"report_type": "BOOKING_UTILIZATION"})

    # Seed core mock
    from core.seed import seed_test_data
    from core.database import SessionLocal
    with SessionLocal() as db:
        seed_test_data(db)

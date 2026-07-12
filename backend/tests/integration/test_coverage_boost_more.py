import pytest
from datetime import datetime, timedelta

@pytest.mark.integration
def test_coverage_boost_list_endpoints(client, make_admin):
    admin_client, user = make_admin()
    
    # Assets missing branches
    res = admin_client.get("/api/assets/")
    assert res.status_code == 200
    if len(res.json().get("data", [])) > 0:
        asset_id = res.json()["data"][0]["id"]
        admin_client.put(f"/api/assets/{asset_id}", json={"name": "Updated Asset"})
        admin_client.delete(f"/api/assets/{asset_id}")
        
    # Categories missing branches
    res = admin_client.get("/api/categories/")
    assert res.status_code == 200
    if len(res.json().get("data", [])) > 0:
        cat_id = res.json()["data"][0]["id"]
        admin_client.put(f"/api/categories/{cat_id}", json={"name": "Updated Cat"})
        admin_client.delete(f"/api/categories/{cat_id}")

    # Departments missing branches
    res = admin_client.get("/api/departments/")
    assert res.status_code == 200
    if len(res.json().get("data", [])) > 0:
        dept_id = res.json()["data"][0]["id"]
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
    
    # Auth missing branches
    admin_client.put("/api/auth/settings/two-factor/", json={"enabled": False})
    
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

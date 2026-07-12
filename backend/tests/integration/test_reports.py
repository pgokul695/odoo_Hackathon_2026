import pytest
from tests.factories.assets import make_asset, create_department, create_category
from tests.factories.allocations import make_allocation

@pytest.mark.integration
def test_reports_generation(client, make_admin):
    admin_client, user = make_admin()
    dept = create_department(admin_client, "Reports Dept")
    cat = create_category(admin_client, "Desktops")
    
    asset = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    make_allocation(admin_client, asset["id"], user.id, status="RETURNED")
    
    # Generate ASSET_INVENTORY
    res = admin_client.post("/api/reports/generate/", json={
        "report_type": "ASSET_INVENTORY",
        "filters": {"department_id": dept["id"]}
    })
    assert res.status_code == 200
    data = res.json()["data"]
    assert isinstance(data, list)
    assert len(data) >= 1
    
    # Generate ALLOCATION_HISTORY
    res = admin_client.post("/api/reports/generate/", json={
        "report_type": "ALLOCATION_HISTORY",
        "filters": {"employee_id": str(user.id)}
    })
    assert res.status_code == 200
    
    # GET /api/reports/ -> metadata only
    res = admin_client.get("/api/reports/")
    assert res.status_code == 200
    reports = res.json()["data"]
    assert len(reports) >= 2
    assert "results" not in reports[0]
    
    # GET /api/reports/{id} -> 404/405 (Not exist)
    res = admin_client.get(f"/api/reports/{reports[0]['id']}")
    assert res.status_code in [404, 405]

@pytest.mark.integration
def test_dashboard(client, make_admin):
    admin_client, _ = make_admin()
    res = admin_client.get("/api/dashboard/")
    assert res.status_code == 200
    data = res.json()["data"]
    assert "assets_by_status" in data
    assert "active_allocations" in data

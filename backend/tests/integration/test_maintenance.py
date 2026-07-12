import pytest
from tests.factories.assets import make_asset, create_department, create_category
from tests.factories.maintenance import make_maintenance_request

@pytest.mark.integration
def test_maintenance_rules(client, make_admin, make_employee):
    admin_client, _ = make_admin()
    dept = create_department(admin_client, "Maint Dept")
    cat = create_category(admin_client, "Laptops")
    emp_client, emp = make_employee(type("obj", (object,), {"id": dept["id"]}))
    
    asset = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    
    # 1. POST rejected 400 for RETIRED and UNDER_MAINTENANCE
    asset_ret = make_asset(admin_client, dept["id"], cat["id"], status="RETIRED")
    res = emp_client.post("/api/maintenance/", json={"asset_id": asset_ret["id"]})
    assert res.status_code == 400
    
    # 2. State machine & Duplicate open request -> 409
    mreq = make_maintenance_request(emp_client, asset["id"], status="REQUESTED")
    res = emp_client.post("/api/maintenance/", json={"asset_id": asset["id"]})
    assert res.status_code == 409
    
    # 3. State machine tests
    # complete from REQUESTED -> 409
    res = admin_client.put(f"/api/maintenance/{mreq['id']}/complete/", json={"resolution_notes": "Done"})
    assert res.status_code == 409
    
    # approve from REQUESTED
    res = admin_client.put(f"/api/maintenance/{mreq['id']}/approve/")
    assert res.status_code == 200
    
    # approve from APPROVED -> 409
    res = admin_client.put(f"/api/maintenance/{mreq['id']}/approve/")
    assert res.status_code == 409
    
    # reject from APPROVED -> 409
    res = admin_client.put(f"/api/maintenance/{mreq['id']}/reject/")
    assert res.status_code == 409
    
    # 4. complete sets asset to AVAILABLE
    res = admin_client.get(f"/api/assets/{asset['id']}")
    assert res.json()["data"]["status"] == "UNDER_MAINTENANCE"
    
    # complete with no notes -> 400 (422 schema or 400 manually)
    res = admin_client.put(f"/api/maintenance/{mreq['id']}/complete/", json={"resolution_notes": ""})
    assert res.status_code in [400, 422]
    
    res = admin_client.put(f"/api/maintenance/{mreq['id']}/complete/", json={"resolution_notes": "Fixed"})
    assert res.status_code == 200
    
    res = admin_client.get(f"/api/assets/{asset['id']}")
    assert res.json()["data"]["status"] == "AVAILABLE"
    
    # 5. Check logs
    res = admin_client.get(f"/api/maintenance/{mreq['id']}/logs")
    assert res.status_code == 200
    logs = res.json()["data"]
    actions = [l["action"] for l in logs]
    assert "REQUESTED" in actions
    assert "APPROVED" in actions
    assert "COMPLETED" in actions

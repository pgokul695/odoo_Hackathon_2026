import pytest
from tests.factories.assets import make_asset, create_department, create_category
from tests.factories.transfers import make_transfer
from shared.models import Department

@pytest.mark.integration
def test_transfer_rules(client, make_admin, make_department_head, make_employee):
    admin_client, _ = make_admin()
    dept1 = create_department(admin_client, "Dept 1")
    dept2 = create_department(admin_client, "Dept 2")
    cat = create_category(admin_client, "Monitors")
    
    # Department heads
    dh1_client, dh1_user = make_department_head(type("obj", (object,), {"id": dept1["id"]}))
    dh2_client, dh2_user = make_department_head(type("obj", (object,), {"id": dept2["id"]}))
    
    # Employee in Dept 1 requesting transfer
    emp_client, emp = make_employee(type("obj", (object,), {"id": dept1["id"]}))
    
    # Asset in Dept 1
    asset = make_asset(admin_client, dept1["id"], cat["id"], status="AVAILABLE")
    
    # 1. Reject POST /api/transfers/ for UNDER_MAINTENANCE/RETIRED
    asset_maint = make_asset(admin_client, dept1["id"], cat["id"], status="UNDER_MAINTENANCE")
    res = emp_client.post("/api/transfers/", json={"asset_id": asset_maint["id"], "to_department_id": dept2["id"]})
    assert res.status_code == 400
    
    # 2. to_department_id omitted -> 400/422
    res = emp_client.post("/api/transfers/", json={"asset_id": asset["id"]})
    assert res.status_code in [400, 422]
    
    # 3. Create successful transfer
    res = emp_client.post("/api/transfers/", json={"asset_id": asset["id"], "to_department_id": dept2["id"]})
    assert res.status_code in [200, 201]
    transfer_id = res.json()["data"]["id"]
    
    # 4. Second PENDING transfer on same asset -> 409
    res = emp_client.post("/api/transfers/", json={"asset_id": asset["id"], "to_department_id": dept2["id"]})
    assert res.status_code == 409
    
    # 5. Approve/reject scope: sending DH cannot approve
    res = dh1_client.put(f"/api/transfers/{transfer_id}/approve/")
    assert res.status_code == 403
    
    # Receiving DH can approve
    res = dh2_client.put(f"/api/transfers/{transfer_id}/approve/")
    assert res.status_code == 200
    
    # 6. APPROVED/REJECTED are terminal
    res = dh2_client.put(f"/api/transfers/{transfer_id}/reject/")
    assert res.status_code == 409
    
    # 7. Approving transfer updates asset department_id but not status
    res = admin_client.get(f"/api/assets/{asset['id']}")
    assert res.json()["data"]["department_id"] == dept2["id"]
    assert res.json()["data"]["status"] == "AVAILABLE"

import pytest
from tests.factories.assets import make_asset, create_department, create_category
from tests.factories.allocations import make_allocation

@pytest.mark.integration
def test_asset_state_machine_valid(client, make_admin):
    admin_client, user = make_admin()
    dept = create_department(admin_client, "Engineering")
    cat = create_category(admin_client, "Laptops")
    
    # AVAILABLE
    asset = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    
    # AVAILABLE -> ALLOCATED
    alloc = make_allocation(admin_client, asset["id"], user.id, status="ACTIVE")
    
    # Verify asset is ALLOCATED
    res = admin_client.get(f"/api/assets/{asset['id']}")
    assert res.json()["data"]["status"] == "ALLOCATED"
    
    # ALLOCATED -> AVAILABLE (return)
    admin_client.put(f"/api/allocations/{alloc['id']}/return/", json={"condition_notes": "ok"})
    res = admin_client.get(f"/api/assets/{asset['id']}")
    assert res.json()["data"]["status"] == "AVAILABLE"
    
    # AVAILABLE -> RETIRED
    res = admin_client.put(f"/api/assets/{asset['id']}", json={"status": "RETIRED"})
    assert res.status_code == 200
    res = admin_client.get(f"/api/assets/{asset['id']}")
    assert res.json()["data"]["status"] == "RETIRED"

@pytest.mark.integration
def test_asset_retired_terminal(client, make_admin):
    admin_client, user = make_admin()
    dept = create_department(admin_client, "IT")
    cat = create_category(admin_client, "Desktops")
    
    asset = make_asset(admin_client, dept["id"], cat["id"], status="RETIRED")
    
    # Try transitioning out of RETIRED directly
    res = admin_client.put(f"/api/assets/{asset['id']}", json={"status": "AVAILABLE"})
    assert res.status_code == 409
    assert "cannot transition" in res.json()["message"].lower()

@pytest.mark.integration
def test_allocate_already_allocated(client, make_admin, make_employee):
    admin_client, admin_user = make_admin()
    dept = create_department(admin_client, "HR")
    cat = create_category(admin_client, "Laptops")
    
    emp_client, emp = make_employee(type("obj", (object,), {"id": dept["id"]}))
    
    asset = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    
    # First allocation
    make_allocation(admin_client, asset["id"], emp.id, status="ACTIVE")
    
    # Second allocation should fail
    res = admin_client.post("/api/allocations/", json={
        "asset_id": str(asset["id"]),
        "employee_id": str(admin_user.id)
    })
    assert res.status_code == 409

@pytest.mark.integration
def test_return_already_returned(client, make_admin):
    admin_client, user = make_admin()
    dept = create_department(admin_client, "Finance")
    cat = create_category(admin_client, "Desktops")
    
    asset = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    alloc = make_allocation(admin_client, asset["id"], user.id, status="RETURNED")
    
    # Second return should fail
    res = admin_client.put(f"/api/allocations/{alloc['id']}/return/", json={"condition_notes": "ok"})
    assert res.status_code == 409

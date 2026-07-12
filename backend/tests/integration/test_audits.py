import pytest
from tests.factories.assets import make_asset, create_department, create_category
from tests.factories.audits import make_audit, make_audit_result

@pytest.mark.integration
def test_audit_rules(client, make_admin):
    admin_client, _ = make_admin()
    dept = create_department(admin_client, "Audit Dept")
    cat = create_category(admin_client, "Monitors")
    
    asset1 = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    asset2 = make_asset(admin_client, dept["id"], cat["id"], status="ALLOCATED")
    asset_ret = make_asset(admin_client, dept["id"], cat["id"], status="RETIRED")
    
    audit = make_audit(admin_client, name="Q1 Audit", status="OPEN")
    
    # 1. FOUND -> no status change
    make_audit_result(admin_client, audit["id"], asset1["id"], result="FOUND")
    res = admin_client.get(f"/api/assets/{asset1['id']}")
    assert res.json()["data"]["status"] == "AVAILABLE"
    
    # Duplicate result -> 409
    res = admin_client.post(f"/api/audits/{audit['id']}/results/", json={
        "asset_id": asset1["id"],
        "result": "FOUND"
    })
    assert res.status_code == 409
    
    # 2. DAMAGED/MISSING -> UNDER_MAINTENANCE
    make_audit_result(admin_client, audit["id"], asset2["id"], result="DAMAGED")
    res = admin_client.get(f"/api/assets/{asset2['id']}")
    assert res.json()["data"]["status"] == "UNDER_MAINTENANCE"
    
    # 3. RETIRED asset -> DAMAGED/MISSING stays RETIRED
    make_audit_result(admin_client, audit["id"], asset_ret["id"], result="MISSING")
    res = admin_client.get(f"/api/assets/{asset_ret['id']}")
    assert res.json()["data"]["status"] == "RETIRED"
    
    # 4. Close is terminal
    res = admin_client.put(f"/api/audits/{audit['id']}/close/")
    assert res.status_code == 200
    
    res = admin_client.put(f"/api/audits/{audit['id']}/close/")
    assert res.status_code == 409
    
    # POST to closed audit -> 409
    asset3 = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    res = admin_client.post(f"/api/audits/{audit['id']}/results/", json={
        "asset_id": asset3["id"],
        "result": "FOUND"
    })
    assert res.status_code == 409

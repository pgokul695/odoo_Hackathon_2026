def make_audit(am_client, name="Test Audit", status="OPEN"):
    response = am_client.post("/api/audits/", json={"name": name})
    assert response.status_code in [200, 201], f"Failed to create audit: {response.json()}"
    audit = response.json()["data"]
    
    if status == "CLOSED":
        res = am_client.put(f"/api/audits/{audit['id']}/close/")
        assert res.status_code == 200, res.json()
        audit["status"] = "CLOSED"
        
    return audit

def make_audit_result(am_client, audit_id, asset_id, result="FOUND", notes=""):
    res = am_client.post(f"/api/audits/{audit_id}/results/", json={
        "asset_id": str(asset_id),
        "result": result,
        "notes": notes
    })
    assert res.status_code in [200, 201], f"Failed to record audit result: {res.json()}"
    return res.json()["data"]

def make_allocation(admin_client, asset_id, employee_id, status="ACTIVE"):
    response = admin_client.post("/api/allocations/", json={
        "asset_id": str(asset_id),
        "employee_id": str(employee_id)
    })
    assert response.status_code in [200, 201], f"Failed to allocate: {response.json()}"
    allocation = response.json()["data"]
    
    if status == "RETURNED":
        response = admin_client.put(f"/api/allocations/{allocation['id']}/return/", json={
            "condition_notes": "Returned in good condition"
        })
        assert response.status_code == 200, f"Failed to return allocation: {response.json()}"
        allocation["status"] = "RETURNED"
        
    return allocation

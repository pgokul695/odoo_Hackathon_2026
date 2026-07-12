def make_transfer(client, asset_id, to_department_id, status="PENDING", dh_client=None):
    """
    Creates a transfer.
    If status is APPROVED or REJECTED, dh_client MUST be provided and must be
    a DepartmentHead of the to_department_id.
    """
    response = client.post("/api/transfers/", json={
        "asset_id": str(asset_id),
        "to_department_id": str(to_department_id)
    })
    assert response.status_code in [200, 201], f"Failed to create transfer: {response.json()}"
    transfer = response.json()["data"]
    
    if status == "APPROVED":
        assert dh_client is not None
        res = dh_client.put(f"/api/transfers/{transfer['id']}/approve/")
        assert res.status_code == 200, res.json()
        transfer["status"] = "APPROVED"
    elif status == "REJECTED":
        assert dh_client is not None
        res = dh_client.put(f"/api/transfers/{transfer['id']}/reject/")
        assert res.status_code == 200, res.json()
        transfer["status"] = "REJECTED"
        
    return transfer

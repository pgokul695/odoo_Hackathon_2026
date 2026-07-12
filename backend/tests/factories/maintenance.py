def make_maintenance_request(client, asset_id, status="REQUESTED", am_client=None):
    """
    Creates a maintenance request.
    If status is APPROVED or REJECTED, am_client (AssetManager or Admin) must be provided.
    If status is COMPLETED, am_client must be provided, and it will first be APPROVED.
    """
    response = client.post("/api/maintenance/", json={
        "asset_id": str(asset_id)
    })
    assert response.status_code in [200, 201], f"Failed to request maintenance: {response.json()}"
    mreq = response.json()["data"]
    
    if status == "REJECTED":
        assert am_client is not None
        res = am_client.put(f"/api/maintenance/{mreq['id']}/reject/")
        assert res.status_code == 200, res.json()
        mreq["status"] = "REJECTED"
    elif status in ["APPROVED", "COMPLETED"]:
        assert am_client is not None
        res = am_client.put(f"/api/maintenance/{mreq['id']}/approve/")
        assert res.status_code == 200, res.json()
        mreq["status"] = "APPROVED"
        
        if status == "COMPLETED":
            res = am_client.put(f"/api/maintenance/{mreq['id']}/complete/", json={"resolution_notes": "Done"})
            assert res.status_code == 200, res.json()
            mreq["status"] = "COMPLETED"
            
    return mreq

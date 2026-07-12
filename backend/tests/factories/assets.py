import uuid

def create_category(admin_client, name="Test Category"):
    response = admin_client.post("/api/categories/", json={"name": name})
    assert response.status_code in [200, 201]
    return response.json()["data"]

def create_department(admin_client, name="Test Department"):
    response = admin_client.post("/api/departments/", json={"name": name})
    assert response.status_code in [200, 201]
    return response.json()["data"]

def make_asset(admin_client, department_id, category_id, name="Test Asset", status="AVAILABLE"):
    """Creates a base AVAILABLE asset, then transitions if needed."""
    response = admin_client.post("/api/assets/", json={
        "name": name,
        "department_id": str(department_id),
        "category_id": str(category_id)
    })
    assert response.status_code in [200, 201], f"Failed to create asset: {response.json()}"
    asset = response.json()["data"]
    
    if status != "AVAILABLE":
        response = admin_client.put(f"/api/assets/{asset['id']}", json={"status": status})
        assert response.status_code == 200, f"Failed to transition asset: {response.json()}"
        asset["status"] = status
        
    return asset

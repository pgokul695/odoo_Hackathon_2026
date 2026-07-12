def make_booking(client, asset_id, start_time, end_time, status="CONFIRMED"):
    response = client.post("/api/bookings/", json={
        "asset_id": str(asset_id),
        "start_time": start_time.isoformat() + "Z",
        "end_time": end_time.isoformat() + "Z"
    })
    assert response.status_code in [200, 201], f"Failed to create booking: {response.json()}"
    booking = response.json()["data"]
    
    if status == "CANCELLED":
        res = client.put(f"/api/bookings/{booking['id']}/cancel/")
        assert res.status_code == 200, f"Failed to cancel booking: {res.json()}"
        booking["status"] = "CANCELLED"
        
    return booking

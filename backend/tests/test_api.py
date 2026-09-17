def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_get_commodities(client):
    response = client.get("/api/commodities")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_materials(client):
    response = client.get("/api/materials")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_recommendation_generate(client):
    payload = {
        "commodity_name": "Fresh Apples",
        "commodity_type": "fresh produce",
        "product_form": "solid",
        "storage_type": "chilled",
        "moisture_content_percent": 85.0,
        "oil_fat_content_percent": 0.5,
        "desired_shelf_life_days": 14,
        "is_map_required": False
    }
    response = client.post("/api/recommendation/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "primary_material" in data
    assert "recommendation_id" in data

def test_sustainability_analyze(client):
    payload = {
        "material_id": "test",
        "weight_grams": 15.0,
        "production_volume": 1000,
        "transport_distance_km": 500
    }
    response = client.post("/api/sustainability/analyze", json=payload)
    assert response.status_code == 200
    assert "carbon_footprint_total_kg_co2" in response.json()

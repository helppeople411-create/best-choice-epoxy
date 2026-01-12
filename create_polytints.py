import requests
import json
import os

# Configuration
API_KEY = "pit-ec1a7dc2-589a-4ea3-a5dc-24c29ee37858"
LOCATION_ID = "TJ7HahgRFIpVJjIB8PJF"
BASE_URL = "https://services.leadconnectorhq.com/products/"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Version": "2021-07-28",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

polytints = [
    "Concrete Gray",
    "Dovetail Gray",
    "Gauntlet Gray",
    "Intellectual Gray",
    "Warm Stone"
]

def create_product(name):
    payload = {
        "name": f"Simiron Poly Tint - {name}",
        "description": "Custom Color Polyurea Pigment Pack (1 Pt)",
        "productType": "PHYSICAL",
        "availableInStore": True,
        "locationId": LOCATION_ID,
        "price": 32.00
    }
    
    try:
        response = requests.post(BASE_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        print(f"Created {name}: {data['_id']}")
        return data['_id']
    except Exception as e:
        print(f"Error creating {name}: {e}")
        if hasattr(e, 'response') and e.response:
            print(e.response.text)
        return None

# Create products and update JSON
results = []
for color in polytints:
    product_id = create_product(color)
    if product_id:
        results.append({
            "name": color,
            "ghlProductId": product_id,
            "price": 32.00
        })

# Save updated JSON
with open('/home/ubuntu/best-choice/client/src/polytints.json', 'w') as f:
    json.dump(results, f, indent=2)

print("Finished creating Poly Tint products.")

import requests
import json

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

def create_product():
    name = "50TEX Slip Resistant Additive"
    payload = {
        "name": f"Simiron {name}",
        "description": "Slip Resistant Additive for Floor Coatings (3.2oz - 1 Gal Mix)",
        "productType": "PHYSICAL",
        "availableInStore": True,
        "locationId": LOCATION_ID,
        "price": 16.00
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

# Create product and save ID
product_id = create_product()

if product_id:
    result = {
        "name": "50TEX Slip Resistant Additive",
        "ghlProductId": product_id,
        "price": 16.00
    }
    
    # Save to JSON
    with open('/home/ubuntu/best-choice/client/src/50tex.json', 'w') as f:
        json.dump([result], f, indent=2)

print("Finished creating 50TEX product.")

import requests
import json
import time

API_KEY = "pit-ec1a7dc2-589a-4ea3-a5dc-24c29ee37858"
LOCATION_ID = "TJ7HahgRFIpVJjIB8PJF"
NEW_PRICE = 61.00

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Version": "2021-07-28",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def get_all_products():
    url = f"https://services.leadconnectorhq.com/products/?locationId={LOCATION_ID}&limit=100"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get('products', [])
    return []

def get_product_details(product_id):
    url = f"https://services.leadconnectorhq.com/products/{product_id}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get('product') # API usually returns { product: {...} }
    return None

def update_product(product_id, current_data):
    url = f"https://services.leadconnectorhq.com/products/{product_id}"
    
    # Construct payload with ALL required fields from current data
    # We only modify the price
    payload = {
        "name": current_data.get('name'),
        "description": current_data.get('description', ''),
        "productType": current_data.get('productType', 'PHYSICAL_GOODS'), # Default if missing
        "locationId": LOCATION_ID,
        "price": NEW_PRICE,
        # Keep other fields if they exist and are required
        "image": current_data.get('image'),
        "availableInStore": current_data.get('availableInStore', True)
    }
    
    # Remove None values to avoid issues
    payload = {k: v for k, v in payload.items() if v is not None}

    try:
        response = requests.put(url, headers=headers, json=payload)
        if response.status_code == 200:
            print(f"✅ Updated {current_data.get('name')} to ${NEW_PRICE}")
            return True
        else:
            print(f"❌ Failed to update {current_data.get('name')}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception updating {current_data.get('name')}: {e}")
        return False

def main():
    print("Fetching products from GHL...")
    products = get_all_products()
    metallic_products = [p for p in products if "Metallic Additive" in p.get('name', '')]
    
    print(f"Found {len(metallic_products)} Metallic Additive products to update.")
    
    for p in metallic_products:
        # Fetch full details first to ensure we have all fields
        full_details = get_product_details(p['_id'])
        if full_details:
            update_product(p['_id'], full_details)
        else:
            # Fallback to list data if detail fetch fails (though detail is safer)
            update_product(p['_id'], p)
            
        time.sleep(0.5) # Rate limit safety

if __name__ == "__main__":
    main()

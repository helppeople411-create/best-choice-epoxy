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

# Load local product data to get image paths
try:
    with open('/home/ubuntu/best-choice/client/src/metallic.json', 'r') as f:
        local_products = json.load(f)
        # Create a map of Name -> Image URL (assuming we host them or use existing URLs)
        # Since we don't have public URLs for local images yet, we will use a placeholder or skip image update if not available.
        # However, the user asked to "add images". 
        # Strategy: We need to upload images first OR use a base URL if they are already hosted.
        # For now, let's update the PRICE first as that is critical.
        pass
except Exception as e:
    print(f"Error loading local data: {e}")
    local_products = []

def get_all_products():
    url = f"https://services.leadconnectorhq.com/products/?locationId={LOCATION_ID}&limit=100"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get('products', [])
    return []

def update_product(product_id, name):
    url = f"https://services.leadconnectorhq.com/products/{product_id}"
    
    # Payload to update price
    payload = {
        "price": NEW_PRICE,
        # "image": "..." # We need a valid public URL for the image
    }
    
    try:
        response = requests.put(url, headers=headers, json=payload)
        if response.status_code == 200:
            print(f"✅ Updated {name} to ${NEW_PRICE}")
            return True
        else:
            print(f"❌ Failed to update {name}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception updating {name}: {e}")
        return False

def main():
    print("Fetching products from GHL...")
    products = get_all_products()
    metallic_products = [p for p in products if "Metallic Additive" in p.get('name', '')]
    
    print(f"Found {len(metallic_products)} Metallic Additive products to update.")
    
    for p in metallic_products:
        update_product(p['_id'], p['name'])
        time.sleep(0.5) # Rate limit safety

if __name__ == "__main__":
    main()

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

def get_all_products():
    url = f"{BASE_URL}?locationId={LOCATION_ID}&limit=100"
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            print(f"Found {len(products)} products.")
            return products
        else:
            print(f"Error fetching products: {response.status_code} - {response.text}")
            return []
    except Exception as e:
        print(f"Exception: {e}")
        return []

products = get_all_products()

# Save to file for inspection
with open('/home/ubuntu/best-choice/ghl_products_dump.json', 'w') as f:
    json.dump(products, f, indent=2)
    
print("Saved product dump to ghl_products_dump.json")

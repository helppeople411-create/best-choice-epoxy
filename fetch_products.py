import requests
import json

API_KEY = "pit-ec1a7dc2-589a-4ea3-a5dc-24c29ee37858"
LOCATION_ID = "TJ7HahgRFIpVJjIB8PJF"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Version": "2021-07-28",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def fetch_products():
    print("Fetching products...")
    url = f"https://services.leadconnectorhq.com/products/?locationId={LOCATION_ID}&limit=100"
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', [])
            print(f"Found {len(products)} products.")
            
            # Filter for Metallic Additive
            metallic_products = [p for p in products if "Metallic Additive" in p.get('name', '')]
            print(f"Found {len(metallic_products)} existing Metallic Additive products.")
            
            for p in metallic_products:
                print(f"- {p['name']} (ID: {p['_id']})")
                
            return products
        else:
            print(f"Error fetching products: {response.status_code} - {response.text}")
            return []
    except Exception as e:
        print(f"Exception: {str(e)}")
        return []

if __name__ == "__main__":
    fetch_products()

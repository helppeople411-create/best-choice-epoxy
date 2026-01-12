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

def get_all_products():
    url = f"https://services.leadconnectorhq.com/products/?locationId={LOCATION_ID}&limit=100"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get('products', [])
    return []

def main():
    print("Fetching products from GHL...")
    products = get_all_products()
    utint_products = [p for p in products if "U-Tint" in p.get('name', '') or "Tint Pack" in p.get('name', '')]
    
    if utint_products:
        print(f"Found {len(utint_products)} U-Tint products:")
        for p in utint_products:
            print(f"- {p.get('name')} (ID: {p.get('_id')}) - Price: {p.get('price')}")
    else:
        print("No U-Tint products found.")

if __name__ == "__main__":
    main()

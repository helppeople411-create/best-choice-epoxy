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
    products = get_all_products()
    utint_products = [p for p in products if "U-Tint" in p.get('name', '')]
    
    utint_data = []
    for p in utint_products:
        color_name = p.get('name').replace("Simiron U-Tint - ", "")
        utint_data.append({
            "name": color_name,
            "ghlProductId": p.get('_id'),
            "price": p.get('price')
        })
    
    print(json.dumps(utint_data, indent=2))

if __name__ == "__main__":
    main()

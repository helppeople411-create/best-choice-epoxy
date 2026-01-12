import requests
import json
import time

API_KEY = "pit-ec1a7dc2-589a-4ea3-a5dc-24c29ee37858"
LOCATION_ID = "TJ7HahgRFIpVJjIB8PJF"
PRICE = 32.00

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Version": "2021-07-28",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

utint_colors = [
    "Black", "Deck Gray", "Light Gray", "Haze Gray", "Sandstone", "Taupe", 
    "Tile Red", "Skyblue", "White", "Safety Blue", "Safety Red", 
    "Safety Green", "Safety Orange", "Safety Yellow"
]

def create_product(color):
    url = "https://services.leadconnectorhq.com/products/"
    
    product_name = f"Simiron U-Tint - {color}"
    
    payload = {
        "name": product_name,
        "description": f"Simiron U-Tint Universal Pigment Pack - {color} (16oz)",

        "productType": "PHYSICAL",
        "locationId": LOCATION_ID,
        "price": PRICE,
        "availableInStore": True
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 201:
            print(f"✅ Created {product_name}")
            return True
        else:
            print(f"❌ Failed to create {product_name}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception creating {product_name}: {e}")
        return False

def main():
    print(f"Creating {len(utint_colors)} U-Tint products at ${PRICE}...")
    
    for color in utint_colors:
        create_product(color)
        time.sleep(0.5) # Rate limit safety

if __name__ == "__main__":
    main()

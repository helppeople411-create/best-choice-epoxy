import requests
import json
import subprocess
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

PRODUCTS_TO_FIX = [
    {
        "id": "696345af90071a2a333de862",
        "name": "Best Choice 50TEX Slip Resistant Additive",
        "description": "Slip Resistant Additive for Floor Coatings (3.2oz - 1 Gal Mix). Provides a slip-resistant texture to Best Choice floor coatings.",
        "price": 16.00
    },
    {
        "id": "696345e214cd399eeda13841",
        "name": "Best Choice 30TEX Slip Resistant Additive",
        "description": "Slip Resistant Additive for Floor Coatings (3 Gal Mix). Provides a slip-resistant texture to Best Choice floor coatings.",
        "price": 34.00
    }
]

def upload_image(filepath):
    print(f"Uploading image: {filepath}")
    try:
        result = subprocess.run(
            ["manus-upload-file", filepath],
            capture_output=True,
            text=True,
            timeout=120
        )
        
        if result.returncode == 0:
            output_lines = result.stdout.strip().split('\n')
            for line in output_lines:
                if "CDN URL:" in line:
                    return line.split("CDN URL:")[1].strip()
                if line.startswith("https://"):
                    return line.strip()
            print(f"Could not parse URL from output: {result.stdout}")
            return None
        else:
            print(f"❌ Upload failed: {result.stderr}")
            return None
    except Exception as e:
        print(f"❌ Exception during upload: {e}")
        return None

def update_product(product, image_url):
    url = f"{BASE_URL}{product['id']}"
    
    payload = {
        "name": product['name'],
        "description": product['description'],
        "productType": "PHYSICAL",
        "image": image_url,
        "locationId": LOCATION_ID,
        "availableInStore": True,
        "price": product['price'] # Some endpoints might accept price at top level
    }
    
    # Also try variants structure if needed, but for update usually top level works or we need to fetch first.
    # Let's try simple update first.
    
    try:
        response = requests.put(url, headers=headers, json=payload)
        if response.status_code in [200, 201]:
            print(f"✅ Successfully updated {product['name']}")
            return True
        else:
            print(f"❌ Failed to update {product['name']}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception updating {product['name']}: {e}")
        return False

def main():
    # Use a placeholder image since specific ones are missing
    image_path = "/home/ubuntu/best-choice/client/public/images/products/decorative-chip.png"
    
    if not os.path.exists(image_path):
        print(f"Image not found: {image_path}")
        return

    image_url = upload_image(image_path)
    if not image_url:
        print("Failed to get image URL. Aborting.")
        return
        
    print(f"Using image URL: {image_url}")
    
    for product in PRODUCTS_TO_FIX:
        update_product(product, image_url)

if __name__ == "__main__":
    main()

import requests
import json
import time
import os
import subprocess

# Configuration
API_KEY = "pit-ec1a7dc2-589a-4ea3-a5dc-24c29ee37858"
LOCATION_ID = "TJ7HahgRFIpVJjIB8PJF"
BASE_URL = "https://services.leadconnectorhq.com/products/"
PROJECT_PATH = "/home/ubuntu/best-choice"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Version": "2021-07-28",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def upload_file(file_path):
    """Uploads a file using manus-upload-file and returns the URL."""
    full_path = os.path.join(PROJECT_PATH, "client/public", file_path.lstrip('/'))
    
    if not os.path.exists(full_path):
        print(f"❌ File not found: {full_path}")
        return None
        
    try:
        print(f"Uploading file: {full_path}")
        result = subprocess.run(
            ["manus-upload-file", full_path], 
            capture_output=True, 
            text=True,
            timeout=120
        )
        
        if result.returncode == 0:
            # Extract URL from output
            output_lines = result.stdout.strip().split('\n')
            for line in output_lines:
                if "CDN URL:" in line:
                    return line.split("CDN URL:")[1].strip()
                if line.startswith("https://"):
                    return line.strip()
            # Fallback if URL is not on its own line
            print(f"Could not parse URL from output: {result.stdout}")
            return None
        else:
            print(f"❌ Upload failed: {result.stderr}")
            return None
    except Exception as e:
        print(f"❌ Exception uploading file: {e}")
        return None

def update_product_image(product_id, image_url):
    url = f"{BASE_URL}{product_id}"
    
    try:
        # Step 1: Fetch existing product data
        get_response = requests.get(f"{url}?locationId={LOCATION_ID}", headers=headers)
        if get_response.status_code != 200:
            print(f"❌ Failed to fetch {product_id}: {get_response.status_code} - {get_response.text}")
            return False
            
        product_data = get_response.json()
        
        # Step 2: Prepare update payload
        payload = {
            "name": product_data.get("name"),
            "description": product_data.get("description"),
            "productType": product_data.get("productType", "PHYSICAL"),
            "locationId": product_data.get("locationId"),
            "price": product_data.get("price"),
            "availableInStore": product_data.get("availableInStore", True),
            "image": image_url
        }
        
        if "variants" in product_data and product_data["variants"]:
             payload["variants"] = product_data["variants"]

        # Step 3: Send Update
        response = requests.put(url, headers=headers, json=payload)
        if response.status_code == 200:
            print(f"✅ Updated image for {product_data.get('name')}")
            return True
        else:
            print(f"❌ Failed to update {product_id}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception updating {product_id}: {e}")
        return False

def main():
    # 1. Process Metallic Additives
    print("Processing Metallic Additives...")
    with open(os.path.join(PROJECT_PATH, 'client/src/metallic.json'), 'r') as f:
        metallic_products = json.load(f)
        
    for p in metallic_products:
        if 'ghlProductId' in p and 'image' in p:
            image_url = upload_file(p['image'])
            if image_url:
                update_product_image(p['ghlProductId'], image_url)
                time.sleep(0.5)
            else:
                print(f"Skipping {p['name']} due to upload failure.")

    # 2. Process Slip Resistant
    print("\nProcessing Slip Resistant Additives...")
    with open(os.path.join(PROJECT_PATH, 'client/src/slipresistant.json'), 'r') as f:
        slip_products = json.load(f)
        
    for p in slip_products:
        if 'ghlProductId' in p and 'image' in p:
            image_url = upload_file(p['image'])
            if image_url:
                update_product_image(p['ghlProductId'], image_url)
                time.sleep(0.5)
            else:
                print(f"Skipping {p['name']} due to upload failure.")

if __name__ == "__main__":
    main()

import requests
import json
import time

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

# HTML Descriptions
POLYTINT_DESC = """
<p><strong>Best Choice Poly Tints</strong> are specially tinted color packs designed to be added to Instant Patch, Polygrout, and 860JF neutral bases to achieve a wide range of available colors quickly.</p>

<h3>Features & Benefits</h3>
<ul>
    <li>Chemical Resistant</li>
    <li>Solvent Free</li>
    <li>Seamless – High Build Coating</li>
    <li>Hard Wearing & Abrasion Resistant</li>
    <li>Excellent Adhesion Properties</li>
</ul>
"""

SLIP_RESISTANT_DESC = """
<p><strong>Best Choice Slip Resistant Additive</strong> is a stir-in additive available in two sizes, 30TEX and 50TEX, that provides a slip-resistant texture to Best Choice floor coatings.</p>

<h3>Features & Benefits</h3>
<ul>
    <li>Add to paints, stains or sealers</li>
    <li>Add to latex-based, oil-based and epoxy coatings</li>
    <li>Easy surface cleaning</li>
    <li>Spherical-shaped particles provide a smoother feel to touch</li>
    <li>Does not increase material viscosity</li>
    <li>Stays suspended in coatings</li>
</ul>
"""

UTINT_DESC = """
<p><strong>Best Choice U-Tint Universal Pigment Packs</strong> are high-performance, 100% solids, zero VOC pigments designed to be easily mixed into Best Choice urethane and epoxy coatings.</p>

<h3>Features & Benefits</h3>
<ul>
    <li>Excellent Color Stability</li>
    <li>High Concentration</li>
    <li>Easy to Mix</li>
    <li>Zero VOC</li>
    <li>100% Solids</li>
    <li>Universal Compatibility</li>
</ul>

<h3>Recommended Uses</h3>
<ul>
    <li>Industrial Floors</li>
    <li>Commercial Spaces</li>
    <li>Residential Garages</li>
    <li>Warehouses</li>
    <li>Retail Environments</li>
</ul>
"""

def update_product(product_id, new_name, description):
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
            "name": new_name,
            "description": description,
            "productType": product_data.get("productType", "PHYSICAL"),
            "locationId": product_data.get("locationId"),
            "price": product_data.get("price"),
            "availableInStore": product_data.get("availableInStore", True)
        }
        
        if "variants" in product_data and product_data["variants"]:
             payload["variants"] = product_data["variants"]

        # Step 3: Send Update
        response = requests.put(url, headers=headers, json=payload)
        if response.status_code == 200:
            print(f"✅ Updated {new_name}")
            return True
        else:
            print(f"❌ Failed to update {product_id}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception updating {product_id}: {e}")
        return False

def main():
    # Load the dump to find products to update
    with open('/home/ubuntu/best-choice/ghl_products_dump.json', 'r') as f:
        all_products = json.load(f)
        
    for p in all_products:
        name = p.get('name', '')
        product_id = p.get('_id')
        
        if "Simiron Poly Tint" in name:
            new_name = name.replace("Simiron", "Best Choice")
            update_product(product_id, new_name, POLYTINT_DESC)
            time.sleep(0.2)
            
        elif "Simiron 30TEX" in name or "Simiron 50TEX" in name:
            new_name = name.replace("Simiron", "Best Choice")
            update_product(product_id, new_name, SLIP_RESISTANT_DESC)
            time.sleep(0.2)
            
        elif "Simiron U-Tint" in name:
            new_name = name.replace("Simiron", "Best Choice")
            update_product(product_id, new_name, UTINT_DESC)
            time.sleep(0.2)

if __name__ == "__main__":
    main()

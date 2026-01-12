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
METALLIC_DESC = """
<p><strong>Create stunning, three-dimensional floors with our exotic metallic pigments.</strong> Engineered for seamless integration with Best Choice clear epoxies to deliver a showroom-quality finish that is truly one-of-a-kind.</p>

<h3>Features & Benefits</h3>
<ul>
    <li>Vibrant Three-Dimensional Look</li>
    <li>Durable & Long-Lasting</li>
    <li>Easy to Use & Mix</li>
    <li>Trouble-free Cleaning</li>
    <li>Works with All Epoxy Floor Coatings</li>
    <li>UV Stable Options Available</li>
</ul>

<h3>Recommended Uses</h3>
<ul>
    <li>Restaurants & Bars</li>
    <li>Sports Arenas</li>
    <li>Showroom Floors</li>
    <li>Residential Homes</li>
    <li>Automotive Service Areas</li>
    <li>Hair Studios</li>
    <li>Garages</li>
    <li>Aircraft Hangers</li>
    <li>Schools & Universities</li>
</ul>

<p><em><strong>Pro Tip:</strong> The finished appearance of the Metallic flooring system can vary from gradual, subtle changes in color to more distinctive and exciting effects. Each project is truly unique and colors can be combined to create a one-of-a-kind custom masterpiece. We recommend creating a mockup before full application.</em></p>
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

def update_product(product_id, description):
    url = f"{BASE_URL}{product_id}"
    
    try:
        # Step 1: Fetch existing product data
        get_response = requests.get(f"{url}?locationId={LOCATION_ID}", headers=headers)
        if get_response.status_code != 200:
            print(f"❌ Failed to fetch {product_id}: {get_response.status_code} - {get_response.text}")
            return False
            
        product_data = get_response.json()
        
        # Step 2: Prepare update payload
        # We need to include required fields. The API likely expects the full object or at least the required ones.
        # Based on the 422 error, we need: name, locationId, productType.
        # We'll use the data we just fetched.
        
        payload = {
            "name": product_data.get("name"),
            "description": description,
            "productType": product_data.get("productType", "PHYSICAL"),
            "locationId": product_data.get("locationId"),
            "price": product_data.get("price"), # Include price just in case
            "availableInStore": product_data.get("availableInStore", True)
        }
        
        # If there are variants, we might need to handle them, but for simple products, this should work.
        # If the product has variants, the structure might be different.
        if "variants" in product_data and product_data["variants"]:
             payload["variants"] = product_data["variants"]

        # Step 3: Send Update
        response = requests.put(url, headers=headers, json=payload)
        if response.status_code == 200:
            print(f"✅ Updated product {product_id}")
            return True
        else:
            print(f"❌ Failed to update {product_id}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception updating {product_id}: {e}")
        return False

def main():
    # Load product data
    with open('/home/ubuntu/best-choice/client/src/metallic.json', 'r') as f:
        metallic_products = json.load(f)
        
    with open('/home/ubuntu/best-choice/client/src/utints.json', 'r') as f:
        utint_products = json.load(f)
        
    # Poly Tints and Slip Resistant IDs need to be fetched or hardcoded if not in a JSON yet
    # Assuming they are in polytints.json and slipresistant.json if I created them
    
    try:
        with open('/home/ubuntu/best-choice/client/src/polytints.json', 'r') as f:
            polytint_products = json.load(f)
    except FileNotFoundError:
        polytint_products = [] # Or fetch from API if needed
        
    try:
        with open('/home/ubuntu/best-choice/client/src/slipresistant.json', 'r') as f:
            slip_products = json.load(f)
    except FileNotFoundError:
        slip_products = []

    print(f"Updating {len(metallic_products)} Metallic products...")
    for p in metallic_products:
        if 'ghlProductId' in p:
            update_product(p['ghlProductId'], METALLIC_DESC)
            time.sleep(0.2)

    print(f"Updating {len(utint_products)} U-Tint products...")
    for p in utint_products:
        if 'ghlProductId' in p:
            update_product(p['ghlProductId'], UTINT_DESC)
            time.sleep(0.2)
            
    print(f"Updating {len(polytint_products)} Poly Tint products...")
    for p in polytint_products:
        if 'ghlProductId' in p:
            update_product(p['ghlProductId'], POLYTINT_DESC)
            time.sleep(0.2)

    print(f"Updating {len(slip_products)} Slip Resistant products...")
    for p in slip_products:
        if 'ghlProductId' in p:
            update_product(p['ghlProductId'], SLIP_RESISTANT_DESC)
            time.sleep(0.2)

if __name__ == "__main__":
    main()

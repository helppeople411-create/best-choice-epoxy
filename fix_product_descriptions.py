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

# Plain Text Descriptions (Safe Mode)
METALLIC_DESC = """Create stunning, three-dimensional floors with our exotic metallic pigments. Engineered for seamless integration with Best Choice clear epoxies to deliver a showroom-quality finish that is truly one-of-a-kind.

Features & Benefits:
- Vibrant Three-Dimensional Look
- Durable & Long-Lasting
- Easy to Use & Mix
- Trouble-free Cleaning
- Works with All Epoxy Floor Coatings
- UV Stable Options Available

Recommended Uses:
- Restaurants & Bars
- Sports Arenas
- Showroom Floors
- Residential Homes
- Automotive Service Areas
- Hair Studios
- Garages
- Aircraft Hangers
- Schools & Universities

Pro Tip: The finished appearance of the Metallic flooring system can vary from gradual, subtle changes in color to more distinctive and exciting effects. Each project is truly unique and colors can be combined to create a one-of-a-kind custom masterpiece. We recommend creating a mockup before full application."""

UTINT_DESC = """Best Choice U-Tint Universal Pigment Packs are high-performance, 100% solids, zero VOC pigments designed to be easily mixed into Best Choice urethane and epoxy coatings.

Features & Benefits:
- Excellent Color Stability
- High Concentration
- Easy to Mix
- Zero VOC
- 100% Solids
- Universal Compatibility

Recommended Uses:
- Industrial Floors
- Commercial Spaces
- Residential Garages
- Warehouses
- Retail Environments"""

POLYTINT_DESC = """Best Choice Poly Tints are specially tinted color packs designed to be added to Instant Patch, Polygrout, and 860JF neutral bases to achieve a wide range of available colors quickly.

Features & Benefits:
- Chemical Resistant
- Solvent Free
- Seamless – High Build Coating
- Hard Wearing & Abrasion Resistant
- Excellent Adhesion Properties"""

SLIP_RESISTANT_DESC = """Best Choice Slip Resistant Additive is a stir-in additive available in two sizes, 30TEX and 50TEX, that provides a slip-resistant texture to Best Choice floor coatings.

Features & Benefits:
- Add to paints, stains or sealers
- Add to latex-based, oil-based and epoxy coatings
- Easy surface cleaning
- Spherical-shaped particles provide a smoother feel to touch
- Does not increase material viscosity
- Stays suspended in coatings"""

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
        payload = {
            "name": product_data.get("name"),
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
            print(f"✅ Fixed product {product_id} ({product_data.get('name')})")
            return True
        else:
            print(f"❌ Failed to update {product_id}: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception updating {product_id}: {e}")
        return False

def main():
    # Load the dump to find products to update
    try:
        with open('/home/ubuntu/best-choice/ghl_products_dump.json', 'r') as f:
            all_products = json.load(f)
    except FileNotFoundError:
        print("Dump file not found, cannot proceed.")
        return
        
    print(f"Scanning {len(all_products)} products for fixes...")
    
    for p in all_products:
        name = p.get('name', '')
        product_id = p.get('_id')
        
        # Identify products by name pattern (using the NEW names I set)
        if "Best Choice Poly Tint" in name:
            update_product(product_id, POLYTINT_DESC)
            time.sleep(0.2)
            
        elif "Best Choice 30TEX" in name or "Best Choice 50TEX" in name:
            update_product(product_id, SLIP_RESISTANT_DESC)
            time.sleep(0.2)
            
        elif "Best Choice U-Tint" in name:
            update_product(product_id, UTINT_DESC)
            time.sleep(0.2)
            
        elif "Best Choice Metallic Additive" in name:
            update_product(product_id, METALLIC_DESC)
            time.sleep(0.2)

if __name__ == "__main__":
    main()

import json
import os

PROJECT_PATH = "/home/ubuntu/best-choice"

def main():
    # Load dump
    with open(os.path.join(PROJECT_PATH, 'ghl_products_dump.json'), 'r') as f:
        dump_products = json.load(f)
        
    # Load metallic.json
    with open(os.path.join(PROJECT_PATH, 'client/src/metallic.json'), 'r') as f:
        metallic_products = json.load(f)
        
    # Create a map of Name -> ID from dump
    # Dump names are like "Best Choice Metallic Additive - Bright White"
    # Metallic.json names are like "Bright White"
    name_to_id = {}
    for p in dump_products:
        name = p.get('name', '')
        if "Best Choice Metallic Additive - " in name:
            short_name = name.replace("Best Choice Metallic Additive - ", "")
            name_to_id[short_name] = p.get('_id')
        elif "Best Choice Metallic Additive" == name: # Base product?
             name_to_id["Base"] = p.get('_id')

    # Update metallic.json
    updated_count = 0
    for p in metallic_products:
        name = p.get('name')
        if name in name_to_id:
            p['ghlProductId'] = name_to_id[name]
            updated_count += 1
        else:
            print(f"Warning: Could not find ID for {name}")

    # Save updated metallic.json
    with open(os.path.join(PROJECT_PATH, 'client/src/metallic.json'), 'w') as f:
        json.dump(metallic_products, f, indent=2)
        
    print(f"Updated {updated_count} product IDs in metallic.json")

if __name__ == "__main__":
    main()

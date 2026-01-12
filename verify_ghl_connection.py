import requests
import json

API_KEY = "Pit-e76ca038-18ca-4d64-9f8f-7e8d5920a82f"
LOCATION_ID = "TJ7HahgRFIpVJjIB8PJF"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Version": "2021-07-28",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def verify_connection():
    print(f"Verifying connection for Location ID: {LOCATION_ID}")
    
    # Try to fetch location details (or products if location endpoint is restricted)
    url = f"https://services.leadconnectorhq.com/locations/{LOCATION_ID}"
    
    try:
        response = requests.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ Connection Successful!")
            data = response.json()
            print(f"Location Name: {data.get('location', {}).get('name', 'Unknown')}")
            return True
        elif response.status_code == 401:
            print("❌ Unauthorized: Invalid API Key")
        elif response.status_code == 403:
            print("❌ Forbidden: API Key may not have permission for this location")
        elif response.status_code == 404:
            print("❌ Not Found: Invalid Location ID or Endpoint")
        else:
            print(f"❌ Error: {response.text}")
            
        # Fallback: Try fetching products to see if that works (common permission issue)
        print("\nAttempting to fetch products as fallback verification...")
        products_url = f"https://services.leadconnectorhq.com/products/?locationId={LOCATION_ID}&limit=1"
        prod_response = requests.get(products_url, headers=headers)
        print(f"Products Status Code: {prod_response.status_code}")
        
        if prod_response.status_code == 200:
             print("✅ Products Endpoint Accessible! Connection Valid.")
             return True
             
    except Exception as e:
        print(f"❌ Exception: {str(e)}")
        
    return False

if __name__ == "__main__":
    verify_connection()

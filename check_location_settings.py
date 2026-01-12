import requests
import json

# Configuration
API_KEY = "pit-ec1a7dc2-589a-4ea3-a5dc-24c29ee37858"
LOCATION_ID = "TJ7HahgRFIpVJjIB8PJF"
BASE_URL = "https://services.leadconnectorhq.com/locations/"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Version": "2021-07-28",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def check_location():
    url = f"{BASE_URL}{LOCATION_ID}"
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"❌ Failed to fetch location: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Exception: {e}")

if __name__ == "__main__":
    check_location()

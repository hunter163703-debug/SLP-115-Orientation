import os
import requests

# Create directory for images if it doesn't exist
os.makedirs("images_real", exist_ok=True)

base_url = "https://campus-quest-488.netlify.app/"
images = [
    "01-taichi-lake.jpg",
    "02-tadao-ando-museum.jpg",
    "03-administration-library.jpg",
    "04-asia-hospital.jpg",
    "05-xifu-dorm.jpg",
    "06-it-engineering.jpg",
    "07-management-social-science.png",
    "08-zhumeng-college.png",
    "09-roman-colosseum-gym.png",
    "10-nursing-college.jpg"
]

print("Starting download...")
for img in images:
    url = base_url + img
    try:
        r = requests.get(url, timeout=10)
        if r.status_code == 200:
            target_path = os.path.join("images_real", img)
            with open(target_path, "wb") as f:
                f.write(r.content)
            print(f"Downloaded {img} successfully.")
        else:
            print(f"Failed to download {img}: status code {r.status_code}")
    except Exception as e:
        print(f"Error downloading {img}: {e}")

print("Download finished!")

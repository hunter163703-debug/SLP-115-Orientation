import os
import cv2
import numpy as np
from PIL import Image, ImageOps

def main():
    base_map_path = "asiav3.png"
    if not os.path.exists(base_map_path):
        print(f"Error: {base_map_path} not found.")
        return
        
    # --- Step 1: Clean the obsolete top-left photos using OpenCV ---
    print("Step 1: Cleaning obsolete top-left photos...")
    img_cv = cv2.imread(base_map_path)
    if img_cv is None:
        print("Failed to read image with OpenCV")
        return
        
    # Patch settings (cloning a clean grass hillside patch from the left)
    patch_w = 160
    patch_h = 130
    src_x, src_y = 70, 220
    dst_center = (265, 235)
    
    src_patch = img_cv[src_y:src_y+patch_h, src_x:src_x+patch_w]
    mask = np.ones(src_patch.shape, dtype=src_patch.dtype) * 255
    
    # Seamless clone the clean grass over the top-left area
    cleaned_cv = cv2.seamlessClone(src_patch, img_cv, mask, dst_center, cv2.NORMAL_CLONE)
    
    # Convert OpenCV BGR to Pillow RGBA
    cleaned_rgb = cv2.cvtColor(cleaned_cv, cv2.COLOR_BGR2RGB)
    img_map = Image.fromarray(cleaned_rgb).convert("RGBA")
    print("Obsolete photos wiped successfully.")

    # --- Step 2: Overlay the 9 landmark photos with layered labels ---
    print("Step 2: Processing and overlaying the 9 landmark photos...")
    config = {
        1: {
            "name": "太極湖",
            "coords": (390, 190, 100, 24),
            "theme": "blue",
            "file": "01-taichi-lake.jpg"
        },
        2: {
            "name": "資訊電機學院",
            "coords": (530, 160, 120, 24),
            "theme": "green",
            "file": "06-it-engineering.jpg"
        },
        3: {
            "name": "護理學院",
            "coords": (620, 195, 100, 24),
            "theme": "green",
            "file": "10-nursing-college.jpg"
        },
        4: {
            "name": "惜福學院",
            "coords": (855, 225, 100, 24),
            "theme": "orange",
            "file": "05-xifu-dorm.jpg"
        },
        5: {
            "name": "行政大樓",
            "coords": (395, 330, 110, 24),
            "theme": "blue",
            "file": "03-administration-library.jpg"
        },
        6: {
            "name": "管理暨社會科學學院",
            "coords": (590, 460, 160, 24),
            "theme": "green",
            "file": "07-management-social-science.png"
        },
        7: {
            "name": "亞洲大學現代美術館",
            "coords": (180, 520, 140, 24),
            "theme": "blue",
            "file": "02-tadao-ando-museum.jpg"
        },
        8: {
            "name": "築夢學院",
            "coords": (335, 625, 90, 24),
            "theme": "orange",
            "file": "08-zhumeng-college.png"
        },
        9: {
            "name": "體育館",
            "coords": (450, 680, 80, 24),
            "theme": "blue",
            "file": "09-roman-colosseum-gym.png"
        }
    }
    
    colors = {
        "blue": (15, 61, 130),     # Elegant Dark Blue matching hospital border
        "green": (35, 120, 60),    # Soft Forest Green matching green labels
        "orange": (210, 85, 30)    # Soft Terracotta/Orange matching orange labels
    }
    
    card_w, card_h = 110, 75
    border_thickness = 3
    
    for lid, item in config.items():
        cx, cy, lw, lh = item["coords"]
        theme = item["theme"]
        photo_file = item["file"]
        
        # Calculate label bounding box
        lx1 = cx - lw // 2
        ly1 = cy - lh // 2
        lx2 = cx + lw // 2
        ly2 = cy + lh // 2
        
        # Crop the label capsule
        label_crop = img_map.crop((lx1, ly1, lx2, ly2))
        
        # Load and process the real photo
        photo_path = os.path.join("images_real", photo_file)
        if not os.path.exists(photo_path):
            print(f"Warning: Photo {photo_path} not found. Skipping...")
            continue
            
        photo = Image.open(photo_path).convert("RGBA")
        
        # Center-crop and resize to target size
        photo_fitted = ImageOps.fit(photo, (card_w, card_h), Image.Resampling.LANCZOS)
        
        # Add colored border
        border_color = colors[theme]
        photo_framed = ImageOps.expand(photo_fitted, border=border_thickness, fill=border_color)
        
        # Calculate paste coordinates for photo card (overlap top by 8px)
        card_top_y = ly2 - 8
        card_left_x = cx - photo_framed.width // 2
        
        # Paste the photo card onto the map
        img_map.paste(photo_framed, (card_left_x, card_top_y), photo_framed)
        
        # Paste the label capsule back on top of the photo card
        img_map.paste(label_crop, (lx1, ly1), label_crop)
        
        print(f"Processed landmark {lid:02d} ({item['name']}) successfully.")
        
    # --- Step 3: Save to the final destination ---
    output_path = "asiav3.png"
    img_map.convert("RGB").save(output_path, "PNG", quality=95)
    print(f"Successfully generated final image and overwrote {output_path}!")

if __name__ == "__main__":
    main()

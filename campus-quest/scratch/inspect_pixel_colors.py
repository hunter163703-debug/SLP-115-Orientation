import cv2
import numpy as np

img = cv2.imread("asiav3.png")
if img is None:
    print("Failed to load")
    exit()

# Landmark estimated coordinates
coords = {
    1: (606, 187),    # 太極湖
    2: (526, 160),    # 資訊電機學院
    3: (623, 192),    # 護理學院
    4: (855, 230),    # 惜福學院
    5: (397, 335),    # 行政大樓
    6: (592, 461),    # 管理暨社會科學學院
    7: (182, 521),    # 亞洲大學現代美術館
    8: (334, 624),    # 築夢學院
    9: (454, 680),    # 體育館
    10: (860, 730)    # 亞洲大學附屬醫院
}

print("Inspecting RGB (BGR in OpenCV) colors at coordinates:")
for label, (x, y) in coords.items():
    # Take a 5x5 window
    window = img[max(0, y-2):min(img.shape[0], y+3), max(0, x-2):min(img.shape[1], x+3)]
    avg_color = window.mean(axis=0).mean(axis=0) # Average BGR
    # BGR to RGB
    rgb = (int(avg_color[2]), int(avg_color[1]), int(avg_color[0]))
    hex_color = f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
    print(f"Landmark {label:02d} at ({x}, {y}): BGR={avg_color.astype(int)}, RGB={rgb}, Hex={hex_color}")

import cv2
import numpy as np

# Load the original Asia V3 map image
img = cv2.imread("asiav3.png")
if img is None:
    print("Failed to load asiav3.png")
    exit()

# Approximate initial coordinates based on visual inspection
# (x, y) coordinates for landmarks 1 to 10
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

# Draw red circles at each coordinate
for label, (x, y) in coords.items():
    cv2.circle(img, (x, y), 8, (0, 0, 255), -1)
    cv2.putText(img, str(label), (x - 5, y - 15), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

# Save the test image
cv2.imwrite("scratch/test_coords.png", img)
print("Coordinates test image generated at scratch/test_coords.png")

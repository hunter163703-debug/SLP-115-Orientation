import cv2

img = cv2.imread("asiav3.png")
if img is None:
    print("Failed to load")
    exit()

# Locations chosen inside the capsules (avoiding text in the center)
points = {
    "blue": (370, 190),     # Left side of 01 太極湖 capsule
    "green": (500, 160),    # Left side of 02 資訊電機學院 capsule
    "orange": (830, 225)    # Left side of 04 惜福學院 capsule
}

for color_name, (x, y) in points.items():
    bgr = img[y, x]
    rgb = (int(bgr[2]), int(bgr[1]), int(bgr[0]))
    hex_color = f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
    print(f"Theme {color_name}: RGB={rgb}, Hex={hex_color}")

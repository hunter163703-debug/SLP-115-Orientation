import cv2

img = cv2.imread("asiav3.png")
if img is None:
    print("Failed to load")
    exit()

# Locations of the colored circles on the left of each label
balls = {
    "blue": (354, 190),     # Number '01' blue circle
    "green": (488, 160),    # Number '02' green circle
    "orange": (826, 224)    # Number '04' orange circle
}

for color_name, (x, y) in balls.items():
    bgr = img[y, x]
    rgb = (int(bgr[2]), int(bgr[1]), int(bgr[0]))
    hex_color = f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
    print(f"Theme {color_name} ball: RGB={rgb}, Hex={hex_color}")

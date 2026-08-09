import cv2
import numpy as np

img = cv2.imread("asiav3.png")
if img is None:
    print("Failed to load")
    exit()

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Define color ranges in HSV
# Note: Tune these if needed.
color_ranges = {
    "blue": (np.array([100, 120, 80]), np.array([125, 255, 180])),
    "green": (np.array([40, 80, 80]), np.array([75, 255, 160])),
    "orange": (np.array([0, 120, 150]), np.array([20, 255, 255]))
}

debug_img = img.copy()

for color_name, (lower, upper) in color_ranges.items():
    mask = cv2.inRange(hsv, lower, upper)
    # Perform some morphological closing to merge text gaps inside capsules
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (15, 5))
    mask_closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    # Find contours
    contours, _ = cv2.findContours(mask_closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    print(f"\nCandidates for {color_name}:")
    for i, cnt in enumerate(contours):
        area = cv2.contourArea(cnt)
        if 800 < area < 10000: # Typical capsule size area filter
            x, y, w, h = cv2.boundingRect(cnt)
            # Filter by aspect ratio (capsules are wide rectangles)
            aspect_ratio = w / float(h)
            if 2.0 < aspect_ratio < 7.0:
                cx = x + w // 2
                cy = y + h // 2
                print(f"  ID {i}: Centroid=({cx}, {cy}), Rect=({x},{y},{w},{h}), Area={area:.1f}, AspectRatio={aspect_ratio:.2f}")
                # Draw bounding box and label
                cv2.rectangle(debug_img, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.circle(debug_img, (cx, cy), 5, (0, 0, 255), -1)
                cv2.putText(debug_img, f"{color_name}_{i}", (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)

cv2.imwrite("scratch/detected_capsules.png", debug_img)
print("\nSaved detected capsules image to scratch/detected_capsules.png")

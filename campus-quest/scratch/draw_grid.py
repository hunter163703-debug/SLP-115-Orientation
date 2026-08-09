import cv2

img = cv2.imread("asiav3.png")
if img is None:
    print("Failed to load")
    exit()

h, w, c = img.shape
grid_img = img.copy()

# Draw vertical lines
for x in range(0, w, 20):
    color = (200, 200, 200) # light gray
    thickness = 1
    if x % 100 == 0:
        color = (0, 0, 255) # Red for main divisions
        thickness = 2
    cv2.line(grid_img, (x, 0), (x, h), color, thickness)
    if x % 100 == 0:
        cv2.putText(grid_img, str(x), (x + 2, 15), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 255), 1)

# Draw horizontal lines
for y in range(0, h, 20):
    color = (200, 200, 200)
    thickness = 1
    if y % 100 == 0:
        color = (0, 0, 255)
        thickness = 2
    cv2.line(grid_img, (0, y), (w, y), color, thickness)
    if y % 100 == 0:
        cv2.putText(grid_img, str(y), (2, y - 2), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 255), 1)

cv2.imwrite("scratch/grid_map.png", grid_img)
print("Grid map generated at scratch/grid_map.png")

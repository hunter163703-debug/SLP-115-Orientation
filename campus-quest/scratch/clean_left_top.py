import cv2
import numpy as np

def main():
    img = cv2.imread("asiav3.png")
    if img is None:
        print("Failed to load")
        return
        
    # The dirty area is roughly from X: 190 to 345, Y: 175 to 300
    # Let's clone a patch of clean grass from a nearby region, say X: 60 to 180, Y: 220 to 340
    # Let's see if we can copy-paste and blend it.
    
    # We will define a mask for the patch to blend using seamlessClone
    patch_w = 160
    patch_h = 130
    
    # Source patch (clean grass on the left hillside)
    src_x, src_y = 70, 220
    src_patch = img[src_y:src_y+patch_h, src_x:src_x+patch_w]
    
    # Target center
    dst_center = (265, 235) # X center, Y center of target
    
    # Mask of the patch (all white for NORMAL_CLONE)
    mask = np.ones(src_patch.shape, dtype=src_patch.dtype) * 255
    
    # Perform seamless cloning to blend the grass patch seamlessly
    cloned = cv2.seamlessClone(src_patch, img, mask, dst_center, cv2.NORMAL_CLONE)
    
    cv2.imwrite("scratch/clean_base_test.png", cloned)
    print("Cleaned base test image saved at scratch/clean_base_test.png")

if __name__ == "__main__":
    main()

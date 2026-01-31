import os
from PIL import Image, ImageDraw, ImageFont

def create_placeholder_image(width, height, text, bg_color=(70, 130, 180), text_color=(255, 255, 255), output_path=None):
    """
    Create a placeholder image with text
    """
    # Create a new image
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Calculate text size and position
    try:
        # Try to use default font
        font = ImageFont.load_default()
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Calculate center position
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        # Draw the text
        draw.text((x, y), text, fill=text_color, font=font)
    except:
        # Fallback to simple drawing
        pass
    
    # Save the image
    if output_path:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        img.save(output_path)
    
    return img

# Create images for industrial listings
print("Creating industrial images...")
create_placeholder_image(
    800, 600, 
    "Ontario Warehouse\n50,000 sq ft\nHigh-ceiling Warehouse", 
    bg_color=(60, 120, 180),
    output_path="/workspace/projects/assets/images/industrial/ind-01-1.jpg"
)

create_placeholder_image(
    800, 600, 
    "City of Industry Warehouse\n120,000 sq ft\nFor Sale", 
    bg_color=(50, 110, 170),
    output_path="/workspace/projects/assets/images/industrial/ind-02-1.jpg"
)

# Create images for retail listings
print("Creating retail images...")
create_placeholder_image(
    800, 600, 
    "Irvine Spectrum Office\nClass A Building\nFor Lease", 
    bg_color=(70, 140, 120),
    output_path="/workspace/projects/assets/images/retail/ret-01-1.jpg"
)

create_placeholder_image(
    800, 600, 
    "Rowland Heights Retail\nMature Business District\nFor Sale", 
    bg_color=(80, 150, 130),
    output_path="/workspace/projects/assets/images/retail/ret-02-1.jpg"
)

# Create images for cases
print("Creating case images...")
create_placeholder_image(
    800, 600, 
    "Case #001\nBubble Tea Shop\nRowland Heights", 
    bg_color=(150, 100, 80),
    output_path="/workspace/projects/assets/images/cases/case-001.jpg"
)

create_placeholder_image(
    800, 600, 
    "Case #002\nLogistics Warehouse\nOntario Expansion", 
    bg_color=(140, 90, 70),
    output_path="/workspace/projects/assets/images/cases/case-002.jpg"
)

create_placeholder_image(
    800, 600, 
    "Case #003\nDental Clinic\nIrvine Core Area", 
    bg_color=(160, 110, 90),
    output_path="/workspace/projects/assets/images/cases/case-003.jpg"
)

print("✓ All placeholder images created successfully!")

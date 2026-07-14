from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "social-preview.png"
FONT_DIR = ROOT / "public" / "fonts"

PAPER = "#f4f1e9"
INK = "#090909"
RED = "#e5332a"


def font(filename: str, size: int, variation: str | None = None) -> ImageFont.FreeTypeFont:
    loaded = ImageFont.truetype(FONT_DIR / filename, size)
    if variation:
        loaded.set_variation_by_name(variation)
    return loaded


image = Image.new("RGB", (1200, 630), INK)
draw = ImageDraw.Draw(image)

display = font("space-grotesk-500-700-latin.woff2", 360, "Bold")

mark = "MS"
mark_box = draw.textbbox((0, 0), mark, font=display)
mark_width = mark_box[2] - mark_box[0]
mark_height = mark_box[3] - mark_box[1]
dot_radius = 25
gap = 24
total_width = mark_width + gap + dot_radius * 2
mark_x = (1200 - total_width) / 2
mark_y = (630 - mark_height) / 2 - mark_box[1]

draw.text((mark_x, mark_y), mark, font=display, fill=PAPER, spacing=0)
dot_x = mark_x + mark_width + gap + dot_radius
dot_y = mark_y + mark_box[3] - dot_radius - 13
draw.ellipse((dot_x - dot_radius, dot_y - dot_radius, dot_x + dot_radius, dot_y + dot_radius), fill=RED)

image.save(OUTPUT, "PNG", optimize=True)
print(f"Generated {OUTPUT} ({image.width}x{image.height})")

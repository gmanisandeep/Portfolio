from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "social-preview.jpg"
FONT_DIR = ROOT / "public" / "fonts"

PAPER = "#f4f1e9"
INK = "#111111"
RED = "#e5332a"
MUTED = "#b9b9b9"


def font(filename: str, size: int, variation: str | None = None) -> ImageFont.FreeTypeFont:
    loaded = ImageFont.truetype(FONT_DIR / filename, size)
    if variation:
        loaded.set_variation_by_name(variation)
    return loaded


image = Image.new("RGB", (1200, 630), PAPER)
draw = ImageDraw.Draw(image)

draw.rectangle((0, 0, 1200, 22), fill=RED)
draw.rectangle((32, 42, 1168, 598), fill=INK)
draw.rectangle((52, 62, 1148, 578), outline="#343434", width=2)

mono = font("dm-mono-500-latin.woff2", 17)
label = font("dm-mono-500-latin.woff2", 20)
display = font("space-grotesk-500-700-latin.woff2", 330, "Bold")

draw.text((74, 84), "PORTFOLIO / 2026", font=mono, fill=MUTED)
right_label = "HYDERABAD / INDIA"
right_width = draw.textlength(right_label, font=mono)
draw.text((1126 - right_width, 84), right_label, font=mono, fill=MUTED)

mark = "MS"
mark_box = draw.textbbox((0, 0), mark, font=display)
mark_width = mark_box[2] - mark_box[0]
mark_height = mark_box[3] - mark_box[1]
dot_radius = 25
gap = 24
total_width = mark_width + gap + dot_radius * 2
mark_x = (1200 - total_width) / 2
mark_y = 108

draw.text((mark_x, mark_y), mark, font=display, fill=PAPER, spacing=0)
dot_x = mark_x + mark_width + gap + dot_radius
dot_y = mark_y + mark_box[3] - dot_radius - 9
draw.ellipse((dot_x - dot_radius, dot_y - dot_radius, dot_x + dot_radius, dot_y + dot_radius), fill=RED)

name = "MANI SANDEEP"
name_width = draw.textlength(name, font=label)
draw.text(((1200 - name_width) / 2, 494), name, font=label, fill=PAPER)

positioning = "CREATIVE WEB DEVELOPER + AI BUILDER"
positioning_width = draw.textlength(positioning, font=mono)
draw.text(((1200 - positioning_width) / 2, 536), positioning, font=mono, fill=RED)

image.save(OUTPUT, "JPEG", quality=94, optimize=True, progressive=True, subsampling=0)
print(f"Generated {OUTPUT} ({image.width}x{image.height})")

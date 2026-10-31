"""Gera public/og-portfolio.png (1200x627), a miniatura de pré-visualização do link
(og:image: LinkedIn, WhatsApp, etc.). Para uma nova versão, edite os textos/cores
abaixo e rode, a partir da raiz do projeto:

    python3 scripts/gerar-og-image.py

Requer Pillow (pip install pillow) e as fontes DejaVu (padrão no Linux).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 627  # tamanho recomendado para og:image
BG, GRID, GRID_MAJOR = (10, 11, 13), (26, 30, 36), (34, 40, 48)
ACCENT, TXT, MUTED = (47, 165, 134), (237, 237, 232), (150, 155, 160)  # tokens do tema escuro do site

NOME = "Rômulo Gonçalves"
CARGO = "Desenvolvedor Back-end"
STACK = "Node.js · TypeScript · MongoDB"
EXTRA = "APIs REST · Integrações · Automações"
DOMINIO = "romulogoncalves.dev"

FONTES = Path("/usr/share/fonts/truetype/dejavu")
SAIDA = Path(__file__).resolve().parent.parent / "public" / "og-portfolio.png"

im = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(im)
for x in range(0, W, 40):
    d.line([(x, 0), (x, H)], fill=GRID_MAJOR if x % 200 == 0 else GRID)
for y in range(0, H, 40):
    d.line([(0, y), (W, y)], fill=GRID_MAJOR if y % 200 == 0 else GRID)

negrito = ImageFont.truetype(str(FONTES / "DejaVuSans-Bold.ttf"), 78)
mono_g = ImageFont.truetype(str(FONTES / "DejaVuSansMono.ttf"), 34)
mono_p = ImageFont.truetype(str(FONTES / "DejaVuSansMono.ttf"), 28)

d.rectangle([70, 70, W - 70, H - 70], outline=ACCENT, width=3)
d.text((110, 150), NOME, font=negrito, fill=TXT)
d.text((110, 260), CARGO, font=mono_g, fill=ACCENT)
d.text((110, 330), STACK, font=mono_g, fill=TXT)
d.text((110, 385), EXTRA, font=mono_p, fill=MUTED)
d.text((110, 490), DOMINIO, font=mono_g, fill=ACCENT)

im.save(SAIDA, optimize=True)
print(f"{SAIDA} ({im.size[0]}x{im.size[1]})")

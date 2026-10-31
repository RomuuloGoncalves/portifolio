"""Gera as miniaturas 1200x627 do portfólio:
  - public/og-portfolio.png (og:image: LinkedIn, WhatsApp, etc.)
  - scripts/saidas/linkedin-destaque-github.png (miniatura do item GitHub nos Destaques do LinkedIn)
Para uma nova versão, edite os textos/cores abaixo e rode, a partir da raiz do projeto:

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

RAIZ = Path(__file__).resolve().parent.parent


def desenhar(linhas, saida):
    """linhas: lista de (y, texto, fonte, cor). Fundo blueprint + moldura verde."""
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    for x in range(0, W, 40):
        d.line([(x, 0), (x, H)], fill=GRID_MAJOR if x % 200 == 0 else GRID)
    for y in range(0, H, 40):
        d.line([(0, y), (W, y)], fill=GRID_MAJOR if y % 200 == 0 else GRID)
    d.rectangle([70, 70, W - 70, H - 70], outline=ACCENT, width=3)
    for y, texto, fonte, cor in linhas:
        d.text((110, y), texto, font=fonte, fill=cor)
    saida.parent.mkdir(parents=True, exist_ok=True)
    im.save(saida, optimize=True)
    print(f"{saida} ({im.size[0]}x{im.size[1]})")


negrito = ImageFont.truetype(str(FONTES / "DejaVuSans-Bold.ttf"), 78)
mono_g = ImageFont.truetype(str(FONTES / "DejaVuSansMono.ttf"), 34)
mono_p = ImageFont.truetype(str(FONTES / "DejaVuSansMono.ttf"), 28)

desenhar([
    (150, NOME, negrito, TXT),
    (260, CARGO, mono_g, ACCENT),
    (330, STACK, mono_g, TXT),
    (385, EXTRA, mono_p, MUTED),
    (490, DOMINIO, mono_g, ACCENT),
], SAIDA)

desenhar([
    (150, "GitHub", negrito, TXT),
    (260, "Projetos e código", mono_g, ACCENT),
    (330, "SoloTrack · ONGFlow · Portfólio", mono_g, TXT),
    (385, "Node.js · TypeScript · PHP · React", mono_p, MUTED),
    (490, "github.com/RomuuloGoncalves", mono_g, ACCENT),
], RAIZ / "scripts" / "saidas" / "linkedin-destaque-github.png")

# Design aprovado: protótipo C

**Base: `prototype-c/` (aprovado pelo usuário em 2026-10-29).** O Design A deixa de ser a base; dele e do B ficam só as peças que o C já absorveu (certificados enxutos, Aluno Top, ficha SYSTEM_INFO do B). Este documento lista o que o C tem, o que muda por `research/review-c.md` e o que fica de fora.

## Tokens (fonte única: `prototype-c/palette.css`)

Fundo **Preto frio** e acento **Pinho** ativos. Carvão e Sálvia ficam como blocos comentados no mesmo arquivo (VIS-11, D-17).

| Token | Escuro | Claro |
| --- | --- | --- |
| `--bg-app` | `#0A0B0D` | `#EDEDE8` |
| `--bg-surface` | `#111317` | `#F7F7F4` |
| `--bg-elevated` | `#171A1F` | `#E4E4DE` |
| `--bg-terminal` | `#06070A` | **`--bg-elevated` + texto escuro** (VIS-10, review-c §2) |
| `--border-subtle` / `--border-strong` | `#1F2228` / `#2D3139` | `#D9D9D2` / `#C2C2BA` |
| `--accent` | `#2FA586` (pinho) | `#1A6B55` |
| `--accent-soft` | `rgb(47 165 134 / .12)` | `rgb(26 107 85 / .1)` |

Código (`--c-*`, VIS-12): palavra-chave `#E08A6C`, string `#A5C98F`, número `#E3B86E`, função `#7DAEE0`, tipo `#6FC4B4`, propriedade `#B9A8E8`, comentário `#85837A` (itálico).

- Fontes: Geist + Geist Mono via `@fontsource-variable/geist` e `@fontsource-variable/geist-mono` (2 deps só de CSS/woff2), no lugar do `<link>` do Google.
- Raio 4 px, sem sombra, sem gradiente, sem glow. Mono só com função (datas, rota, tags, código, ficha).
- Não aplicado do review-c (fora da lista aprovada): acento mais quente (§ paleta), `letter-spacing` e peso dos títulos. Ficam como estão no C.

## Estrutura

| Seção | Layout (C) | Ajuste aprovado |
| --- | --- | --- |
| Fundo | `.layer-grid` quadriculado 48 px, 3,5 %, parallax lento | Mantém (D-11) |
| Header | Logo "Rômulo Gonçalves"/"RG" + botão `GET /rota` que abre `popover` com rotas + links + tema | **Sem** `.navbar-scroll-progress` (VIS-08). Sem "RG.sys" (NAV-02) |
| Hero | Texto 2 frases + botões; foto 1200×1600 à direita | Foto nova `prototype-c/foto-perfil.jpg`. **Ficha SYSTEM_INFO** abaixo da foto (HERO-02) |
| 01 Sobre | Prosa + `.principles` (3 itens com filete) | Padding menor (~80 px). Títulos dos princípios viram fatos curtos (COPY-05) |
| 02 Histórico | Changelog (quadrado = trabalho, redondo = estudo) | Tirar tags da entrada AGX (COPY-04) |
| 03 Pipeline | Abas por cenário + etapas + painel código/descrição/tags; acordeão < 1024 px | Etapa ativa = borda de acento + `--accent-soft` (PIPE-03). Trechos conferidos no repo (PIPE-04) |
| 04 Projetos | 5 cards (lead + 4) + `.others` em linhas com miniatura | Sem diagrama de caixinhas; sem `grid-row: span 2` nem `min-height: 360px` no lead; sem miniatura vazia (PROJ-04). Padding amplo (~128 px) |
| 05 Stack | Marquee de logos + `.matrix` + `.certs` | Marquee mantém (D-11, HOME-01). `.certs` sem `<code>` vazio (CERT-02) |
| 06 Contato | Título + e-mail grande + copiar + GitHub/LinkedIn | Título "Contato", sem subtítulo de vaga, altura menor |

Cada seção mantém a marca d'água `NN_NOME` com parallax (`01_SOBRE` … `06_CONTATO`, D-11). Cuidado só com contraste do `h2` (VIS-06).

## Ficha SYSTEM_INFO (HERO-02)

Origem: `prototype-b/index.html:71-78`, refeita no estilo do C.

```html
<figure class="photo">
  <img …>
  <figcaption class="photo__caption">foto-perfil.avif · 1200×1600</figcaption>  <!-- sem "//" -->
</figure>
<dl class="sysinfo" aria-labelledby="sysinfo-t">
  <p id="sysinfo-t" class="sysinfo__head">SYSTEM_INFO</p>
  <div><dt>DEV</dt><dd>Rômulo Gonçalves</dd></div>
  <div><dt>PRIMARY_STACK</dt><dd>Node.js / TS / MongoDB</dd></div>
  <div><dt>SECONDARY</dt><dd>PHP / Laravel / MySQL</dd></div>
  <div><dt>LOCATION</dt><dd>Sorocaba, SP · Brasil</dd></div>
  <!-- STATUS só com D-12 aprovado -->
</dl>
```

- Geist Mono 0.8125rem, `dt` em `--text-muted`, `dd` em `--text-primary`, filete `--border` entre linhas, título em `--accent`. Sem fundo cheio, sem glow.
- Largura igual à da foto no desktop; < 768 px empilha abaixo da foto com `width: 100%` e `dd` com `overflow-wrap: anywhere`.
- O título `SYSTEM_INFO` fica fora do `<dl>` se o validador HTML reclamar de `<p>` dentro de `<dl>` (usar `<div>` irmão com `aria-labelledby`).

## Prints dos projetos (PROJ-01, PROJ-04, SHOT-*)

Ordem de preferência por projeto:

1. Print real aprovado (T4), `object-fit: cover` dentro da moldura, AVIF/WebP.
2. Sem print: representação de texto honesta, em mono, sem caixinhas:
   - Liftech: trecho real da árvore de pastas (`src/modules/<módulo>/…`), lido do repo.
   - projetoAGX: `POST /emprestimos` + resposta JSON curta (`{ "id": "…", "estoque": 3 }`), fonte 0.8125rem, `aspect-ratio: auto; padding: 24px`; claro = `--bg-elevated` (VIS-10).
   - Moni, soloTrack, ONGFlow: card só texto (sem moldura).
3. Lauressucrier em `.others`: miniatura com print ou linha sem miniatura (`grid-template-columns: 1fr auto`).

## Motion

- Tudo dentro de `@media (prefers-reduced-motion: no-preference)` e `@supports (animation-timeline: view())`. Sem suporte: fallback JS com rAF para `.px` (quadriculado, marcas d'água, foto); se nem isso, página estática.
- Marquee: `animation` CSS, pausa em `:hover`/`:focus-within`, para com reduced-motion.
- GSAP: não (D-02).

## Arquitetura para a Fase 1

- **D-01 (aberta): remover Ionic.** Recomendado: Vue 3 + Vite + `ionicons` só se algum ícone for usado (o C usa SVG inline). Se mantiver Ionic, `ion-content` precisa virar o scroller do parallax e do observer da rota.
- Conteúdo em `src/data/portfolio.ts` (DADOS-01); componentes por seção só se a página passar de ~400 linhas.
- Pipeline: cenários e etapas como dados em `portfolio.ts`; a lógica de abas/acordeão vem de `prototype-c/main.js` (`matchMedia('(max-width: 1023px)')`).
- Imagens: converter uma vez offline (sem plugin de build). Foto: `foto-perfil.avif`/`.webp` em 600 e 1200 px.
- Branches: `v2` (backup), `v3` (desenvolvimento, já tem o commit de deploy:  `vite.config.ts` usa `process.env.VITE_BASE ?? '/portifolio/'`; `vercel.json` com `VITE_BASE=/` e rewrite SPA). `master` e `.github/workflows/deploy.yml` (dispara só em `master`) não mudam.
- Deploy: `vercel deploy --prod` pela CLI no projeto `portifolio`, só com pedido do usuário (T14).

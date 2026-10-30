# Design A (Claude): "O portfólio é uma requisição"

Proposta de redesenho visual da `HomePage.vue` para o perfil **Desenvolvedor Back-end (Node/TS/MongoDB, PHP/Laravel)**. Nenhum código foi alterado. Conteúdo e lista de projetos seguem `copy.md` e `github-projetos.md` (mesma pasta); aqui o foco é forma, movimento e implementação.

**Leitura do brief:** portfólio de dev back-end para recrutadores e tech leads, que batem o olho em 30 segundos. Linguagem visual de **documentação técnica / observabilidade** (trace, request line, spans), sóbria, sem estética "hacker neon". Base em CSS nativo dentro do Vue já existente. GSAP só se uma decisão abaixo exigir.

**Dials:** `DESIGN_VARIANCE 6` · `MOTION_INTENSITY 5` · `VISUAL_DENSITY 4`. Parallax existe, mas é contido: ele mostra profundidade e progresso, não é show.

---

## 1. Auditoria rápida do que existe (o que sai, o que fica)

| Hoje | Problema | Decisão |
|---|---|---|
| 3 orbs com `blur(100px)` animados em `position: fixed` | Anti-padrão pedido; repaint de GPU constante no mobile | **Remover** |
| `glass-card` em tudo (backdrop + borda roxa) | Glass genérico, sem hierarquia | **Remover**. Agrupar por espaço e `border-top` |
| Paleta `#6c5ce7 / #a29bfe / #74b9ff` + `gradient-text` | Gradiente roxo de IA | **Trocar** por neutro grafite + 1 acento |
| Inter via `<link>` do Google Fonts | Fonte padrão de IA; request externo bloqueante | **Trocar** e self-host |
| Emojis como ícones das categorias (`⚙️ 🌐 🛠️`), `♥` no rodapé | Anti-padrão pedido | **Remover** (categorias viram texto) |
| Janela de código com bolinhas do macOS (`sobre-mim.ts`) | "Fake screenshot" em div | **Trocar** por `<dl>` semântico (seção 5.3) |
| "Scroll para explorar" + mouse animado | Scroll cue | **Remover** |
| `section-tag` `// sobre mim` acima de **todo** título | Eyebrow repetido 6x | **Remover**; o caminho da rota vira marca d'água de parallax |
| Experiência e Educação como 2 timelines de cards iguais | Mesma família de layout 2x; não mostra sobreposição estudo+trabalho | **Fundir** num único waterfall de spans (assinatura) |
| 12 projetos, 0 em Node/TS/Mongo | Contradiz o título "Back-end" | Seguir `github-projetos.md` (Liftech, projetoAGX, Moni em destaque) |
| Skills: categoria "Back-End" sem Node, TS nem MongoDB | Contradiz a experiência atual | Reorganizar por "uso no trabalho" vs "já usei" |
| Stats `2+ / 10+ / 15+` | Números redondos sem lastro (15+ é inflado) | Manter só o verificável, como texto |
| `foto-perfil.jpeg` 680 KB, `calculadoraLexica.png` 2,8 MB, `delivery.png` 600 KB | LCP e banda no 4G | Converter para AVIF/WebP com `srcset` |
| `viewport ... maximum-scale=1.0, user-scalable=no` | Bloqueia zoom (WCAG 1.4.4) | **Remover** os dois |
| `isDark = ref(true)` e o `onMounted` só trata `'dark'` | Preferência "light" salva nunca é aplicada | Ler `prefers-color-scheme` + `localStorage` (seção 9) |

O que **fica**: a foto real, o logo `<RG />` (é a marca dele, só muda a tipografia), o toggle de tema, o `IntersectionObserver` (reaproveitado para a seção ativa), o PDF do currículo, `ionicons` (já instalado, sem lib nova de ícone).

---

## 2. Conceito visual

**A página inteira é uma requisição HTTP sendo atendida.** Quem chega faz `GET /romulo`; cada seção é um trecho do processamento; o fim é a resposta (contato). Isso aparece em três lugares, e só neles, para não virar fantasia:

1. **Barra de requisição** (o próprio menu): mostra `GET /<seção atual>` e uma linha de progresso de leitura. Funciona de verdade como navegação.
2. **Trace da trajetória** (assinatura): experiência + formação desenhadas como um *waterfall* de spans, igual a Jaeger/Datadog APM, com as **datas reais** no eixo do tempo.
3. **Marcas d'água de rota** (`/projetos`, `/stack`): tipografia mono gigante em camada de fundo com parallax lento.

O resto da página é tipografia limpa, muito espaço e grid. O "tema back-end" está na estrutura, não em decoração.

Referências de tom (não copiar): docs da Stripe (densidade e clareza), UI de trace do Honeycomb/Jaeger (waterfall), páginas de status (sobriedade).

---

## 3. Tipografia

| Papel | Fonte | Pesos | Uso |
|---|---|---|---|
| Display + texto | **Geist** (variável) | 400, 500, 600 | Nome, títulos, corpo |
| Mono | **Geist Mono** (variável) | 400, 500 | Request line, rotas, datas, tags de tecnologia, eixo do waterfall |

- Mesma família nos dois papéis: contraste vem de largura (mono vs proporcional), não de mistura de famílias. Nada de serif.
- Instalação (self-host, sem request ao Google): `npm i @fontsource-variable/geist @fontsource-variable/geist-mono` e importar em `main.ts`. Pré-carregar só o subset `latin` do Geist via `<link rel="preload" as="font" type="font/woff2" crossorigin>`. Remover o `<link>` do Google Fonts do `index.html`.
- `font-display: swap` + `size-adjust`/fallback `system-ui` para CLS baixo.
- Alternativa se o pacote não agradar: **IBM Plex Sans + IBM Plex Mono** (`@fontsource/ibm-plex-*`), mesma lógica.

Escala (fluida, `clamp`):

| Token | Valor | Onde |
|---|---|---|
| `--fs-display` | `clamp(2.75rem, 6vw + 1rem, 5.5rem)` / 600 / `letter-spacing: -0.035em` / `line-height: 1.02` | H1 do hero |
| `--fs-h2` | `clamp(2rem, 3vw + 1rem, 3.25rem)` / 600 / `-0.025em` | Títulos de seção |
| `--fs-h3` | `1.375rem` / 500 | Nome de projeto, cargo |
| `--fs-body` | `1.0625rem` / 400 / `line-height: 1.65` / `max-width: 65ch` | Texto |
| `--fs-mono` | `0.875rem` / 400 / `letter-spacing: 0` | Rotas, datas, tags |
| `--fs-watermark` | `clamp(6rem, 18vw, 16rem)` / Geist Mono 500 | Marca d'água de rota |

Ênfase dentro de título: peso 600 vs 400 da mesma família. Nada de `gradient-text`.

---

## 4. Paleta e tokens

Neutro **grafite frio** + **um acento: laranja-sinal**. Laranja porque é a cor de "atenção" em log e trace, foge do roxo/azul padrão e lê bem nos dois temas. Usado só em: CTA primário, span ativo, linha de progresso, link em hover, foco.

| Token | Escuro (padrão) | Claro | Contraste (texto) |
|---|---|---|---|
| `--bg` | `#0E0F11` | `#F3F4F5` | |
| `--surface` | `#16181B` | `#FFFFFF` | |
| `--line` | `#26292E` | `#D9DCE0` | decorativo |
| `--text` | `#E7E8EA` | `#121417` | ~15:1 / ~17:1 |
| `--text-muted` | `#9BA0A8` | `#545A64` | ~7:1 / ~6,3:1 |
| `--accent` | `#FF6A3D` | `#B5370F` | ~6,7:1 / ~5,4:1 |
| `--on-accent` | `#0E0F11` | `#F7F7F8` | ~6,7:1 / ~5,6:1 |
| `--watermark` | `#1B1D21` | `#E6E8EB` | decorativo, `aria-hidden` |

- Sem `#000` nem `#fff` puros. Sombras: nenhuma por padrão; elevação só no painel de preview de projeto, `0 24px 48px -24px rgb(0 0 0 / .5)` no escuro.
- Status "disponível": usa o próprio `--accent` com um ponto de 8px, **uma vez** na página (estado real).
- **Raio:** `0` em tudo (blocos, imagens, botões, inputs). Exceção documentada: a foto não tem raio também. Sistema "all-sharp".
- Estratégia: CSS custom properties em `:root` e `[data-theme="light"]`, mapeando as `--ion-*` que ainda forem usadas. Uma paleta, um acento, travados na página toda.

---

## 5. Layout por seção

Container: `max-width: 1200px`, padding lateral `24px` (mobile) / `48px` (≥1024). Grid de 12 colunas no desktop. Ritmo vertical `clamp(96px, 12vw, 160px)` entre seções. Cada seção usa uma família de layout diferente.

### 5.1 Barra de requisição (nav, fixa)

- Altura 64px. Fundo `--bg` sólido com `border-bottom: 1px solid var(--line)` (sem blur).
- Esquerda: `<RG />` (Geist Mono 500, `<` e `/>` em `--text-muted`).
- Centro (≥768): **request line** em mono: `GET  /projetos` com o método em `--text-muted` e a rota em `--text`. A rota troca conforme a seção ativa (IntersectionObserver). É um `<button>` que abre a lista de rotas (as 5 seções) num menu simples; cada item é `<a href="#id">`.
- Direita: links "Trajetória · Projetos · Contato" (≥1024) e o toggle de tema (ionicon `contrast-outline`).
- Base da barra: linha de 2px em `--accent` com `scaleX` ligado ao progresso de scroll (seção 6).
- Mobile: só `<RG />`, request line encurtada e toggle; a request line é o menu.

### 5.2 Hero: split assimétrico 7/5

- Coluna 1-7: eyebrow (único da página) `Rômulo Gonçalves` em mono `--text-muted`; H1 **"Desenvolvedor back-end."** (2 linhas no máximo); subtexto ≤ 20 palavras (copy final vem do `copy.md`, ex.: "APIs em Node.js, TypeScript e MongoDB na AGX Software. Antes, PHP e Laravel em ERP escolar."); CTAs: **"Ver projetos"** (primário, fundo acento) e **"Baixar currículo"** (secundário, borda `--line`). LinkedIn sai do hero (vai para contato).
- Coluna 8-12: foto real em moldura retangular 4:5, `object-fit: cover`, sem anel, sem badge sobreposto. Camada de parallax (seção 6).
- `min-height: 100dvh` menos a nav; `padding-top` ≤ 96px. Nada abaixo dos CTAs.
- Mobile (<768): uma coluna; foto 3:4 a 60% da largura, alinhada à esquerda, **abaixo** do texto. CTAs empilhados full-width.

### 5.3 Sobre: parágrafo-manifesto + ficha técnica

- Uma frase grande (`--fs-h2`, peso 400, 2-3 linhas, largura 10 colunas) com o resumo. Abaixo, 2 colunas: à esquerda 1-2 parágrafos curtos (`65ch`); à direita uma **`<dl>` de ficha técnica** em mono, substituindo o code block falso:

  ```
  cargo        Desenvolvedor back-end, AGX Software
  stack        Node.js · TypeScript · MongoDB
  antes        PHP · Laravel · MySQL
  formação     Eng. da Computação, Uniso (em curso)
  base         Sorocaba / SP
  ```
  Chave em `--text-muted`, valor em `--text`, uma linha `--line` só no topo do bloco. É texto real, selecionável e lido por leitor de tela.
- Stats somem como "números grandes"; "desde 2024 em produção" entra na frase se o `copy.md` quiser.
- Mobile: tudo em uma coluna, `<dl>` depois do texto.

### 5.4 Trajetória: o trace (ideia assinatura, detalhe na seção 7)

Full-width. Waterfall de spans com eixo de tempo 2021 → hoje. Abaixo do gráfico, o painel de detalhe do span selecionado.

### 5.5 Projetos: índice com preview fixo

- Lista de 4-5 destaques (ordem do `github-projetos.md`: Liftech, projetoAGX, Moni, ONGFlow, Mini Interpretador). Cada linha: nome em `--fs-h3`, uma frase, techs em mono `--text-muted`, ano à direita. Separador: só `border-top` no grupo + espaço, não hairline em cada linha.
- Desktop: coluna 1-7 é a lista; coluna 8-12 é um **painel `position: sticky`** que mostra o screenshot do projeto em hover/foco (troca com crossfade de 200ms). Sem hover (touch), mostra o primeiro e troca ao tocar.
- Cada linha é um `<a>` inteiro para o repo/demo, com ícone `arrow-up-right` (ionicons `open-outline`) e texto visível "abre em nova aba" no `aria-label`.
- "Outros projetos" (GeoLab, ATOMOX, CRISTALUNI etc.) dentro de `<details><summary>Mais no GitHub</summary>` nativo: lista compacta em 2 colunas. Sem cards.
- Mobile: screenshot inline acima de cada item (16:10), lista em uma coluna.

### 5.6 Stack: dois níveis tipográficos

- **"Uso no trabalho"**: Node.js, TypeScript, MongoDB, Express, PHP, Laravel, MySQL, Docker, Git. Em `--fs-h2` peso 500, quebrando em linha como um parágrafo de palavras (flow inline), separadas por espaço largo. Sem logo, sem barra de nível.
- **"Já usei"**: Vue, Angular, React, Ionic, Python, Firebase, Linux, Tailwind... numa **faixa marquee única** em mono `--text-muted` (o único marquee da página), pausável no hover e parada em reduced-motion.
- Figma/Photoshop/Gimp saem (não ajudam o perfil back-end). Os SVGs de `assets/img/habilidades` deixam de ser usados aqui; se quiserem logos, usar `simple-icons` monocromático, nunca colorido em grade.
- Mobile: mesmo layout, fonte menor; marquee vira `overflow-x: auto` com `scroll-snap` se reduced-motion.

### 5.7 Contato: a resposta

- Linha mono pequena: `HTTP/1.1 200 OK` em `--text-muted` (é o fechamento do conceito, uma vez só).
- E-mail **gigante** (`--fs-display` reduzido, quebra permitida em `@`) como link `mailto:`, sublinhado em `--accent` no hover. Botão de cópia ao lado (ionicon `copy-outline`, feedback "copiado" com `aria-live="polite"`).
- Linha de links: GitHub, LinkedIn (Instagram sai, não é canal profissional; decisão do Rômulo). Status "Disponível para oportunidades" com o ponto de acento.
- Layout família "full-bleed tipográfico"; marca d'água `/contato` atrás.

### 5.8 Rodapé

Uma linha: `© 2026 Rômulo Gonçalves` à esquerda, "código deste site" (link para o repo) à direita. Sem coração, sem versão.

**Contagem de famílias de layout:** split (hero), manifesto+ficha (sobre), data-viz (trace), índice+sticky (projetos), tipográfico+marquee (stack), full-bleed (contato). 6 seções, 6 famílias. **Eyebrows:** 1 (hero).

---

## 6. Plano de parallax

### 6.1 Camadas

| Camada | Elemento | Movimento | Por quê |
|---|---|---|---|
| L0 fundo | Marcas d'água de rota (`/sobre`, `/trajetoria`, `/projetos`, `/stack`, `/contato`) atrás de cada título | `translateY` de +15vh a -15vh enquanto a seção cruza a viewport (≈0,6x do scroll) | Dá profundidade e diz "onde estou" sem eyebrow |
| L1 mídia | Foto do hero; screenshots de projeto dentro da moldura (`overflow: hidden`, imagem 115% de altura) | Imagem desliza -6% → +6% dentro da moldura | Profundidade clássica, barata, só `transform` |
| L2 conteúdo | Texto, listas | 1x (scroll normal); entrada com `opacity` 0→1 + `translateY` 16px→0 uma vez | Hierarquia: o conteúdo chega antes do detalhe |
| L3 progresso | Linha da nav, barras do waterfall | Ligados ao progresso de scroll (`scaleX`) | É a narrativa da "requisição sendo processada" |
| L4 fixo | Nav | Não se move | Âncora |

Amplitude máxima: 15vh na L0, 6% na L1. Nada se move no eixo X por scroll (sem horizontal hijack, sem pin longo).

### 6.2 CSS scroll-driven vs GSAP ScrollTrigger

| Critério | CSS scroll-driven (`animation-timeline: view()/scroll()`) | GSAP + ScrollTrigger |
|---|---|---|
| Peso | 0 KB | ~40 KB gzip (core + plugin), dependência nova |
| Thread | Compositor, sem JS por frame | JS no main thread (barato, mas existe) |
| Suporte (out/2026) | Chrome/Edge; Safari 26+; Firefox: **verificar** no momento da implementação | Todos |
| Pin / sequência complexa | Limitado (`position: sticky` cobre o que precisamos) | Forte |
| Ionic `ion-content` | Funciona se o scroller for encontrado (ver risco R1) | Precisa `scroller: await ionContent.getScrollElement()` |
| Reduced motion | `@media` envolvendo tudo | `gsap.matchMedia()` |

**Recomendação: CSS scroll-driven para tudo, como progressive enhancement.** Nada no plano precisa de pin com scrub nem sequência que o CSS não faça. Sem suporte, a página fica estática e completa (que é o mesmo resultado do reduced-motion). GSAP só entra se o coordenador exigir paridade de animação no Firefox sem suporte; aí a troca fica restrita ao componente do trace e ao utilitário `.px`, num composable com `gsap.context()` + `revert()` no `onBeforeUnmount`.

### 6.3 Esqueleto CSS

```css
/* tudo gated: sem suporte ou com reduced-motion = página estática */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .px-watermark {
      animation: px-y linear both;
      animation-timeline: view();
      animation-range: cover;
      --px-from: 15vh; --px-to: -15vh;
    }
    .px-media > img {
      animation: px-y linear both;
      animation-timeline: view();
      --px-from: -6%; --px-to: 6%;
    }
    .reveal {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 60%;
    }
    .nav-progress {
      transform-origin: 0 50%;
      animation: grow-x linear both;
      animation-timeline: --page; /* timeline nomeada no scroller, ver R1 */
    }
  }
}
@keyframes px-y   { from { translate: 0 var(--px-from); } to { translate: 0 var(--px-to); } }
@keyframes reveal { from { opacity: 0; translate: 0 16px; } to { opacity: 1; translate: 0 0; } }
@keyframes grow-x { from { scale: 0 1; } to { scale: 1 1; } }
```

- Sem suporte a scroll-driven, `.reveal` **não** pode começar invisível: o estado inicial só existe dentro do `@supports`. O `IntersectionObserver` atual (classe `visible`) pode sair; fica só para marcar a seção ativa.
- Só `transform`/`translate`/`scale`/`opacity`. `will-change` nenhum por padrão (o navegador promove sozinho com animação ativa).

### 6.4 Fallback `prefers-reduced-motion: reduce`

- Todas as camadas paradas na posição final (sem parallax, sem reveal, conteúdo visível).
- Barra de progresso da nav: some (a request line com a rota ativa já informa a posição).
- Waterfall: barras já desenhadas por completo.
- Marquee: parado, vira lista com scroll horizontal manual.
- `scrollIntoView({ behavior })`: `'auto'` quando `matchMedia('(prefers-reduced-motion: reduce)').matches`.
- Troca de tema sem transição de cor.

---

## 7. Ideia assinatura: o trace da trajetória

O que um back-end olha todo dia: um trace distribuído. Aqui ele mostra a carreira com **datas reais**, sem número inventado, e deixa visível algo que a timeline atual esconde: estudo e trabalho em paralelo.

### 7.1 Dados (todos já estão no `HomePage.vue`)

| Span | Início | Fim | Faixa |
|---|---|---|---|
| Técnico em Desenvolvimento de Sistemas, Etec | 02/2021 | 12/2023 | formação |
| Engenharia da Computação, Uniso | 02/2024 | em curso | formação |
| Estágio, Education One | 10/2024 | 11/2025 | trabalho |
| Desenvolvedor Full Stack, Education One | 11/2025 | 04/2026 | trabalho |
| Desenvolvedor Back-end, AGX Software | 04/2026 | em curso | trabalho |

Eixo: 02/2021 → mês atual (calculado em runtime, `new Date()`), ticks anuais em mono.

### 7.2 Visual

- Duas faixas (lanes) rotuladas "trabalho" e "formação", como serviços num trace. Cada span é uma barra de 28px de altura, cor `--line` com borda `--text-muted`; o span **selecionado** fica em `--accent`. Spans "em curso" terminam em borda tracejada na direita.
- Rótulo à esquerda da barra (ou dentro, se couber): cargo + empresa em Geist 500, período em mono.
- Posição calculada no template: `--start` e `--len` em meses a partir de 02/2021, `left: calc(var(--start) / var(--total) * 100%)`, `width: calc(var(--len) / var(--total) * 100%)`. Sem lib de gráfico.
- Animação (L3): cada barra faz `scale: 0 1 → 1 1` (origem à esquerda) com `animation-timeline: view()` e `animation-range: entry 20% cover 40%`, escalonada por `--start`, como um trace sendo preenchido. Em reduced-motion já aparece pronto.
- **Painel de detalhe** abaixo: ao clicar/focar um span, mostra a descrição (copy do `copy.md`) e as tags. Começa com o span atual (AGX) selecionado. Troca com crossfade de 150ms.

### 7.3 Acessibilidade do trace

- A marcação é uma `<ol>` cronológica de `<li><button aria-pressed>` com `<time datetime="2024-10">`. As barras são o estilo dessa lista, não um `<canvas>` nem SVG solto. Leitor de tela lê "Estágio, Education One, outubro de 2024 a novembro de 2025".
- Setas ←/→ navegam entre spans (roving tabindex); Enter/Espaço seleciona. Foco visível com `outline: 2px solid var(--accent); outline-offset: 3px`.
- O painel de detalhe é `aria-live="polite"`.

### 7.4 Mobile

O eixo horizontal vira vertical: cada span é uma linha com uma mini-barra horizontal proporcional (largura = duração) sob o texto, ordenada da mais recente para a mais antiga. A descrição fica inline (accordion com `<details>`), sem painel separado.

### 7.5 Ecos do conceito (secundários, baratos)

- Request line na nav (`GET /projetos`), seção 5.1.
- `HTTP/1.1 200 OK` no contato, seção 5.7.
- Nada além disso: sem terminal falso, sem digitação animada, sem JSON fake.

---

## 8. Wireframes ASCII

### Desktop (≥1024)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ <RG />            GET  /                   Trajetória Projetos Contato ◐ │ 64px
│▔▔▔▔▔▔▔▔▔▔▔▔ (linha de progresso, acento) ................................│
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Rômulo Gonçalves                                  ┌──────────────────┐  │
│                                                    │                  │  │
│  Desenvolvedor                                     │                  │  │
│  back-end.                                         │   foto 4:5       │  │
│                                                    │   (parallax L1)  │  │
│  APIs em Node.js, TypeScript e MongoDB na AGX      │                  │  │
│  Software. Antes, PHP e Laravel em ERP escolar.    │                  │  │
│                                                    │                  │  │
│  [ Ver projetos ]  [ Baixar currículo ]            └──────────────────┘  │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│   /sobre  (marca d'água L0)                                              │
│  Escrevo e mantenho APIs em produção. Comecei no                         │
│  técnico em 2021 e hoje estudo Engenharia da Computação.                 │
│                                                                          │
│  Parágrafo curto (65ch)...            ─────────────────────────────────  │
│  ...                                  cargo     Dev back-end, AGX        │
│                                       stack     Node.js · TS · MongoDB   │
│                                       antes     PHP · Laravel · MySQL    │
│                                       formação  Eng. Computação, Uniso   │
├──────────────────────────────────────────────────────────────────────────┤
│   /trajetoria                                                            │
│  Trajetória                                                              │
│            2021      2022      2023      2024      2025      2026        │
│  trabalho  ·         ·         ·         ·  [Estágio  ][FS ][Back-end>>  │
│  formação  [Técnico, Etec           ]    ·[Eng. Computação, Uniso   >>  │
│  ──────────────────────────────────────────────────────────────────────  │
│  Desenvolvedor Back-end · AGX Software · 04/2026 até hoje                │
│  Descrição curta do span selecionado...                                  │
│  Node.js  TypeScript  MongoDB  Git                                       │
├──────────────────────────────────────────────────────────────────────────┤
│   /projetos                                                              │
│  Projetos                                                                │
│  ──────────────────────────────────          ┌────────────────────────┐  │
│  Liftech                        2026 ↗       │                        │  │
│  Monorepo Node + Express + Mongoose          │  screenshot do item    │  │
│  node  express  mongoose  vitest             │  em hover/foco         │  │
│                                              │  (sticky, parallax L1) │  │
│  projetoAGX                     2026 ↗       │                        │  │
│  Moni                           2026 ↗       └────────────────────────┘  │
│  ONGFlow                        2025 ↗                                   │
│  Mini Interpretador             2025 ↗                                   │
│  ▸ Mais no GitHub                                                        │
├──────────────────────────────────────────────────────────────────────────┤
│   /stack                                                                 │
│  Uso no trabalho                                                         │
│  Node.js   TypeScript   MongoDB   Express   PHP                          │
│  Laravel   MySQL   Docker   Git                                          │
│  Já usei                                                                 │
│  ‹ vue  angular  react  ionic  python  firebase  linux  tailwind  … ›    │
├──────────────────────────────────────────────────────────────────────────┤
│   /contato                                                               │
│  HTTP/1.1 200 OK                                                         │
│  romulogoncalves13                                                       │
│  @gmail.com                                   [copiar]                   │
│  GitHub   LinkedIn            ● Disponível para oportunidades            │
├──────────────────────────────────────────────────────────────────────────┤
│ © 2026 Rômulo Gonçalves                              código deste site   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Mobile (<768)

```
┌──────────────────────────┐
│ <RG />   GET /trajet… ▾ ◐│
├──────────────────────────┤
│ Rômulo Gonçalves         │
│ Desenvolvedor            │
│ back-end.                │
│ APIs em Node.js, TS e    │
│ MongoDB na AGX...        │
│ [     Ver projetos     ] │
│ [   Baixar currículo   ] │
│ ┌──────────┐             │
│ │ foto 3:4 │             │
│ └──────────┘             │
├──────────────────────────┤
│ Trajetória               │
│ Dev Back-end, AGX        │
│ 04/2026 até hoje         │
│ ▬▬▬▬▸                    │
│ Eng. Computação, Uniso   │
│ 02/2024 em curso         │
│ ▬▬▬▬▬▬▬▬▬▬▸              │
│ Full Stack, Education One│
│ 11/2025 a 04/2026        │
│ ▬▬▬                      │
│ ...                      │
└──────────────────────────┘
```

---

## 9. Componentes

Poucos arquivos; dados continuam como `const` no script (ou um `data.ts` único, se a página ficar grande).

| Componente | Responsabilidade | Notas |
|---|---|---|
| `RequestBar.vue` | Nav, request line, menu de rotas, toggle de tema, linha de progresso | Rota ativa via `IntersectionObserver` (`rootMargin: '-45% 0px -50% 0px'`) |
| `TraceWaterfall.vue` | Assinatura (seção 7) | Recebe `spans[]` com `inicio`/`fim` em `YYYY-MM`; calcula `--start`/`--len` |
| `ProjetoIndex.vue` | Lista + painel sticky + `<details>` | Imagens com `srcset`, `loading="lazy"`, `width`/`height` fixos |
| `HomePage.vue` | Hero, Sobre, Stack, Contato, rodapé direto no template | Não vale criar componente para seção que aparece uma vez sem estado |
| `px.css` (ou bloco no `variables.css`) | Utilitários `.px-watermark`, `.px-media`, `.reveal`, keyframes | Seção 6.3 |

Tema: `data-theme` no `<html>`, valor inicial = `localStorage.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')`, aplicado num `<script>` inline no `index.html` antes do app montar (evita flash). `<meta name="color-scheme">` já existe.

Estados: botão "copiar e-mail" tem idle/copiado/erro (fallback: seleciona o texto). Imagem de projeto sem carregar: bloco `--surface` com a mesma proporção (sem spinner).

Interação dos CTAs: `:active { translate: 0 1px; }`, `:focus-visible` com outline acento; `transition: background-color .2s, color .2s` (nada de `transition: all`).

---

## 10. Riscos

### Performance

| # | Risco | Mitigação |
|---|---|---|
| P1 | Imagens pesadas (2,8 MB, 680 KB, 600 KB) dominam LCP | AVIF/WebP via `vite-imagetools` ou conversão única offline; `srcset` 480/960/1440; foto do hero com `fetchpriority="high"` e sem lazy |
| P2 | Fonte bloqueante do Google | Self-host Geist variável, subset latin, preload só do arquivo de texto |
| P3 | Marquee e parallax em celulares fracos | Só `transform`; marquee em CSS puro com `animation-play-state` pausado fora da viewport (`content-visibility: auto` na seção) |
| P4 | Ionic inteiro (core + 8 CSS utilitários) para uma página só | Ver D1. Se ficar, remover imports CSS não usados de `main.ts` (`padding`, `float-elements`, `text-*`, `flex-utils`, `display`) |
| P5 | GSAP adicionado "por garantia" | Não adicionar; só se D2 decidir |
| P6 | CLS de fontes e imagens | `width`/`height` em toda `<img>`, `size-adjust` no fallback |

### Acessibilidade

| # | Risco | Mitigação |
|---|---|---|
| A1 | `user-scalable=no` bloqueia zoom | Remover do `index.html` |
| A2 | Parallax e marquee causam enjoo | Tudo dentro de `prefers-reduced-motion: no-preference` (seção 6.4); marquee pausável |
| A3 | Trace vira gráfico mudo | `<ol>` + `<time>` + botões, setas, `aria-live` (seção 7.3) |
| A4 | Hierarquia de headings quebrada hoje (h1 nome, h2 cargo, h3 seções, h4 itens) | h1 = título do hero; h2 = seções; h3 = itens |
| A5 | Nav com `<button>` que só faz scroll | Links `<a href="#id">`; mover foco para o h2 da seção ao navegar (`tabindex="-1"`) |
| A6 | Links externos sem aviso | Texto "abre em nova aba" (visível ou `aria-label`) + `rel="noopener"` |
| A7 | Marca d'água lida por leitor de tela ou competindo com texto | `aria-hidden="true"`, contraste baixo de propósito, nunca carrega informação única |
| A8 | Laranja em texto pequeno no tema claro | Usar `#B5370F` (5,4:1) para texto; `#FF6A3D` só no escuro |

### Técnicos / decisões em aberto

| # | Ponto | Recomendação |
|---|---|---|
| R1 | `ion-content` rola num elemento dentro do shadow DOM (`.inner-scroll`). `view()` deve achar esse scroller pela árvore achatada, mas a timeline da nav (fora do `ion-content`) precisa de timeline nomeada em `ion-content::part(scroll)` + `timeline-scope`, que pode não cruzar o shadow root | Testar no protótipo antes de tudo. Se falhar, a linha de progresso usa `IntersectionObserver` por seção (discreta) em vez de contínua |
| D1 | Manter Ionic? O site usa só `IonPage/IonHeader/IonContent/IonButton/IonIcon` | **Recomendo** trocar `IonContent` por `<main>` com scroll do documento: some o R1, âncoras nativas funcionam, `scroll(root)` funciona, bundle cai. `ionicons` fica. Mudança de arquitetura: decisão do coordenador/Rômulo |
| D2 | GSAP sim/não | Não, salvo exigência de animação idêntica no Firefox sem scroll-driven |
| D3 | Instagram no contato | Sair; confirmar com o Rômulo |
| D4 | Screenshots de Liftech/projetoAGX/Moni não existem em `assets/img` | Precisam ser capturados (deploys Vercel citados no `github-projetos.md`). Sem imagem, o painel sticky mostra o README/diagrama do projeto ou some |

---

## 11. Checklist de anti-padrões (deste design)

- Orbs, blobs, mesh: nenhum.
- Glass/backdrop-filter: nenhum.
- Gradiente roxo ou qualquer gradiente de texto: nenhum.
- Emoji como ícone: nenhum (ionicons outline, um traço só).
- Terminal/janela de código falsa: nenhuma (ficha técnica é `<dl>` real; trace é lista real).
- Números inventados: nenhum (só datas e fatos do arquivo atual).
- Eyebrows: 1. Marquee: 1. Ponto de status: 1, com estado real.
- Scroll cue, faixa decorativa no rodapé do hero, numeração de seção: nenhum.
- Um acento, um raio (0), um tema por vez com paridade claro/escuro.

# Build T6–T9: base do site novo

Worktree: `/home/romulo/orca/workspaces/portifolio/build-t6-t9` (branch `RomuuloGoncalves/build-t6-t9`). Tudo está como alteração **não commitada**, sem push.

A worktree foi criada em `437de9f`, que não tem o commit de deploy. Como estava limpa, rodei `git reset --hard v3`. HEAD agora é `c9ecc69` e `git log --oneline -3` mostra `cb003ed chore: configura deploy na Vercel`.

## O que mudou

### D-01: Ionic e Capacitor removidos
- Saíram `@ionic/vue`, `@ionic/vue-router`, `ionicons` e `@capacitor/*` (dependencies e devDependencies), além de `capacitor.config.ts` e `ionic.config.json`.
- O site agora é Vue 3 + Vite + `vue-router`. A única rota é `/` (qualquer outro caminho redireciona para `/`). As seções usam âncoras nativas.
- `vite.config.ts` (base via `VITE_BASE`) e `vercel.json` ficaram como estavam.
- `test:unit` agora roda `vitest run`.

### T6: dados e metadados
- `src/data/portfolio.ts` traz os tipos e todo o conteúdo de `content.md` rev. 2: perfil, ficha, seções/rotas, sobre, histórico, projetos (destaque e outros), marquee, matriz, certificados e `pipeline` (vazio, com TODO para o T11). Os itens `[CONFIRMAR]` estão marcados em comentários.
- `index.html`:
  - `<title>Rômulo Gonçalves · Desenvolvedor back-end</title>`, description e OG (`og:type`, `og:locale`, `og:title`, `og:description`).
  - Viewport `width=device-width, initial-scale=1`, sem `user-scalable=no`.
  - O `<base href="/">` herdado do Ionic saiu.
  - O script inline de tema roda antes do primeiro paint.
- **Divergência a decidir:** o brief pedia "Desenvolvedor **B**ack-end", mas `spec.md` (DADOS-02), `content.md` e o protótipo usam "back-end" minúsculo. Segui a spec. Para trocar, basta mudar `perfil.cargo` e o `index.html`; o teste compara sem diferenciar maiúsculas.
- `tests/unit/example.spec.ts` foi removido.

### T7: regras de conteúdo (`tests/unit/portfolio.spec.ts`)
Os testes cobrem:
- DADOS-03: campos obrigatórios, descrição com até 220 caracteres, links `https`, projeto privado sem repo.
- PROJ-01: ordem dos 5 projetos em destaque.
- PROJ-04: nenhum campo de imagem com valor `''`.
- STACK-01 e STACK-03.
- COPY-02: lista proibida e `!`, procurados recursivamente em todo o conteúdo, com um teste que prova que "apaixonado" e "vamos conversar" são pegos.
- COPY-03: hero com no máximo 2 frases.
- COPY-04: no máximo 3 itens por entrada e entrada atual sem tags.
- COPY-05: títulos e subtítulos.
- CERT-02: sem credencial ou URL `''`.
- T8: ícones presentes no sprite, imagens existentes em disco e em WebP/AVIF, foto em 600/1200, currículo em `public/`.

Conferi que os testes realmente falham quando a regra quebra: inserir uma cor hex no CSS e uma tag na entrada atual derrubou os dois testes correspondentes.

### T8: fontes, ícones e imagens
- **Fontes:** `@fontsource-variable/geist` e `@fontsource-variable/geist-mono`, importadas em `main.ts`. O link do Google Fonts saiu.
- **Ícones:** `src/assets/icons/tech.svg` é um sprite com os 16 símbolos Simple Icons de `prototype-c` (sem cor fixa, usam `currentColor`).
- **Foto:** `src/assets/img/foto-perfil-{600,1200}.{avif,webp}` e `foto-perfil-1200.jpg` (mozjpeg q80, 155 KB). Foram geradas com sharp a partir de `prototype-c/foto-perfil.jpg`; o sharp não copia EXIF.
- **Prints → `src/assets/projetos/`**, todos em WebP com no máximo 1440 px e entre 16 e 68 KB cada:
  - `liftech/`: 3 prints
  - `ongflow/`: 6
  - `solotrack/`: 3
  - `lauressucrier/`: 2
  - `atomox.webp` e `calculadora-lexica.webp` (antes um PNG de 2,8 MB, agora 32 KB)
- **Removidos:** `src/assets/img/habilidades/*` (27 SVGs), as imagens antigas sem uso, `shapes.svg`, `foto-perfil.jpeg`, `icon/favicon.png` (duplicado de `public/favicon.png`) e `theme/variables.css`.

### T9: casco
- **Cores e estilo:**
  - `src/theme/palette.css` é cópia exata de `prototype-c/palette.css` e é a única fonte de cores (VIS-11).
  - `src/theme/site.css` é o `prototype-c/style.css` com as famílias trocadas para `Geist Variable` e `Geist Mono Variable`. Inclui os estilos das seções futuras e do motion.
- **`HomePage.vue`:** skip link, `.layer-grid`, header, `main` com as seções e rodapé.
- **`AppHeader.vue`:**
  - Logo "Rômulo Gonçalves", que vira "RG" em tela estreita (sem ".sys").
  - Botão `GET /rota` com `popovertarget` e `<nav popover>` com as rotas. A rota acompanha a seção visível via IntersectionObserver.
  - Links da navegação com `aria-current`.
  - Botão de tema que grava `light` ou `dark` no `localStorage`.
  - Sem barra de progresso.
- **`HeroSection.vue`:**
  - Duas frases, "Ver projetos" e "Baixar currículo" (`BASE_URL + curriculo.pdf`).
  - `<picture>` com AVIF/WebP em srcset, `width`/`height` e `fetchpriority="high"`.
  - Ficha SYSTEM_INFO em `<dl>`, sem STATUS enquanto `status` estiver vazio (D-12).
- **`BaseSection.vue`:** seção com marca d'água `NN_NOME` (`aria-hidden`), título, subtítulo e variante de espaçamento (`tight` para Sobre e Contato, `wide` para Projetos).
- **`TechMarquee.vue`:** lista duplicada, com a cópia em `aria-hidden`. A pausa no hover e o reduced-motion vêm do CSS do C.
- **`src/utils/highlight.ts`:** `highlight()` portado do protótipo, para o T11.
- **Testes do casco (`tests/unit/casco.spec.ts`):**
  - Tema: alterna, grava e restaura claro e escuro; sem tema salvo, segue `prefers-color-scheme`. O teste executa o próprio script inline do `index.html`.
  - Header: sem ".sys", sem barra de progresso, com `GET /` e o popover com as 7 rotas.
  - Ficha `<dl>` com e sem STATUS; foto com `srcset`.
  - Marquee duplicado.
  - Nenhum hex, `rgb()` ou `hsl()` fora de `palette.css`, e Carvão e Sálvia ficam comentados.
  - `highlight()` gera 7 classes distintas e escapa HTML.

### Stubs com TODO (outros workers)
`src/components/sections/`:

| Arquivo | Tarefa | O que falta |
| --- | --- | --- |
| `SobreSection.vue` | T10 | conteúdo da seção |
| `HistoricoSection.vue` | T10 | conteúdo da seção |
| `ProjetosSection.vue` | T10 | conteúdo da seção |
| `StackSection.vue` | T10 | só a `.matrix`; o marquee já está pronto |
| `CertificadosList.vue` | T10 | conteúdo da lista |
| `ContatoSection.vue` | T10 | conteúdo da seção |
| `PipelineInspector.vue` | T11 | abas, etapas e acordeão |

Cada stub já renderiza a seção com id, `data-route`, marca d'água e título vindos de `portfolio.ts`.

## Comandos e saída

```
npm install                 # ok (avisos de npm audit herdados)
npm run build               # vue-tsc && vite build → ✓ built in 3.6s
                            # sem VITE_BASE: /portfolio/assets/...; com VITE_BASE=/: /assets/... (DEPLOY-03)
npx vitest run              # Test Files 2 passed (2) · Tests 51 passed (51)
npx vue-tsc --noEmit        # sem erros
```

Também rodei, numa cópia em scratchpad, o `prototype-c/responsive-test.mjs` (Chrome headless) contra o `vite preview` com `VITE_BASE=/`. Precisei trocar um `.click()` por `?.click()`, porque o Pipeline ainda não tem abas. Resultado: **22/22 ok**, de 320 a 1920 px, nos dois temas, sem rolagem horizontal e com alvos de pelo menos 40 px. Fonte Geist, sprite, foto e marcas d'água aparecem nos prints.

## O que falta
- **T10:** seções Sobre, Histórico, Projetos (cards e `.others`, imagens via `new URL(\`../assets/${imagem}\`, import.meta.url)`), matriz da Stack, Certificados e Contato (copiar e-mail).
- **T11:** dados do `pipeline` a partir de `pipeline.md` e `research/arch-*.md`, e o componente de abas.
- **T12:** fallback JS de parallax e reveal (`js-fallback`). O CSS de motion já está em `site.css`.
- **Decisões do usuário:**
  - Aprovar os prints (SHOT-03). Todos foram copiados; os referenciados em `portfolio.ts` são `liftech/visao-geral-desktop`, `solotrack/home-1440`, `ongflow/home-desktop` e `lauressucrier/desktop-hero`. Os não usados saem depois da aprovação.
  - Pendências D-12, D-16 e demais `[CONFIRMAR]`.
  - Maiúscula em "Back-end".
  - `og:image`, que precisa de uma URL absoluta pública.
- `src/assets/docs/curriculo.pdf` ficou intocado. Ele difere de `public/curriculo.pdf`, que é o arquivo usado; falta decidir qual vale.
- `npm run lint` não foi rodado (a config ESLint herdada continua igual).

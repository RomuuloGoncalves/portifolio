# Arquitetura: RomuuloGoncalves/lauressucrier

Repo analisado em clone raso (`--depth 1`, HEAD de hoje). Todas as referências são `arquivo:linha` dentro do repo.

## Veredito

**Não tem back-end rastreável.** É uma landing page estática (Vite + Three.js + GSAP + Lenis). Não há servidor, rota HTTP, controller, service, repositório, modelo nem banco. O único "endpoint" é o link `wa.me` gerado em tempo de build. A aba do Pipeline Inspector deve ser um pipeline **de build/front-end** (ver abaixo), não de requisição HTTP.

Evidência: `package.json` tem só `gsap`, `lenis`, `three` como dependências (e `jsdom`, `sharp`, `vite`, `vitest` em dev); busca por `fetch(`, `axios`, `XMLHttpRequest`, `mongo`, `mysql`, `supabase`, `firebase`, `import.meta.env`, `api/` em `src/`, `index.html` e `vite.config.js` não retorna nada de dados (o único `process.env` é `WHATSAPP_NUMBER`, `src/lib/content.js:1,4`). `vercel.json` só define headers de cache.

## Árvore de pastas (resumida)

```
index.html                 # única página; markup de todas as seções
vite.config.js             # plugin que reescreve os links #wa em build/dev
vercel.json                # Cache-Control de /assets e /img|fonts
src/
  main.js                  # ponto de entrada (CSS, loader, cenas 3D, movimento)
  motion.js                # GSAP/ScrollTrigger/Lenis (reveal, parallax, pin)
  cursor.js                # cursor customizado
  gl/  scene.js ribbon.js sweets.js cta-scene.js   # Three.js (hero e CTA)
  lib/ content.js whatsapp.js html-transform.js loader.js intro.js idle.js
       image-fallback.js motion-plan.js textures.js webgl-support.js
       slots.js depth.js tilt.js
  styles/ tokens base chrome hero vitrine destaque closing cursor (.css)
public/ img/{raw,web,cutouts,hero}  fonts/  robots.txt
scripts/ build-images.mjs build-fonts.py make-cutouts.py make-hero-cutouts.py perf.mjs
tests/  16 arquivos na raiz + tests/lib/*.test.js  (Vitest)
.specs/ spec-driven (landing, hero-mobile, hero-sweets, perf)
```

## Ponto de entrada

- Navegador: `index.html` carrega `src/main.js` (módulo). `src/main.js:1-8` importa os 8 CSS; `:10-20` importa gsap, Lenis e os módulos de `lib/`.
- Build/dev: `vite.config.js:7` chama `assertWhatsAppNumber(WHATSAPP_NUMBER)` já no carregamento da config; `:10-14` registra o plugin `whatsapp-links`.
- Scripts: `npm run dev` (`vite --port 5173 --strictPort`), `build`, `test` (`package.json` scripts).

## Camadas reais

Não existem camadas de servidor. O que existe, de fato:

| Camada | Onde | Papel |
| --- | --- | --- |
| Conteúdo | `src/lib/content.js` | número do WhatsApp (`:4`), URL do Instagram (`:6`), lista `PRODUCTS` (`:8`) |
| Regras puras | `src/lib/*.js` (whatsapp, html-transform, loader, intro, motion-plan, image-fallback) | funções sem DOM, cobertas por teste |
| Orquestração do navegador | `src/main.js` | decide estático x 3D, loader, cenas, listeners |
| Movimento | `src/motion.js` (+ `lib/motion-plan.js`) | `planMotion` devolve flags; `initMotion` aplica GSAP |
| 3D | `src/gl/*.js` | `createHeroScene`, `createCtaScene`, `createStage` |
| Build | `vite.config.js` + `scripts/*` | reescrita de links, otimização de imagens/fontes |

## Middlewares / auth

Nenhum. Sem sessão, token, CORS ou autenticação. Único "estado" persistido: `sessionStorage['intro-seen']` (`src/lib/intro.js:4-21`).

## Persistência

Nenhuma. Não há modelo nem schema. Os dados do catálogo são uma constante JS em `src/lib/content.js:8-45` (4 produtos: `id`, `name`, `desc`, `img`, `alt`, `width`, `height`).

## Testes

Vitest (`package.json` `test`), jsdom. 23 arquivos, 133 testes; rodei: **todos passaram**. Cobrem libs puras (`tests/lib/*.test.js`), markup (`tests/markup.test.js`), build do Vite (`tests/build.test.js:13`), deploy, assets (SHA256 das fotos originais), fontes, créditos, cursor e motion. Há um `scripts/perf.mjs` (Lighthouse-style) não rodado.

## Caso de uso rastreado: "Pedir um doce pelo WhatsApp"

Não é endpoint HTTP; é o fluxo build → HTML → clique. Cada passo:

1. **Markup do botão**: `index.html:112` `<a class="btn" href="#wa:Clássico" aria-label="Pedir Clássico no WhatsApp">Pedir</a>` (os outros: `:127`, `:144`, `:162`; geral `#wa` em `:58`, `:89`, `:212`, `:271`, `:281`).
2. **Dado de configuração**: `src/lib/content.js:4` `WHATSAPP_NUMBER = env.WHATSAPP_NUMBER ?? '<número>'` (variável de ambiente sobrescreve; o número real fica só no repo, não copie para a tela).
3. **Validação**: `vite.config.js:7` → `src/lib/whatsapp.js:1-6` `assertWhatsAppNumber` (`/^\d{8,15}$/`, senão `throw new Error('WHATSAPP_NUMBER inválido…')`). Falha derruba o build.
4. **Plugin de transformação**: `vite.config.js:10-14` `transformIndexHtml: (html) => transformHtml(html, { number: WHATSAPP_NUMBER })`.
5. **Reescrita do link**: `src/lib/html-transform.js:4` regex `WA_LINK = /<a\b([^>]*?)href="#wa(?::([^"]*))?"([^>]*)>/g`; `:6-15` `transformHtml` escolhe a mensagem (`productMessage(decodeURIComponent(product))` ou `DEFAULT_MESSAGE` `:3`) e injeta `target="_blank" rel="noopener noreferrer"` (`:11-13`).
6. **Montagem da URL**: `src/lib/whatsapp.js:8` `buildWhatsAppUrl = (n, message) => \`https://wa.me/${n}?text=${encodeURIComponent(message)}\``; mensagem do produto em `:10` `productMessage = (name) => \`Oi, Laure! Vim pelo site e quero pedir: ${name} 🍫\``.
7. **Resposta**: HTML servido já com `href="https://wa.me/…?text=…"`; o clique abre o WhatsApp em nova aba (`html-transform.js:14`). Não há resposta de servidor.
8. **Teste do caso**: `tests/lib/html-transform.test.js`, `tests/lib/whatsapp.test.js`, `tests/build.test.js`.

## Proposta de abas do Pipeline Inspector

Como não há requisição HTTP, sugiro **uma aba "Pedido via WhatsApp (build)"** com 5 etapas, todas com trecho real:

| # | Etapa | Arquivo:linha | Trecho real |
| --- | --- | --- | --- |
| 1 | Botão no HTML | `index.html:112` | `href="#wa:Clássico"` |
| 2 | Configuração | `src/lib/content.js:4` | `export const WHATSAPP_NUMBER = env.WHATSAPP_NUMBER ?? '…'` [número real, mascarar na UI] |
| 3 | Validação | `src/lib/whatsapp.js:2` | `if (typeof n !== 'string' \|\| !/^\d{8,15}$/.test(n)) {` |
| 4 | Transformação | `src/lib/html-transform.js:4` | `const WA_LINK = /<a\b([^>]*?)href="#wa(?::([^"]*))?"([^>]*)>/g;` |
| 5 | URL final | `src/lib/whatsapp.js:8` | `` `https://wa.me/${n}?text=${encodeURIComponent(message)}` `` |

Opcional (segunda aba, **[CONFIRMAR]** se vale: é front-end, não fluxo de dados): "Entrada da página" com `src/main.js:45` `if (reduced || !supportsWebGL(document))` → `:100` `import('./gl/scene.js')` carregado sob demanda → `src/motion.js:76-83` pin do `#destaque`. Só use se o portfólio aceitar pipeline de front-end.

## Observações

- Dados "reais" no repo: número pessoal em `src/lib/content.js:4` e fotos de Instagram com mãos de uma pessoa em `public/img/web/`. Não exibir no portfólio sem decisão do dono.
- `.claude/launch.json` e `README.md` citam o caminho `/home/romulo/.cache/lauressucrier-rembg/...` (local, irrelevante).

## Classificação (Parte 2): **roda sem banco**

- `package.json`: nenhuma dependência de banco/ORM/HTTP de dados (só `gsap`, `lenis`, `three`).
- `src/`, `index.html`, `vite.config.js`: zero ocorrência de `fetch(`, `axios`, `mongo`, `mysql`, `pdo`, connection string. Único `process.env` lido: `WHATSAPP_NUMBER` (`src/lib/content.js:1,4`).
- Catálogo é constante em `src/lib/content.js:8-45`.
- Confirmado na prática: `npm ci`, 133 testes verdes e `vite` dev server subiram sem nenhuma configuração externa (sem `.env`); ver `screenshots/lauressucrier/README.md`.

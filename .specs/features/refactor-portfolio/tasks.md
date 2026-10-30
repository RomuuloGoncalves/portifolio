# Refatoração do Portfólio — Tarefas

## Execution Protocol (MANDATORY -- do not skip)

Implemente estas tarefas com a skill `tlc-spec-driven`: **ative pelo nome e siga o fluxo Execute e as Critical Rules.** Se a skill não puder ser ativada, PARE e avise o usuário.

**Regras globais para todo executor:** nunca acessar banco de dados (nenhum projeto, nenhum ambiente, nenhum meio); sem `git push` nem deploy sem pedido explícito do usuário; código do site só na branch `production`, nunca em `master`.

---

**Spec**: `.specs/features/refactor-portfolio/spec.md`
**Design**: `.specs/features/refactor-portfolio/design.md`
**Conteúdo**: `.specs/features/refactor-portfolio/content.md`
**Protótipo aprovado**: `.specs/features/refactor-portfolio/prototype-c/`
**Status**: Draft rev. 2 (direção C aprovada; Fase 1 aguarda aprovação da spec e de D-01)

---

## Test Coverage Matrix

| Camada | Ferramenta no repo | Onde | Usada em |
| --- | --- | --- | --- |
| Dados (estrutura, links, palavras proibidas, imagens existem) | vitest + jsdom (já instalado) | `tests/unit/portfolio.spec.ts` | T6, T7, T8 |
| Componente (renderiza `portfolio.ts`, tema, ficha, pipeline) | vitest + `@vue/test-utils` | `tests/unit/HomePage.spec.ts` | T9, T10, T11, T12 |
| Build/tipos | `vue-tsc` + vite | `npm run build` | todas da Fase 1+ |
| Documentos, protótipo, prints, deploy (T1–T5, T14) | none | — | T1, T2, T3, T4, T5, T14 |
| Visual, parallax, reduced-motion, a11y, Lighthouse | manual + Lighthouse CLI (`npx lighthouse`) | checklist em T13 | T13 |

Obs.: `tests/unit/example.spec.ts` já está quebrado hoje (espera "Ready to create an app?", texto do template Ionic). T6 substitui esse teste.

## Gate Check Commands

- **quick**: `npx vitest run`
- **build**: `npx vitest run && npm run build && VITE_BASE=/ npm run build`
- **full**: build + checklist manual de T13

---

## Execution Plan

### Phase 0: Planejamento, protótipo e prints

```
T1 → T2
T3 → T4
T5
```

### Phase 1: Base na branch production (após aprovação da spec e de D-01)

```
T6 → T7 → T8
```

### Phase 2: Interface do protótipo C

```
T9 → T10 → T11 → T12
```

### Phase 3: Verificação e deploy

```
T13 → T14
```

---

## Task Breakdown

### T1: Consolidar pesquisa em conteúdo final

**What**: `content.md` rev. 2 com textos do protótipo C, ajustes de texto do review-c e ficha SYSTEM_INFO.
**Where**: `.specs/features/refactor-portfolio/content.md`
**Depends on**: None
**Reuses**: `research/*.md`, `prototype-c/index.html`
**Requirement**: PROJ-01, PROJ-03, CERT-01, COPY-01, COPY-02

**Done when**:

- [x] Cada projeto tem nome, descrição ≤ 220 caracteres, stack, ano e link
- [x] Certificados marcados como confirmado ou `[CONFIRMAR]`
- [x] Nenhum termo da lista proibida no texto

**Tests**: none (documento)
**Gate**: revisão manual

---

### T2: Aplicar review-c e a ficha SYSTEM_INFO no protótipo C

**What**: Atualizar o protótipo aprovado para servir de guia fiel: (1) trocar os diagramas de caixinhas por árvore de pastas (Liftech), bloco requisição/JSON (projetoAGX) e card só texto (demais), e tirar `grid-row: span 2`/`min-height: 360px` do lead; (2) terminal com `--bg-elevated` e texto escuro no tema claro, fonte 0.8125rem, `aspect-ratio: auto`; (3) remover `.others__thumb--empty` e `<code></code>` vazios; (4) remover `.navbar-scroll-progress` e o JS dela; (5) etapa ativa do pipeline com borda de acento + `--accent-soft`; (6) textos de `content.md` rev. 2 (subtítulo de projetos, títulos dos princípios, "Contato", sem tags na AGX); (7) padding por seção (Sobre ~80 px, Projetos ~128 px, Contato menor); (8) ficha SYSTEM_INFO abaixo da foto conforme `design.md`, sem STATUS até D-12. **Não** mexer em marcas d'água, quadriculado nem marquee (D-11).
**Where**: `.specs/features/refactor-portfolio/prototype-c/index.html` (+ `style.css`, `main.js` do mesmo protótipo)
**Depends on**: T1
**Reuses**: `prototype-b/index.html:71-78` (ficha), `research/review-c.md` itens 1, 2, 4, 6, 9, 11–14
**Requirement**: PROTO-01, PROTO-02, PROTO-03, COPY-04, COPY-05, VIS-08, VIS-09, VIS-10, PIPE-03, HERO-02

**Done when**:

- [ ] Abre sem build; nenhum `.navbar-scroll-progress`, `.shot--diagram`, `others__thumb--empty` ou `<code></code>` no HTML
- [ ] Ficha SYSTEM_INFO visível em 1440 px (abaixo da foto) e em 375 px (empilhada, sem rolagem horizontal), escuro e claro
- [ ] Marcas d'água, quadriculado e marquee continuam iguais
- [ ] Com `prefers-reduced-motion: reduce` nada se move

**Tests**: none (protótipo)
**Gate**: abrir no navegador em 1440 e 375 px, nos dois temas

---

### T3: Classificar projetos: roda sem banco ou precisa de banco

**What**: Para Liftech, projetoAGX, Moni, soloTrack, ONGFlow e lauressucrier, ler (só leitura, via `gh api`/`gh repo view` ou clone raso sem instalar nem executar) README, `package.json`/`composer.json`, `docker-compose*`, `.env.example` e o ponto de entrada do app/servidor, e classificar: **roda sem banco** (front estático ou app que sobe e renderiza telas sem conexão de banco), **precisa de banco** (conecta no boot, ou as telas úteis dependem de dados do banco) ou **indefinido**. Registrar evidência `arquivo:linha`, comando para subir sem banco (se houver) e que tela dá para printar.
**Where**: `.specs/features/refactor-portfolio/screenshots.md`
**Depends on**: None
**Reuses**: `research/github-projetos.md`
**Requirement**: SHOT-01, SHOT-02

**Done when**:

- [ ] Tabela com os 6 projetos: classificação, evidência `arquivo:linha`, comando de subida (só para "roda sem banco"), tela-alvo
- [ ] Nenhum `.env` real lido, nenhuma string de conexão copiada, nenhum app executado nesta tarefa
- [ ] Lista do que o usuário precisa mandar (prints de projetos "precisa de banco"/"indefinido") e pergunta D-13 registrada

**Tests**: none (documento)
**Gate**: revisão manual do usuário

---

### T4: Capturar prints com checklist anti-vazamento

**What**: Só para projetos "roda sem banco" de T3: subir localmente com env fictício, capturar a tela-alvo em 1440×900 só do viewport (sem barra de endereço nem devtools) e passar no checklist abaixo. Projetos "precisa de banco"/"indefinido": receber o print do usuário (passa pelo mesmo checklist) ou marcar "sem imagem" (PROJ-04).
**Where**: `.specs/features/refactor-portfolio/screenshots/` (PNG originais, fora de `src/` até aprovação)
**Depends on**: T3
**Reuses**: comandos de subida de `screenshots.md`
**Requirement**: SHOT-02, SHOT-03, SHOT-04

Checklist anti-vazamento (cada print, registrado em `screenshots.md`):

- [ ] Nenhum `DATABASE_URL`/`MONGODB_URI`/string de conexão definida; app parou se tentou conectar (SHOT-04)
- [ ] Sem token, JWT, chave de API, cookie ou header `Authorization` visível
- [ ] Sem e-mail, nome, CPF, telefone ou endereço real (só dados fictícios digitados na tela ou fixtures do próprio front)
- [ ] Sem URL interna, IP, porta, `localhost`, domínio de HML/cliente, caminho de arquivo local ou nome de usuário do SO
- [ ] Sem barra de endereço, abas, devtools, notificações ou extensões
- [ ] Sem logo/marca de cliente (lauressucrier: conferir com o usuário)
- [ ] Metadados removidos (`exiftool -all= arquivo` ou reexportar) e nome do arquivo neutro (`liftech.png`)
- [ ] Aprovado pelo usuário antes de qualquer commit

**Done when**:

- [ ] Cada um dos 6 projetos com status "print aprovado", "print do usuário pendente" ou "sem imagem"
- [ ] Checklist preenchido por print

**Tests**: none (captura manual)
**Gate**: aprovação do usuário

---

### T5: Analisar a arquitetura de cada projeto (base do Pipeline Inspector)

**What**: Para Liftech, projetoAGX, Moni, soloTrack e, se tiverem back-end, ONGFlow e lauressucrier, analisar um por um e só por leitura (`gh api`/`gh repo view` ou clone raso sem instalar nem executar): árvore de pastas, ponto de entrada, camadas reais, middlewares e autenticação, persistência (só o código do modelo/repositório, sem conectar), testes e um caso de uso principal rastreado do endpoint até a resposta, com `repo/arquivo:linha`. Depois, derivar de cada análise as etapas da aba do projeto (nomes, quantidade e trechos reais), descartando o rascunho de `prototype-c/main.js` onde não bater. Projeto sem fluxo de back-end analisável sai da seção, com justificativa.
**Where**: `.specs/features/refactor-portfolio/pipeline.md` (uma seção por projeto: estrutura, camadas, fluxo rastreado, decisões visíveis no código, etapas propostas, `[CONFIRMAR]`)
**Depends on**: None
**Reuses**: `research/github-projetos.md`, cenários de `prototype-c/main.js` (só como formato)
**Requirement**: PIPE-04, PIPE-05, PIPE-06, PIPE-07, PIPE-08

**Done when**:

- [ ] Uma seção por projeto analisado, com árvore de pastas, camadas reais e fluxo de um caso de uso rastreado com `repo/arquivo:linha` em cada passo
- [ ] Etapas propostas por projeto derivadas da análise (sem forçar modelo único); toda etapa com origem `repo/arquivo:linha` ou `[CONFIRMAR]`
- [ ] Projetos sem fluxo de back-end analisável listados como fora da seção, com o motivo
- [ ] Nenhum `.env` lido, nenhuma string de conexão copiada, nenhum app executado, nenhum banco acessado
- [ ] Nenhum número/métrica sem fonte; lista final de abas para aprovação do usuário

**Tests**: none (documento)
**Gate**: revisão manual do usuário

---

### T6: Base limpa na branch production: dados tipados + metadados + teste

**What**: Em `production`, criar `src/data/portfolio.ts` (tipos + conteúdo de `content.md`), corrigir `<title>` ("Rômulo Gonçalves · Desenvolvedor back-end", hoje diz "Full Stack"), description, OG e viewport em `index.html`, e trocar `example.spec.ts` por `portfolio.spec.ts`.
**Where**: `src/data/portfolio.ts`
**Depends on**: None (Fase 0 concluída e spec + D-01 aprovados)
**Reuses**: arrays `projetosDestaque`, `outrosProjetos`, `categorias`, `linksContato` de `src/views/HomePage.vue`; `vite.config.ts` com `VITE_BASE` (commit `51835fb`)
**Requirement**: DADOS-01, DADOS-02, DADOS-03, A11Y-02, DEPLOY-01, DEPLOY-03

**Done when**:

- [ ] `git branch --show-current` = `production`
- [ ] Teste: todo projeto tem os campos de DADOS-03 e descrição ≤ 220 caracteres
- [ ] Teste: cargo de `portfolio.ts` aparece em `index.html` e "Full Stack" não aparece
- [ ] Teste: `index.html` não contém `user-scalable=no`
- [ ] Build sem `VITE_BASE` gera `/portifolio/`; com `VITE_BASE=/` gera `/`
- [ ] Gate passa

**Tests**: unit
**Gate**: build

---

### T7: Regras de conteúdo como teste

**What**: Testes que travam STACK-01, STACK-03, COPY-02..05, CERT-02 e PROJ-04 sobre `portfolio.ts`.
**Where**: `tests/unit/portfolio.spec.ts`
**Depends on**: T6
**Reuses**: lista proibida de `content.md`
**Requirement**: STACK-01, STACK-03, COPY-02, COPY-03, COPY-04, COPY-05, CERT-02, PROJ-04

**Done when**:

- [ ] Teste falha se tirar "MongoDB" da stack, se um texto contiver "apaixonado" ou "vamos conversar"
- [ ] Teste: entrada de histórico com > 3 itens falha; entrada atual com tags falha
- [ ] Teste: certificado sem ID/URL não tem campo de credencial vazio (`''`)
- [ ] Gate passa

**Tests**: unit
**Gate**: quick

---

### T8: Ícones e imagens (foto + prints)

**What**: Sprite Simple Icons local com as tecnologias do marquee/matriz; apagar SVGs sem uso (GIMP, Photoshop etc.); converter `prototype-c/foto-perfil.jpg` para AVIF/WebP 600/1200 px e os prints aprovados em T4 para WebP; converter `calculadoraLexica.png`.
**Where**: `src/assets/img/`
**Depends on**: T7
**Reuses**: pasta `src/assets/img/habilidades/`, sprite de `prototype-c/index.html`, prints de T4
**Requirement**: STACK-02, STACK-03, PERF-02, HERO-01

**Done when**:

- [ ] Teste: todo `icone`/`imagem` referenciado em `portfolio.ts` existe no disco
- [ ] Nenhum SVG/imagem órfão; só prints aprovados entram
- [ ] Gate passa

**Tests**: unit
**Gate**: build

---

### T9: Casco, header, hero e ficha no visual C

**What**: Tokens e fontes do C (Geist self-hosted), `palette.css` central com Preto frio + Pinho ativos e Carvão/Sálvia comentados, cores do código por tipo (`--c-*`), tema (TEMA-01/02), quadriculado de fundo, marcas d'água `NN_NOME`, header com logo sem ".sys" e `GET /rota` + `popover`, sem barra de progresso, hero com foto e ficha SYSTEM_INFO (`<dl>`, STATUS só com D-12), padding por seção. Se D-01 = remover Ionic: tirar `@ionic/*`, `@capacitor/*`, `capacitor.config.ts`, `ionic.config.json` e o router.
**Where**: `src/views/HomePage.vue` (ou componentes por seção se passar de ~400 linhas)
**Depends on**: None (Fase 1 concluída)
**Reuses**: `prototype-c/` (HTML/CSS/JS, já com T2), `design.md`
**Requirement**: DADOS-01, VIS-01, VIS-11, VIS-12, VIS-05, VIS-06, VIS-07, VIS-08, VIS-09, NAV-01, NAV-02, HERO-02, TEMA-01, TEMA-02, A11Y-01, A11Y-03

**Done when**:

- [ ] Teste: alternar tema grava `light`/`dark` e remontar restaura os dois
- [ ] Teste: ficha renderiza um `<dl>` com DEV, PRIMARY_STACK, SECONDARY, LOCATION; STATUS ausente quando `status` vazio
- [ ] Teste: nenhum arquivo além de `palette.css` contém cor hexadecimal de fundo, acento ou código (varredura por regex)
- [ ] Teste: `highlight()` gera classes distintas para keyword, string, número, função, tipo, propriedade e comentário
- [ ] Teste: header não contém ".sys" nem `.navbar-scroll-progress`
- [ ] Gate passa

**Tests**: unit
**Gate**: build

---

### T10: Seções Sobre, Histórico, Projetos, Stack, Certificados e Contato

**What**: Portar as seções do C lendo `portfolio.ts`: princípios, changelog, cards de projeto com print/representação de texto (sem caixinhas), `.others` sem miniatura vazia, marquee + matriz, certificados sem `<code>` vazio, contato com copiar; terminal claro em `--bg-elevated`.
**Where**: `src/views/HomePage.vue`
**Depends on**: T9
**Reuses**: `prototype-c/index.html` seções 01–06
**Requirement**: PROJ-01, PROJ-02, PROJ-04, CERT-01, CERT-02, HOME-01, VIS-10

**Done when**:

- [ ] Teste: monta a página e encontra o nome de cada projeto e certificado de `portfolio.ts`
- [ ] Teste: projeto sem imagem não renderiza `img`/miniatura; certificados vazios → seção ausente
- [ ] Teste: cópia duplicada do marquee tem `aria-hidden="true"`
- [ ] Gate passa

**Tests**: unit
**Gate**: build

---

### T11: Pipeline Inspector

**What**: Portar abas por cenário, etapas, painel e acordeão < 1024 px de `prototype-c/main.js`, com uma aba por projeto aprovado em T5 e dados de `portfolio.ts` (etapas e trechos vindos de `pipeline.md`) e etapa ativa no estilo de PIPE-03.
**Where**: `src/components/PipelineInspector.vue`
**Depends on**: T10
**Reuses**: `prototype-c/main.js` (cenários, `matchMedia('(max-width: 1023px)')`), `pipeline.md`
**Requirement**: PIPE-01, PIPE-02, PIPE-03, PIPE-06, PIPE-07

**Done when**:

- [ ] Teste: seta direita troca de aba e move o foco; `aria-selected` acompanha
- [ ] Teste: com `matchMedia` < 1024 px, clicar numa etapa alterna `aria-expanded` e o detalhe fica dentro dela
- [ ] Gate passa

**Tests**: unit
**Gate**: build

---

### T12: Parallax, marquee e reduced-motion

**What**: Portar o parallax do C (CSS `animation-timeline: view()` + fallback JS com rAF) para quadriculado, marcas d'água e foto; pausa do marquee; bloqueio por `prefers-reduced-motion`.
**Where**: `src/theme/motion.css`
**Depends on**: T11
**Reuses**: bloco de motion de `prototype-c/style.css` e `prototype-c/main.js`
**Requirement**: VIS-02, VIS-03, VIS-04, HOME-01

**Done when**:

- [ ] Teste: com `matchMedia('(prefers-reduced-motion: reduce)')` = true, o fallback JS não registra listener de scroll
- [ ] Verificação manual em Chrome e Firefox
- [ ] Gate passa

**Tests**: unit
**Gate**: build

---

### T13: Verificação final

**What**: Lighthouse mobile, contraste (incluindo marcas d'água sobre `h2` e terminal no claro), teclado (popover, abas, acordeão), 360/1920 px, links (curl em todos os URLs de `portfolio.ts`), conferência de que nenhum print vazou dado.
**Where**: `.specs/features/refactor-portfolio/validation.md`
**Depends on**: None (Fase 2 concluída)
**Requirement**: PERF-01, PERF-02, A11Y-01, A11Y-03, VIS-05, DADOS-03

**Done when**:

- [ ] Performance ≥ 90, Acessibilidade ≥ 95
- [ ] 0 links fora de HTTP 200
- [ ] `validation.md` com veredito PASS e evidência `arquivo:linha`

**Tests**: e2e manual
**Gate**: full

---

### T14: Deploy na Vercel (só com pedido do usuário)

**What**: Com autorização explícita, publicar `production` pela Vercel CLI no projeto `portifolio` (`vercel deploy --prod`, `vercel.json` já define `VITE_BASE=/`) e conferir https://portifolio-chi-peach-73.vercel.app. `master` e GitHub Pages ficam intactos (D-15).
**Where**: `vercel.json`
**Depends on**: T13
**Reuses**: commit `51835fb`
**Requirement**: DEPLOY-01, DEPLOY-02

**Done when**:

- [ ] Usuário autorizou o deploy nesta sessão
- [ ] URL da Vercel responde 200 e mostra o site novo; GitHub Pages ainda mostra o antigo
- [ ] Nenhum commit novo em `master`

**Tests**: none (deploy)
**Gate**: curl na URL de produção

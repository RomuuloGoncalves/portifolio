# Refatoração do Portfólio — Especificação

> Status: rascunho para aprovação (rev. 2, 2026-10-29). Direção visual **aprovada: protótipo C** (`prototype-c/`). O site novo é construído na branch `v3`; `homologacao` recebe os deploys de teste; `v2` guarda o backup do site antigo; `master` continua servindo o site antigo até a troca (D-15). Nenhuma linha do código do site é tocada antes da aprovação desta spec e de D-01.

## Problem Statement

O portfólio em `src/views/HomePage.vue` (1.743 linhas, dados e estilo no mesmo arquivo) está desatualizado e com cara de template gerado. A seção de habilidades não tem as tecnologias do trabalho atual (Node.js, MongoDB aparecem só como tag na experiência), faltam projetos recentes do GitHub, não há certificados, e o texto usa frases genéricas ("apaixonado por criar soluções que transformam", "produtos de alto impacto", contadores "10+ / 15+"). O visual (orbs desfocados, glassmorphism, gradiente roxo, bloco de código `sobre-mim.ts`) é o padrão mais comum de portfólio gerado por IA. O `<title>` em `index.html:6` ainda diz "Desenvolvedor Full Stack", mas o perfil agora é Back-end.

## Goals

- [ ] Mostrar os projetos do GitHub `RomuuloGoncalves` que valem a pena, com dados verificados (nome, descrição, stack, link, ano) e print real quando der para tirar sem vazar dados e sem banco.
- [ ] Listar os certificados do LinkedIn (ex.: MongoDB) com emissor, data e link de credencial.
- [ ] Trocar a seção de habilidades por uma lista atual e honesta, com ícones atualizados (Node.js, TypeScript, MongoDB etc.).
- [ ] Reproduzir o visual do protótipo C (Geist, preto frio, acento pinho, `GET /rota`, Pipeline Inspector) com os ajustes aprovados de `research/review-c.md`.
- [ ] Texto em primeira pessoa, específico e verificável, sem clichês.
- [ ] Publicar o site novo na Vercel (projeto `portifolio`): `homologacao` gera preview automático a cada push, e a produção segue a `master` só quando o usuário trocar o site.

## Out of Scope

| Item | Motivo |
| --- | --- |
| Acessar banco de dados de qualquer projeto (dev, HML, produção) | Regra global do usuário: nunca, por nenhum meio. Print que dependa de banco vem do usuário ou fica sem imagem |
| Buscar repositórios/certificados em tempo de execução (API GitHub/LinkedIn) | LinkedIn não tem API pública; GitHub limita 60 req/h sem token. Dados estáticos bastam |
| CMS, painel admin, blog | Ninguém pediu; conteúdo muda poucas vezes por ano |
| Internacionalização (EN) | Não pedido (D-05) |
| Alterar `master`, `.github/workflows/deploy.yml` ou o GitHub Pages | `master` mantém o site antigo até D-15 |
| `git push` ou deploy sem pedido explícito do usuário | Ação externa; o usuário autoriza a cada vez |
| App nativo (Capacitor Android/iOS) | O portfólio é web; Capacitor é herança do template Ionic |
| Remover marcas d'água, quadriculado e marquee | Decisão do usuário (D-11), contra `review-c.md` itens 3, 5 e 7 |

---

## Assumptions & Open Questions

| # | Premissa / decisão | Padrão escolhido | Justificativa | Confirmado? |
| --- | --- | --- | --- | --- |
| D-01 | Manter Ionic ou migrar para Vue + Vite puro | **ABERTA.** Recomendo remover Ionic (Vue 3 + Vite). Se o usuário mantiver, T9 muda só no casco (`ion-content` vira o elemento de scroll para parallax, rota e âncoras) | Página única de rolagem; `ion-content` rola dentro de shadow DOM, o que quebra `animation-timeline: scroll(root)`, âncoras nativas e o observer que atualiza `GET /rota` | n |
| D-02 | Biblioteca de parallax | CSS nativo (`animation-timeline: view()`) + fallback JS curto com `requestAnimationFrame`; sem GSAP | Plataforma antes de dependência; o protótipo C já faz assim | n |
| D-03 | Fonte dos ícones de tecnologia | Sprite SVG local com Simple Icons (como o protótipo C), sem pacote npm | Zero dependência; um `<symbol>` por tecnologia serve marquee e matriz | n |
| D-04 | Origem dos certificados | Lista estática de `content.md`; URLs de credencial MongoDB/Docker o usuário confirma | LinkedIn bloqueia scraping sem login | n |
| D-05 | Idioma | Só português; rótulos da ficha SYSTEM_INFO ficam em inglês, como no protótipo B que o usuário aprovou | Público-alvo brasileiro | n |
| D-06 | Tema claro/escuro | Mantém os dois, `prefers-color-scheme` por padrão e escolha salva | Toggle atual tem bug (TEMA-02) | n |
| D-07 | Contadores "2+ anos / 10+ projetos / 15+ tecnologias" | Remover | Números vagos são sinal forte de "cara de IA" | n |
| D-08 | Direção visual | **Protótipo C** (Geist/Geist Mono, fundo Preto frio, acento Pinho `#2FA586` escuro / `#1A6B55` claro; ver D-17). Design A como base fica descartado | Aprovado pelo usuário | y |
| D-09 | Instagram no contato | Remover | E-mail, LinkedIn, GitHub e currículo bastam | n |
| D-10 | Repositórios incluídos/excluídos | dois repositórios privados ficam fora; `lauressucrier` (privado) entra sem link de repo | Decisão do usuário | y |
| D-11 | Marcas d'água `NN_NOME`, quadriculado de fundo e marquee de logos | Ficam, com parallax e reduced-motion | Decisão do usuário | y |
| D-12 | Texto do STATUS na ficha SYSTEM_INFO | **ABERTA [CONFIRMAR].** Padrão: omitir a linha STATUS até o usuário aprovar um texto verdadeiro ("Aberto a conversar" só com OK dele; hoje está empregado na AGX) | STATUS falso é pior que ausente | n |
| D-13 | Print a partir do deploy público (Vercel/GitHub Pages) dos projetos | **ABERTA.** Padrão: não; print só do app rodando local sem banco, ou enviado pelo usuário | Deploy público lê o banco real do projeto e pode mostrar dados reais | n |
| D-14 | Trechos de código do Pipeline Inspector | Conferir contra o código real dos repos (só leitura) e marcar `[CONFIRMAR]` o que não bater | Evita repetir o erro do Design B (métricas inventadas) | n |
| D-15 | Quando o site novo substitui o antigo | **ABERTA.** Padrão: o site novo vive em `v3` → `homologacao` até o usuário pedir a troca; ao trocar, `v3` entra na `master` e a Vercel de produção (que segue a `master`) atualiza sozinha; `master` + GitHub Pages ficam intactos até lá | Troca é ação externa | n |
| D-16 | URL pública do currículo e demo do lauressucrier | `[CONFIRMAR]` com o usuário | Repo privado; não inventar URL | n |
| D-17 | Paleta | Fundo **Preto frio** (`#0A0B0D`) + acento **Pinho** (`#2FA586` / `#1A6B55`), centralizados em `palette.css`; Carvão e Sálvia ficam comentados como alternativas | Escolhido pelo usuário no protótipo D | y |
| D-18 | Seção "Anatomia de uma requisição" | Nasce da análise real de cada projeto (T5), projeto a projeto, como a seção de Projetos; os cenários do protótipo C (projetoAGX e Liftech) são rascunho e podem mudar de etapas, nomes e quantidade | Pedido do usuário: sem a análise a seção perde o sentido | y |

**Open questions (perguntas em aberto):** D-01 (Ionic), D-12 (STATUS), D-13 (print do deploy), D-15 (troca de site), D-16 (URLs) e os `[CONFIRMAR]` de `content.md`. As demais têm padrão e seguem se o usuário não objetar.

---

## User Stories

### P1: Conteúdo verdadeiro e atualizado ⭐ MVP

**História:** Como recrutador, quero ver o que o Rômulo fez de verdade (empresas, projetos, certificados, stack) para decidir em menos de um minuto se chamo para entrevista.

**Critérios de aceite:**

1. **DADOS-01** O site SHALL ler todo o conteúdo (perfil, ficha, histórico, pipeline, projetos, certificados, stack, links) de um único arquivo `src/data/portfolio.ts`, e nenhum texto de conteúdo SHALL ficar no template dos componentes. <!-- ubiquitous -->
2. **DADOS-02** O cargo SHALL ser "Desenvolvedor back-end" igual em `<title>`, meta description, Open Graph e hero; a string "Full Stack" SHALL NOT aparecer em `index.html`. <!-- ubiquitous -->
3. **DADOS-03** Cada projeto SHALL ter `nome`, `descricao` (1–2 frases, máx. 220 caracteres), `stack`, `ano`, e todo link presente (`repo` ou `demo`) SHALL responder HTTP 200 na revisão; projeto privado (D-10) SHALL ter `privado: true` e nenhum link de repo. <!-- ubiquitous -->
4. **PROJ-01** A seção de projetos SHALL exibir 5 projetos em destaque (Liftech, projetoAGX, Moni, soloTrack, ONGFlow), cada um com print aprovado (SHOT-03) ou, sem print, a representação de texto de `design.md` (árvore de pastas, resposta JSON ou só texto), nunca o diagrama de caixinhas. <!-- ubiquitous -->
5. **PROJ-02** O site SHALL mostrar os demais projetos curados (incluindo lauressucrier) como lista compacta: miniatura opcional, nome, uma linha, stack, link. <!-- ubiquitous -->
6. **PROJ-03** IF um projeto não tiver README nem demo THEN ele SHALL ficar fora da lista. <!-- unwanted-behavior -->
7. **PROJ-04** IF um projeto não tiver imagem THEN o site SHALL NOT renderizar caixa vazia, tracejada ou com texto de placeholder; a linha/cartão SHALL ocupar a largura sem a coluna da imagem. <!-- unwanted-behavior -->
8. **CERT-01** O site SHALL ter uma seção de certificados com `nome`, `emissor`, `mês/ano` e link de credencial para cada item confirmado de `content.md`. <!-- ubiquitous -->
9. **CERT-02** IF um certificado não tiver URL nem ID de credencial THEN o site SHALL exibi-lo sem link e SHALL NOT renderizar elemento vazio (`<code></code>`, botão quebrado). <!-- unwanted-behavior -->
10. **STACK-01** A seção de stack SHALL incluir ao menos Node.js, TypeScript, MongoDB, PHP, Laravel, MySQL, Git e Docker, agrupadas na matriz do protótipo C por área (Back-end, Persistência, Infra e qualidade, Interface). <!-- ubiquitous -->
11. **STACK-02** Cada ícone de tecnologia SHALL ser SVG local (Simple Icons, D-03) com nome acessível igual ao nome da tecnologia. <!-- ubiquitous -->
12. **STACK-03** Tecnologias sem uso comprovado em experiência ou projeto (ex.: GIMP, Photoshop) SHALL sair da lista. <!-- ubiquitous -->

**Teste independente:** abrir o site, conferir que todo link abre, que Node/TS/MongoDB aparecem com ícone e que `grep` por texto de conteúdo nos `.vue` não acha nada.

### P1: Prints dos projetos sem vazamento ⭐ MVP

**História:** Como dono do portfólio, quero prints reais dos projetos sem expor tokens, e-mails, URLs internas ou dados reais, e sem que ninguém acesse banco de dados.

1. **SHOT-01** Antes de qualquer captura, cada projeto (Liftech, projetoAGX, Moni, soloTrack, ONGFlow, lauressucrier) SHALL estar classificado em `screenshots.md` como "roda sem banco", "precisa de banco" ou "indefinido", com evidência `arquivo:linha` tirada só de leitura de README e código. <!-- ubiquitous -->
2. **SHOT-02** IF um projeto for "precisa de banco" ou "indefinido" THEN o app SHALL NOT ser executado; o print SHALL vir do usuário ou o projeto SHALL usar a representação sem imagem (PROJ-04). <!-- unwanted-behavior -->
3. **SHOT-03** Todo print SHALL passar no checklist anti-vazamento de `screenshots.md` (sem token, chave, e-mail, nome/CPF real, URL interna, barra de endereço, devtools, `.env`, metadados EXIF) e SHALL ser aprovado pelo usuário antes do commit. <!-- ubiquitous -->
4. **SHOT-04** WHEN um app for executado para print THEN ele SHALL rodar com variáveis de ambiente fictícias e sem string de conexão de banco; IF o app tentar conectar em banco ou falhar por falta dele THEN a captura SHALL parar e o projeto SHALL ser reclassificado como "precisa de banco". <!-- event-driven -->

### P1: Texto humano ⭐ MVP

1. **COPY-01** Todo texto SHALL estar em primeira pessoa, em português, com frases que citem fatos concretos (empresa, sistema, número real) em vez de adjetivos. <!-- ubiquitous -->
2. **COPY-02** O texto SHALL NOT conter nenhum termo da lista proibida de `content.md`. <!-- ubiquitous; checável por grep -->
3. **COPY-03** O hero SHALL ter no máximo 2 frases abaixo do nome. <!-- ubiquitous -->
4. **COPY-04** Cada entrada do histórico SHALL ter no máximo 3 itens; a entrada do emprego atual SHALL NOT repetir em tags as tecnologias já citadas no texto. <!-- ubiquitous -->
5. **COPY-05** Os textos de seção SHALL seguir `content.md` rev. 2: subtítulo de Projetos factual, títulos de princípios como fatos curtos, título de Contato "Contato" (sem "Vamos conversar"). <!-- ubiquitous -->

**Teste independente:** `grep -iE` da lista proibida no `portfolio.ts` retorna zero linhas; leitura em voz alta pelo usuário.

### P1: Visual do protótipo C ⭐ MVP

1. **VIS-01** O site SHALL usar os tokens do protótipo C (`prototype-c/style.css`): Geist e Geist Mono self-hosted, fundo Preto frio (`#0A0B0D`), acento Pinho (`#2FA586` no escuro e `#1A6B55` no claro), sem gradiente, glow, glassmorphism nem orbs. <!-- ubiquitous -->
2. **VIS-02** WHILE o visitante rola a página, quadriculado de fundo, marcas d'água e foto SHALL se mover em velocidades diferentes do conteúdo (parallax). <!-- state-driven -->
3. **VIS-03** IF `prefers-reduced-motion: reduce` THEN o site SHALL desativar parallax, marquee e animações de entrada, mantendo todo o conteúdo visível. <!-- unwanted-behavior -->
4. **VIS-04** IF o navegador não suportar `animation-timeline` THEN o fallback JS SHALL produzir o deslocamento, ou o conteúdo SHALL ficar estático e legível. <!-- unwanted-behavior -->
5. **VIS-05** O layout SHALL funcionar sem rolagem horizontal de 360 px a 1920 px. <!-- ubiquitous -->
6. **VIS-06** Cada seção SHALL ter marca d'água mono `NN_NOME` (`01_SOBRE` … `06_CONTATO`) com `aria-hidden="true"`, sem reduzir o contraste do `h2` abaixo de 4.5:1. <!-- ubiquitous -->
7. **VIS-07** O fundo SHALL ter o quadriculado fixo (`.layer-grid`) com `aria-hidden="true"` e `pointer-events: none`. <!-- ubiquitous -->
8. **VIS-08** O header SHALL NOT ter barra de progresso de scroll. <!-- ubiquitous -->
9. **VIS-09** O espaçamento vertical SHALL variar por seção conforme `design.md` (Sobre compacto, Projetos amplo, Contato curto), não um padding único. <!-- ubiquitous -->
10. **VIS-10** IF o tema for claro THEN blocos de código/terminal SHALL usar fundo de superfície clara com texto escuro; o fundo quase preto SHALL valer só no tema escuro. <!-- unwanted-behavior -->
11. **VIS-11** Todas as cores de fundo, borda, acento e código SHALL ficar num único arquivo de paleta (`palette.css`, ou `src/theme/palette.css` no site final), e nenhum outro arquivo SHALL conter valor de cor hexadecimal ou `rgb()` de fundo, acento ou código. Esse arquivo SHALL manter as opções "Carvão" (fundo) e "Sálvia" (acento) como blocos comentados, trocáveis comentando um bloco e descomentando o outro. <!-- ubiquitous -->
12. **VIS-12** Os blocos de código SHALL colorir palavra-chave, string, número, função, tipo, propriedade e comentário com cores distintas, definidas como variáveis `--c-*` em `palette.css`, todas com contraste mínimo de 4,5:1 sobre `--bg-terminal`. <!-- ubiquitous -->

### P1: Navegação, hero e ficha ⭐ MVP

1. **NAV-01** O header SHALL mostrar a linha `GET /<rota>` com a seção visível e, WHEN clicada, SHALL abrir um `popover` nativo com as rotas das seções, fechável com Esc e operável por teclado. <!-- event-driven -->
2. **NAV-02** O logo do header SHALL ser "Rômulo Gonçalves" (abreviado "RG" em telas estreitas) e SHALL NOT conter o sufixo ".sys". <!-- ubiquitous -->
3. **HERO-01** O hero SHALL usar a foto `foto-perfil` (origem `prototype-c/foto-perfil.jpg`, 1200×1600) em AVIF/WebP com `srcset`, `width`/`height` e `fetchpriority="high"`. <!-- ubiquitous -->
4. **HERO-02** O hero SHALL ter, abaixo da foto, a ficha SYSTEM_INFO como `<dl>`, com legenda de imagem sem `//`, título `SYSTEM_INFO` e as linhas DEV, PRIMARY_STACK (Node.js / TS / MongoDB), SECONDARY (PHP / Laravel / MySQL), LOCATION (Sorocaba, SP · Brasil) e STATUS, no estilo do C (Geist Mono, sálvia, sem glow); WHEN a largura for < 768 px a ficha SHALL empilhar abaixo da foto sem rolagem horizontal; IF D-12 não estiver aprovado THEN a linha STATUS SHALL ser omitida. <!-- ubiquitous + event-driven -->
5. **HOME-01** O marquee de logos SHALL ter a lista duplicada com `aria-hidden="true"`, SHALL pausar em `:hover`/`:focus-within` e SHALL parar com VIS-03. <!-- ubiquitous -->

### P1: Pipeline Inspector ⭐ MVP

1. **PIPE-01** A seção "Anatomia de uma requisição" SHALL ter abas por projeto analisado (PIPE-07; cenário inicial: projetoAGX: empréstimo, Liftech: caso de uso) com `role="tablist"`, setas do teclado entre abas e etapas clicáveis que mostram código, descrição e tags. <!-- ubiquitous -->
2. **PIPE-02** WHEN a largura for < 1024 px THEN o detalhe da etapa SHALL abrir dentro da etapa ativa (acordeão), com `aria-expanded` correto. <!-- event-driven -->
3. **PIPE-03** A etapa ativa SHALL ser marcada com borda de acento e fundo `--accent-soft` (mesma linguagem das abas), não preenchimento sólido. <!-- ubiquitous -->
4. **PIPE-04** Cada trecho de código do pipeline SHALL corresponder a código existente no repo citado (D-14), sem métricas ou números inventados. <!-- ubiquitous -->
5. **PIPE-05** ANTES de desenhar etapas, cada projeto da seção SHALL ser analisado individualmente no código real (só leitura): estrutura de pastas, camadas, ponto de entrada, middlewares/autenticação, persistência, testes e o fluxo de pelo menos um caso de uso rastreado arquivo a arquivo, registrado em `pipeline.md` com `repo/arquivo:linha`. <!-- ubiquitous -->
6. **PIPE-06** As etapas, os nomes das camadas e a quantidade de etapas de cada aba SHALL refletir a arquitetura real do projeto correspondente, sem impor um modelo único (ex.: controller → service → repositório) a um projeto que não o tenha; o protótipo C é só rascunho de formato, não de conteúdo. <!-- ubiquitous -->
7. **PIPE-07** A seção SHALL ter uma aba para cada projeto em destaque cuja análise (PIPE-05) encontrar um fluxo de back-end rastreável; projeto sem back-end analisável SHALL ficar fora da seção, com a justificativa registrada em `pipeline.md`. <!-- state-driven -->
8. **PIPE-08** A análise SHALL NOT executar o projeto, ler `.env` real, copiar string de conexão ou acessar banco de dados; só leitura de arquivos do repo (regra global do usuário). <!-- ubiquitous -->

### P1: Tema e acessibilidade básica ⭐ MVP

1. **TEMA-01** WHEN não houver preferência salva THEN o site SHALL usar `prefers-color-scheme`. <!-- event-driven -->
2. **TEMA-02** WHEN o visitante troca o tema THEN a escolha SHALL ser salva em `localStorage` e restaurada no próximo carregamento, para claro e escuro. <!-- event-driven -->
3. **A11Y-01** O texto SHALL ter contraste mínimo 4.5:1 (AA) nos dois temas. <!-- ubiquitous -->
4. **A11Y-02** O `<meta viewport>` SHALL NOT bloquear zoom. <!-- ubiquitous -->
5. **A11Y-03** A navegação SHALL ser possível só com teclado, com foco visível em todos os links e botões. <!-- ubiquitous -->

### P2: Desempenho

1. **PERF-01** O Lighthouse mobile SHALL dar ≥ 90 em Performance e ≥ 95 em Acessibilidade na build de produção. <!-- ubiquitous -->
2. **PERF-02** Imagens (foto e prints) SHALL estar em WebP/AVIF com `width`/`height` e `loading="lazy"` abaixo da dobra. <!-- ubiquitous -->

### P2: Branch e deploy

1. **DEPLOY-01** O site novo SHALL ser construído só na branch `v3` (criada de `master`, já com o commit `base` via `VITE_BASE` + `vercel.json`); `master` SHALL NOT receber commits desta feature até a troca (D-15); `v2` SHALL ser o backup do site antigo. <!-- ubiquitous -->
2. **DEPLOY-02** WHEN houver push na branch `homologacao` THEN a Vercel (integração Git do projeto `portifolio`) SHALL gerar o deploy e o link da branch (`portifolio-git-homologacao-romuulogoncalves-projects.vercel.app`) SHALL passar a mostrar esse deploy, sem alias manual apontando para um deploy fixo. <!-- event-driven -->
3. **DEPLOY-03** A build sem `VITE_BASE` SHALL continuar gerando `base: '/portifolio/'` (GitHub Pages do `master` intacto), e a Vercel SHALL definir `VITE_BASE=/` pelo `vercel.json`. <!-- ubiquitous -->
4. **DEPLOY-04** WHEN o usuário pedir a troca (D-15) THEN `v3` SHALL entrar na `master` e a produção da Vercel (branch de produção `master`) SHALL atualizar a cada push, sem alias manual. <!-- event-driven -->

### P2: Protótipo guia (entregável da Fase 0)

1. **PROTO-01** O protótipo SHALL ser estático em `prototype-c/` (`index.html` + `style.css` + `main.js`, sem build) e abrir direto no navegador. <!-- ubiquitous -->
2. **PROTO-02** O protótipo SHALL conter todas as seções da página final com conteúdo real dos relatórios. <!-- ubiquitous -->
3. **PROTO-03** O protótipo SHALL demonstrar parallax e respeitar VIS-03. <!-- ubiquitous -->

---

## Edge Cases

- IF a lista de certificados vier vazia THEN a seção de certificados SHALL ficar oculta (sem título órfão).
- IF a imagem de um projeto falhar ao carregar THEN o cartão SHALL continuar legível só com texto.
- WHEN a largura for < 640 px THEN o parallax SHALL reduzir o deslocamento pela metade para não cobrir texto.
- IF o navegador não suportar `popover` THEN as seções SHALL continuar alcançáveis pelos links do header (`.nav__links`) e pela rolagem.

## Dimensões implícitas

| Dimensão | Tratamento |
| --- | --- |
| Validação de entrada | N/A: site estático, sem formulário (contato é `mailto:` + copiar) |
| Falha parcial / dependência externa | Links verificados (DADOS-03); imagens com fallback de texto |
| Segurança / vazamento | Prints com checklist SHOT-03; nenhum acesso a banco (SHOT-02/04) |
| Idempotência, concorrência, auth, rate limit | N/A: sem backend |
| Ciclo de vida dos dados | Conteúdo estático em `portfolio.ts` |
| Observabilidade | N/A: sem analytics pedidos |
| Integridade de estado | Tema (TEMA-01/02) |

## Requirement Traceability

| ID | História | Tarefas | Status |
| --- | --- | --- | --- |
| DADOS-01 | P1 Conteúdo | T6, T9 | Pending |
| DADOS-02 | P1 Conteúdo | T6 | Pending |
| DADOS-03 | P1 Conteúdo | T6, T13 | Pending |
| PROJ-01 | P1 Conteúdo | T1, T10 | Pending |
| PROJ-02 | P1 Conteúdo | T10 | Pending |
| PROJ-03 | P1 Conteúdo | T1 | Verified |
| PROJ-04 | P1 Conteúdo | T7, T10 | Pending |
| CERT-01 | P1 Conteúdo | T1, T10 | Pending |
| CERT-02 | P1 Conteúdo | T7, T10 | Pending |
| STACK-01 | P1 Conteúdo | T7 | Pending |
| STACK-02 | P1 Conteúdo | T8 | Pending |
| STACK-03 | P1 Conteúdo | T7, T8 | Pending |
| SHOT-01 | P1 Prints | T3 | Pending |
| SHOT-02 | P1 Prints | T3, T4 | Pending |
| SHOT-03 | P1 Prints | T4 | Pending |
| SHOT-04 | P1 Prints | T4 | Pending |
| COPY-01 | P1 Texto | T1 | Verified |
| COPY-02 | P1 Texto | T1, T7 | Pending |
| COPY-03 | P1 Texto | T7 | Pending |
| COPY-04 | P1 Texto | T2, T7 | Pending |
| COPY-05 | P1 Texto | T2, T7 | Pending |
| VIS-01 | P1 Visual | T9 | Pending |
| VIS-02 | P1 Visual | T12 | Pending |
| VIS-03 | P1 Visual | T12 | Pending |
| VIS-04 | P1 Visual | T12 | Pending |
| VIS-05 | P1 Visual | T9, T13 | Pending |
| VIS-06 | P1 Visual | T9 | Pending |
| VIS-07 | P1 Visual | T9 | Pending |
| VIS-08 | P1 Visual | T2, T9 | Pending |
| VIS-09 | P1 Visual | T2, T9 | Pending |
| VIS-10 | P1 Visual | T2, T10 | Pending |
| NAV-01 | P1 Navegação | T9 | Pending |
| NAV-02 | P1 Navegação | T9 | Pending |
| HERO-01 | P1 Navegação | T8 | Pending |
| HERO-02 | P1 Navegação | T2, T9 | Pending |
| HOME-01 | P1 Navegação | T10, T12 | Pending |
| PIPE-01 | P1 Pipeline | T11 | Pending |
| PIPE-02 | P1 Pipeline | T11 | Pending |
| PIPE-03 | P1 Pipeline | T2, T11 | Pending |
| PIPE-04 | P1 Pipeline | T5 | Pending |
| PIPE-05 | P1 Pipeline | T5 | Pending |
| PIPE-06 | P1 Pipeline | T5, T11 | Pending |
| PIPE-07 | P1 Pipeline | T5, T11 | Pending |
| PIPE-08 | P1 Pipeline | T5 | Pending |
| TEMA-01 | P1 Tema/a11y | T9 | Pending |
| TEMA-02 | P1 Tema/a11y | T9 | Pending |
| A11Y-01 | P1 Tema/a11y | T9, T13 | Pending |
| A11Y-02 | P1 Tema/a11y | T6 | Pending |
| A11Y-03 | P1 Tema/a11y | T9, T13 | Pending |
| PERF-01 | P2 Desempenho | T13 | Pending |
| PERF-02 | P2 Desempenho | T8, T13 | Pending |
| DEPLOY-01 | P2 Deploy | T6, T14 | Pending |
| DEPLOY-02 | P2 Deploy | T14 | Pending |
| DEPLOY-03 | P2 Deploy | T6 | Pending |
| DEPLOY-04 | P2 Deploy | T14 | Pending |
| PROTO-01 | P2 Protótipo | T2 | Verified |
| PROTO-02 | P2 Protótipo | T2 | Verified |
| PROTO-03 | P2 Protótipo | T2 | Verified |

**Coverage:** 53 total, 53 mapeados, 0 sem tarefa

## Success Criteria

- [ ] O usuário lê o site em voz alta e não acha nenhuma frase que "não diria".
- [ ] Todo link de projeto e certificado abre (0 links quebrados).
- [ ] Node.js, TypeScript e MongoDB aparecem com ícone na stack.
- [ ] Nenhum print com dado real; nenhum banco acessado.
- [ ] Lighthouse mobile ≥ 90 / ≥ 95 na URL da Vercel.

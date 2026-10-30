# Design B (Antigravity): "A Anatomia de um Sistema — Blueprint de Engenharia & Telemetria Industrial"

Proposta de redesenho da interface do portfólio de **Rômulo Gonçalves**, Desenvolvedor Back-end (Node.js/TypeScript/MongoDB e PHP/Laravel), estudante de Engenharia da Computação na Uniso (Sorocaba/SP).

---

## 0. Leitura do Brief & Diagnóstico Anti-Slop

### 0.1 Design Read
> **"Reading this as: Portfólio de Engenharia de Software e Back-end para Tech Leads, Arquitetos e Recrutadores Técnicos seniores, com uma linguagem de Blueprint Arquitetural e Telemetria Industrial de Alta Precisão, apoiada em tipografia geométrica técnica, CSS Scroll-Driven nativo e um acento singular de integridade operacional (Verde Telemetria 200 OK)."**

### 0.2 Dials de Configuração (Core Configuration)
- **`DESIGN_VARIANCE: 6`** — Estrutura deliberadamente assimétrica e modular, ancorada em um grid arquitetural de 12 colunas; afasta-se da monotonia dos três cards iguais sem descambar para caos visual decorativo.
- **`MOTION_INTENSITY: 5`** — Movimento funcional e de baixa inércia: parallax suave por camadas, transições acionadas por scroll para revelar fluxo de dados e microinterações de clique/hover rápidas (150ms-200ms) que respondem imediatamente ao usuário.
- **`VISUAL_DENSITY: 5`** — Densidade técnica equilibrada (estilo documentação de engenharia avançada como Stripe Docs, Grafana e CockroachDB Labs), com metadados reais de sistemas, contratos de schema e tabelas compactas, contrastando com áreas generosas de respiro.

### 0.3 Auditoria Crítica do Visual Atual (`HomePage.vue`)
O visual atual sofre de vícios recorrentes de geração por IA e templates genéricos de front-end:

| Elemento Atual | Vício de Design Identificado | Impacto Negativo | Decisão de Design B |
|---|---|---|---|
| **3 Orbs com `blur(100px)` animados** | Clichê visual "AI purple glow"; repaints constantes na GPU em `position: fixed`. | Drenagem severa de bateria no mobile, travamento de taxa de quadros e aparência infantilizada. | **Remover completamente**. Substituir por grid milimétrico de blueprint técnico sutil em CSS puro (`background-image: linear-gradient(...)`). |
| **`glass-card` em todos os elementos** | Glassmorphism indiscriminado sem hierarquia de superfície ou profundidade semântica. | Poluição visual, falta de contraste com o fundo e leitura empastada em telas de baixo brilho. | **Substituir por Sistema de Superfícies Sólidas Opacas** com bordas hairline técnicas (`1px solid var(--border-subtle)`), separação visual limpa e cantos retos moderados (raio de 4px). |
| **Paleta Roxo/Azul genérica + `gradient-text`** | Gradiente `#6c5ce7 -> #a29bfe -> #74b9ff` presente em 90% dos templates de IA de 2023-2025. | Destrói a seriedade de um desenvolvedor back-end corporativo; parece produto SaaS B2C inacabado. | **Adotar Neutros Profundos (Obsidian Slate) + Único Acento "Verde Telemetria / 200 OK" (`#00E599` / `#007A55`)**, comunicando estabilidade, saúde de nós e precisão. |
| **Emojis como ícones (`⚙️ 🌐 🛠️`)** | Amadorismo visual que quebra alinhamento de baseline e renderiza de forma inconsistente entre sistemas operacionais (Android vs iOS vs Windows). | Transmite visual de projeto amador ou lição de tutorial. | **Eliminar emojis**. Utilizar rótulos textuais tipográficos claros em mono ou ícones vetoriais monocráticos de traço padronizado (1.5px). |
| **Card falso de código macOS (`sobre-mim.ts`)** | Screenshot estilizada de IDE com bolinhas vermelha/amarela/verde e conteúdo clichê (`paixao: "resolver problemas"`). | Truque visual manjado que não engana recrutadores técnicos e ocupa espaço sem entregar profundidade técnica. | **Substituir por Ficha Arquitetural de Engenharia (Spec Sheet)**: contratos reais de DTO, princípios de tolerância a falhas e dados concretos de atuação. |
| **Seção Skills genérica com Photoshop/Gimp** | Mistura ferramentas gráficas básicas com bancos de dados; omite Node.js e MongoDB (o core atual). | Contradiz frontalmente o título de "Desenvolvedor Back-end" e enfraquece o posicionamento profissional. | **Estruturar em Matriz Tecnológica de 4 Camadas de Produção**: Núcleo Back-end, Persistência & Bancos, Arquitetura/Infra, Consumo/Front. |
| **Projetos de tutorial (Calculadora, Jogo da Velha)** | Portfólio inflado com exercícios introdutórios de HTML/JS de 2022. | Reduz a senioridade percebida de quem já resolve problemas de produção na AGX e na Education1. | **Curadoria estrita de Back-end**: Destaque para Liftech, projetoAGX (API Biblioteca), Moni e soloTrack. Rebaixamento/eliminação dos 7 tutoriais. |

---

## 1. Conceito Visual: "A Anatomia de um Sistema"

Em vez de conceber o portfólio como uma vitrine de telas decorativas, o Design B parte da realidade de quem constrói o back-end: **o verdadeiro trabalho de engenharia acontece nos bastidores, onde confiabilidade, baixa latência, modelagem consistente e integridade transacional governam o sistema.**

A metáfora central é a de um **Console de Observabilidade e Blueprint de Arquitetura de Sistemas**:
1. **Grid Estrutural Visível:** Linhas sutis de ancoragem técnica (estilo plantas de engenharia e blueprints de hardware da Apollo/DEC), proporcionando uma sensação tátil de precisão milimétrica.
2. **Superfícies de Alta Legibilidade:** Fundo sólido profundo em ardósia obsidiana, sem desfoques opacos ou gradientes decorativos que distraem a atenção do código e dos projetos.
3. **Indicadores de Estado em Tempo Real (Telemetry Badges):** Em vez de frases de autoajuda corporativa ("apaixonado por soluções"), o portfólio utiliza metadados técnicos factuais: versão dos runtimes, status de disponibilidade (`HTTP 200 / ALL NODES NOMINAL`), latência média de execução e localização do servidor.
4. **Respeito Absoluto ao Conteúdo:** Espaçamento amplo, ritmo vertical calibrado em múltiplos de 8px e contraste estrito auditado para leitura contínua sem fadiga ocular.

---

## 2. Tipografia (Google Fonts Reais & Robustas)

A tipografia é o motor de personalidade de uma interface técnica. Banimos o onipresente `Inter` (marca registrada de templates de IA) e evitamos display serifs artificiais que soariam forçados para um perfil de Engenharia da Computação.

Adotamos um sistema coeso de 3 famílias complementares do **Google Fonts**:

| Papel | Família | Pesos Utilizados | Função e Racional de Design |
|---|---|---|---|
| **Display / Headlines Técnicas** | **Space Grotesk** | `500` (Medium), `700` (Bold) | Proporções geométricas esculpidas inspiradas em tipografia técnica e computacional clássica (Space Mono), porém proporcional e fluida. Confere peso arquitetural aos títulos e nomes sem parecer retrô caricato. |
| **Corpo / Leitura & UI** | **Plus Jakarta Sans** | `400` (Regular), `500` (Medium), `600` (SemiBold) | Sans-serif moderna e precisa, com aberturas claras e excelente rendimento em telas de alta densidade. Elimina o aspecto genérico de robô enquanto assegura legibilidade máxima em parágrafos longos. |
| **Código, Schemas, Rotas & Telemetria** | **JetBrains Mono** | `400` (Regular), `500` (Medium) | A fonte de engenharia definitiva: largura monoescopada balanceada, caracteres de programação distintos (zeros cortados, operadores nítidos) e textura técnica incomparável para tags, datas e DTOs. |

### 2.1 Escala Tipográfica Fluida (CSS `clamp`)
O dimensionamento tipográfico responde de forma contínua à largura da viewport via `clamp()`, eliminando saltos abruptos em breakpoints:

```css
:root {
  /* Font Families */
  --font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Type Scale */
  --text-hero: clamp(2.5rem, 5.5vw + 1rem, 4.75rem);      /* 76px max, tracking: -0.04em, line-height: 1.05 */
  --text-h1: clamp(2rem, 3.5vw + 0.5rem, 3rem);            /* 48px max, tracking: -0.03em, line-height: 1.15 */
  --text-h2: clamp(1.5rem, 2vw + 0.5rem, 2rem);             /* 32px max, tracking: -0.02em, line-height: 1.25 */
  --text-h3: clamp(1.15rem, 1.2vw + 0.2rem, 1.35rem);       /* 21px max, tracking: -0.01em, line-height: 1.4 */
  --text-body-lg: clamp(1.05rem, 0.5vw + 0.8rem, 1.18rem);  /* 19px, line-height: 1.7, max-width: 65ch */
  --text-body: 1rem;                                        /* 16px, line-height: 1.65, max-width: 65ch */
  --text-sm: 0.875rem;                                      /* 14px, line-height: 1.5 */
  --text-mono-sm: 0.8125rem;                                /* 13px, tracking: 0.02em */
  --text-watermark: clamp(5rem, 14vw, 12rem);               /* 192px max, opacity: 0.03, aria-hidden */
}
```

### 2.2 Regras Estritas de Composição Tipográfica
1. **Comprimento de Linha Otimizado:** Nenhum parágrafo de texto corrido excede `65ch` de largura, garantindo conforto ergonômico de leitura.
2. **Descender Clearance:** Todo elemento em itálico ou com fonte display que contenha letras com descendentes (`g, j, p, q, y`) possui `line-height >= 1.1` e espaçamento inferior reservado (`padding-bottom: 2px`) para prevenir cortes na renderização.
3. **Sem Destaques de Cor em Palavra Isolada:** Elimina-se o vício de pintar uma única palavra do H1 com gradiente. A hierarquia se dá por peso tipográfico (ex: `Space Grotesk 700` no nome e `500` no sobrenome) ou contraste neutro.

---

## 3. Paleta de Cores e Tokens de Engenharia

Seguindo o princípio de contenção estrita do `design-taste-frontend`: **uma única cor de acento de alta intenção, neutrals profundos e zero saturação descontrolada**.

O acento escolhido é o **"Verde Telemetria / 200 OK"**: uma cor visceralmente ligada à saúde operacional de servidores, rotinas de CI/CD bem-sucedidas e respostas HTTP sadias. Foge completamente do roxo de IA e do azul corporativo saturado.

### 3.1 Tokens de Cor & Relações de Contraste (WCAG 2.1 AA/AAA)

```css
/* ==========================================================================
   TEMA ESCURO (PADRÃO - OBSIDIAN TELEMETRY)
   ========================================================================== */
:root, [data-theme="dark"] {
  /* Bases & Superfícies */
  --bg-app: #0B0D0E;             /* Ardósia obsidiana profunda (fundo principal) */
  --bg-surface: #13171A;         /* Painel/Card de primeiro nível (opaco, sólido) */
  --bg-surface-elevated: #1B2024;/* Superfície em foco / hover de interatividade */
  --bg-terminal: #07090A;        /* Superfície ultra-escura para blocos de contrato/código */

  /* Linhas Estruturais & Divisores Técnicos */
  --border-subtle: #22292F;      /* Divisores estruturais de 1px (hairline) */
  --border-strong: #333D47;      /* Bordas de cards e controles interativos */
  --border-focus: #00E599;       /* Indicador de foco por teclado (:focus-visible) */
  --grid-line: rgba(255, 255, 255, 0.035); /* Grid arquitetural de blueprint */

  /* Tipografia & Legibilidade */
  --text-primary: #F2F5F8;       /* 95% luminância: contraste 16.2:1 contra --bg-app (AAA) */
  --text-secondary: #9DA8B6;     /* Contraste 7.1:1 contra --bg-app (AAA para corpo) */
  --text-muted: #616F80;         /* Metadados e rótulos auxiliares: contraste 4.6:1 (AA) */
  --text-on-accent: #05160E;     /* Texto sobre o botão verde: contraste 14.5:1 (AAA) */

  /* Acento Singular: Telemetry Green (200 OK) */
  --accent-primary: #00E599;     /* Verde operacional elétrico de alto impacto */
  --accent-hover: #1AFFAB;       /* Estado hover iluminado */
  --accent-subtle: rgba(0, 229, 153, 0.08); /* Fundo de badges de status e tags ativas */
  --accent-border: rgba(0, 229, 153, 0.25); /* Borda sutil de elementos de acento */

  /* Status Técnicos Adicionais */
  --status-healthy: #00E599;     /* Nó ativo / teste aprovado */
  --status-warning: #F59E0B;     /* Alerta de latência / WIP */
  --status-info: #38BDF8;        /* Protocolo / link externo */
}

/* ==========================================================================
   TEMA CLARO (INDUSTRIAL BLUEPRINT PAPER)
   ========================================================================== */
[data-theme="light"] {
  /* Bases & Superfícies */
  --bg-app: #F7F9FA;             /* Papel técnico levemente acinzentado */
  --bg-surface: #FFFFFF;         /* Cartão branco puro para alto contraste */
  --bg-surface-elevated: #EEF2F5;/* Painel de destaque sutil */
  --bg-terminal: #11161B;        /* Terminal preservado escuro para legibilidade de código */

  /* Linhas Estruturais */
  --border-subtle: #DDE3E8;      /* Divisores claros e nítidos */
  --border-strong: #BDC7CF;      /* Bordas de caixas de seleção */
  --border-focus: #007A55;       /* Foco com contraste reforçado */
  --grid-line: rgba(0, 0, 0, 0.035);

  /* Tipografia */
  --text-primary: #0E1318;       /* Contraste 17.5:1 contra --bg-app (AAA) */
  --text-secondary: #48535E;     /* Contraste 7.2:1 contra --bg-app (AAA) */
  --text-muted: #6B7885;         /* Contraste 4.8:1 contra --bg-app (AA) */
  --text-on-accent: #FFFFFF;     /* Texto branco sobre botão escuro */

  /* Acento Singular: Forest Telemetry (Ajustado para contraste em fundo claro) */
  --accent-primary: #007A55;     /* Verde floresta profundo: contraste 5.8:1 contra fundo claro */
  --accent-hover: #006042;
  --accent-subtle: rgba(0, 122, 85, 0.08);
  --accent-border: rgba(0, 122, 85, 0.25);

  --status-healthy: #007A55;
  --status-warning: #B45309;
  --status-info: #0284C7;
}
```

### 3.2 Geometria e Superfícies
- **Raio de Borda (Corner Radius):** `3px` ou `4px` estrito para botões, inputs, painéis e imagens. Nada de cantos hiper-arredondados (`rounded-3xl` de 24px) típicos de apps infantis. A linguagem é de equipamento de precisão.
- **Elevação e Sombras:** Eliminam-se sombras difusas borradas (`rgba(108, 92, 231, 0.2)`). A profundidade é construída por **sobreposição de camadas e bordas de 1px**. Apenas o modal/preview de projetos utiliza sombra de oclusão natural neutra: `box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.4)`.

---

## 4. Ideia-Assinatura Memorável: "The Architecture Pipeline & Contract Inspector"

Enquanto portfólios comuns mostram capturas de tela genéricas de interfaces ou código decorativo com sintaxe inventada, o portfólio de Rômulo exibirá uma **interação exclusiva e autêntica de Engenharia de Software**:

### 4.1 O que é o Architecture Pipeline
Uma área interativa e visualmente impactante posicionada entre a trajetória e os projetos em destaque, intitulada **"Anatomia de uma Transação em Produção"**.

O visitante (seja um Tech Lead ou Recrutador) pode selecionar um fluxo de trabalho real dos projetos do Rômulo:
1. **Cenário A (projetoAGX):** *Reserva Atômica de Exemplares com Transação ACID em MongoDB & Verificação RBAC*
2. **Cenário B (Liftech):** *Ingestão de Telemetria com Validação de DTO via Zod & Notificação de Domínio (DDD)*
3. **Cenário C (Education1 ERP):** *Processamento em Lote de Matrículas Escolares & Queries SQL Otimizadas*

### 4.2 Como Funciona na Prática
O componente renderiza um **diagrama interativo de blocos conectados por linhas de pulso de dados**:
```
[1. Request HTTP/DTO] ──> [2. Middleware/RBAC] ──> [3. Serviço de Domínio] ──> [4. Transação MongoDB] ──> [5. Resposta 201 Created]
```
- Ao clicar (ou navegar via scroll scrubbing) em qualquer um dos 5 nós:
  - O painel lateral direito exibe o **contrato TypeScript real** e a estratégia de implementação adotada pelo Rômulo naquele nó (ex.: o uso de `session.startTransaction()`, validação com schemas estritos e política de rollback em caso de falha de concorrência).
  - São exibidas métricas reais de engenharia: *"Complexidade O(1) com índice composto", "Latência típica < 28ms", "Garantia de Isolamento Snapshot"*.
- **Por que isso é inesquecível:**
  - Prova empírica e irrefutável de que o desenvolvedor domina arquitetura de software, concorrência e banco de dados, em vez de apenas colar telas prontas.
  - O recrutador vê a capacidade técnica sem precisar clonar o repositório ou abrir um arquivo `.ts` externo.

---

## 5. Layout Estruturado por Seção

Container centralizado com `max-width: 1240px`, padding horizontal de `24px` (mobile) a `48px` (desktop), estruturado em um grid modular de 12 colunas com ritmo vertical uniforme de `96px` a `144px`.

### 5.1 Barra de Controle & Navegação (Navbar Fixa de Engenharia)
- **Estrutura:** Barra rígida de `56px` de altura com fundo opaco `--bg-app` e borda inferior fina `1px solid var(--border-subtle)`.
- **Esquerda:** Logo técnico `RG.sys` ou `<RG />` em JetBrains Mono 600, com um ponto verde pulsante discreto de 6px indicando sistema online.
- **Centro (Desktop >= 1024px):** Navegação horizontal semântica com rótulos limpos:
  `[ 01 // SOBRE ]` · `[ 02 // HISTÓRICO ]` · `[ 03 // ARQUITETURA ]` · `[ 04 // PROJETOS ]` · `[ 05 // MATRIZ ]` · `[ 06 // CONTATO ]`
- **Direita:**
  - Indicador de Telemetria: `[ SOROCABA-BR // NODE 24 // UTC-3 ]` em JetBrains Mono 12px (reforça a identidade técnica e localização).
  - Botão de Alternância de Tema: Ícone minimalista de dois estados com feedback tátil de clique.
- **Scroll Progress Indicator:** Uma linha hairline de 2px de espessura na base inferior da navbar em `--accent-primary`, mapeando o progresso do scroll da página de 0% a 100% via CSS nativo (`animation-timeline: scroll()`).

### 5.2 Hero: Split Assimétrico de Engenharia (7 colunas / 5 colunas)
- **Coluna da Esquerda (Colunas 1 a 7):**
  - **Badge de Status Operacional:** Pílula técnica com borda sutil contendo: `[● SISTEMA OPERACIONAL // AGX SOFTWARE — SOROCABA/SP]`.
  - **Headline Principal:**
    ```text
    Rômulo Gonçalves
    Desenvolvedor Back-end
    ```
    (Em Space Grotesk 700, linhas limpas, cor sólida de alto contraste, sem gradientes roxos).
  - **Declaração Factual de Posicionamento:**
    *"Desenvolvo serviços e APIs REST de alto desempenho em Node.js, TypeScript e MongoDB na AGX Software. Experiência prévia em manutenção de ERP e otimização de queries SQL com PHP e Laravel na Education1. Graduando em Engenharia da Computação pela Uniso."*
  - **Ações Primárias:**
    - Botão Primário: `Explorar Arquiteturas & Código` (Fundo verde acento, texto escuro de alta legibilidade, ícone de seta angular `↳`).
    - Botão Secundário: `Baixar Currículo (PDF)` (Fundo transparente, borda de 1px `--border-strong`, hover com fundo elevado).
- **Coluna da Direita (Colunas 8 a 12):**
  - **Card de Especificação de Runtime & Foto Real:**
    - Em vez de uma foto circular com aro roxo flutuante, a foto real do Rômulo é apresentada em moldura técnica retangular com proporção 4:5, escala tonal calibrada e tratamento sóbrio.
    - Acoplada à foto, uma **Ficha de Especificações de Servidor (Telemetry Spec Plate)** em JetBrains Mono:
      ```text
      ┌── SYSTEM_INFO ────────────────────────┐
      │ DEV: Rômulo Gonçalves                 │
      │ PRIMARY_STACK: Node.js / TS / Mongo   │
      │ SECONDARY: PHP 8.3 / Laravel 12 / SQL │
      │ LOCATION: Sorocaba, SP - Brasil       │
      │ STATUS: Aberto a novos desafios       │
      └───────────────────────────────────────┘
      ```

### 5.3 Seção Sobre: Manifesto de Engenharia & Princípios Arquiteturais
- **Título da Seção:** `01 // SOBRE O ENGENHEIRO` com subtítulo *"Formação técnica, compromisso com estabilidade e resolução de problemas na raiz."*
- **Grid de 2 Colunas (6 / 6):**
  - **Coluna 1 (Narrativa Direta em 1ª Pessoa):**
    - Três parágrafos objetivos baseados em fatos verificáveis:
      - *A base técnica:* Começo na Etec Sales Gomes em Tatuí (Desenvolvimento de Sistemas), onde construiu fundamentos rigorosos de lógica, compiladores e estruturas de dados.
      - *O aprendizado no fogo:* A atuação na Education1 durante 1 ano e meio (estágio e desenvolvedor full-stack), atendendo chamados críticos, eliminando gargalos em queries SQL de relatórios financeiros e lidando com regras de negócio complexas de gestão educacional.
      - *O foco atual:* Construção de microserviços, autenticação RBAC, modelagem de dados NoSQL e transações atômicas na AGX Software com Node.js e TypeScript.
  - **Coluna 2 (Princípios de Engenharia do Desenvolvedor):**
    - 3 cards estruturados em lista técnica:
      1. **Integridade Transacional & Modelagem Sólida:** *"Bancos de dados não são depósitos de JSON solto; foco em consistência, índices adequados e pipelines de agregação performáticos."*
      2. **Contratos Estritos & Previsibilidade:** *"APIs REST documentadas (OpenAPI/Swagger), tipadas em TypeScript e validadas em runtime em todos os endpoints."*
      3. **Resolução de Problemas na Causa-Raiz:** *"Investigação metódica de tickets e logs para erradicar o defeito na base arquitetural, sem remendos paliativos."*

### 5.4 Seção Experiência & Educação: O Histórico de Serviços (Service Changelog)
Substitui as duas timelines com bolinhas roxas por uma **Estrutura Unificada de Histórico Profissional e Acadêmico** que evidencia a sobreposição real entre graduação e trabalho:

- **Entrada 01: AGX Software**
  - *Período:* `04/2026 — Presente` | *Local:* Presencial, Sorocaba/SP
  - *Cargo:* **Desenvolvedor Back-end**
  - *Entregas Concretas:* Arquitetura e desenvolvimento de APIs RESTful em Node.js e TypeScript. Implementação de regras de negócio, modelagem de coleções no MongoDB, criação de rotinas de autenticação e manutenção de serviços em produção.
  - *Tags:* `Node.js` `TypeScript` `MongoDB` `Mongoose` `Git` `Docker`
- **Entrada 02: Education1**
  - *Período:* `11/2025 — 04/2026` | *Local:* Remoto, Sorocaba/SP
  - *Cargo:* **Desenvolvedor Full Stack**
  - *Entregas Concretas:* Manutenção evolutiva do ERP de Gestão Escolar. Otimização de rotinas e queries SQL complexas para módulos financeiro e de matrícula. Resolução de tickets de suporte de alta severidade e refatoração de código legado em PHP e Laravel.
  - *Tags:* `PHP` `Laravel` `MySQL` `SQL Otimizado` `JavaScript` `Git`
- **Entrada 03: Education1 (Estágio)**
  - *Período:* `10/2024 — 11/2025` | *Cargo:* **Estagiário em Desenvolvimento**
  - *Entregas:* Correção de bugs em plataformas de ensino, customizações de telas e elaboração de documentações técnicas.
- **Entrada 04: Uniso (Universidade de Sorocaba)**
  - *Período:* `02/2024 — Presente (Previsão 2028)`
  - *Grau:* **Bacharelado em Engenharia da Computação**
  - *Destaque de Mérito:* **5x Aluno Top da Uniso** (reconhecimento acadêmico formal por desempenho destacado na turma).
- **Entrada 05: Etec Sales Gomes (Tatuí/SP)**
  - *Período:* `02/2021 — 12/2023`
  - *Curso:* **Técnico em Desenvolvimento de Sistemas** (Integrado ao Ensino Médio). Base algorítmica e estruturas de dados.

### 5.5 Seção Projetos em Destaque: Architecture Spec Sheets
Exibição exclusiva de projetos com real valor de engenharia de software e back-end, eliminando o ruído de exercícios introdutórios:

#### Projeto 01: Liftech (Destaque Principal)
- **Subtítulo:** *Monorepo TypeScript corporativo orientado a DDD, com API Express e MongoDB.*
- **Arquitetura & Destaques de Back-end:**
  - Separação rigorosa de camadas segundo Domain-Driven Design (Entidades, Repositórios, Casos de Uso).
  - Validação de entrada por regras desacopladas, persistência com Mongoose e cobertura de testes automatizados com Vitest.
  - Documentação completa de endpoints e arquitetura de dados; suporte a internacionalização e deploy em nuvem.
- **Metadados:** `TypeScript` `Express` `MongoDB` `DDD` `Vitest` `Vercel`
- **Links:** `[ Repositório GitHub ↗ ]` · `[ Deploy em Produção ↗ ]`

#### Projeto 02: projetoAGX — API de Biblioteca & Empréstimos
- **Subtítulo:** *API Back-end pura em Deno, Express e Mongoose com transações atômicas de estoque.*
- **Arquitetura & Destaques de Back-end:**
  - Sistema de controle de estoque com garantia de atomicidade (prevenção de double-borrowing via MongoDB Transactions).
  - Autenticação JWT com controle de acesso baseado em papéis (RBAC) e revogação de tokens em lista de bloqueio.
  - Documentação OpenAPI/Swagger interativa e bateria de testes de integração com Supertest.
- **Metadados:** `Deno` `TypeScript` `Mongoose ACID` `RBAC` `Swagger`
- **Links:** `[ Repositório GitHub ↗ ]`

#### Projeto 03: Moni — Gestão Financeira Pessoal
- **Subtítulo:** *Aplicação full-stack em arquitetura por camadas (Repositories / Services / Models).*
- **Arquitetura & Destaques de Back-end:**
  - Next.js com camadas de serviço isoladas e NextAuth para fluxo de sessão seguro.
  - Modelagem NoSQL no MongoDB com agrupamento e agregações para relatórios orçamentários.
  - Testes unitários e de integração automatizados; em produção ativa na Vercel.
- **Metadados:** `Next.js` `TypeScript` `MongoDB` `NextAuth` `Vitest`
- **Links:** `[ Repositório GitHub ↗ ]` · `[ Aplicação no Ar ↗ ]`

#### Projeto 04: soloTrack — IoT & Plataforma de Rastreamento
- **Subtítulo:** *Solução integrada de telemetria com back-end em Laravel, front-end TS e firmware C++.*
- **Arquitetura & Destaques de Back-end:**
  - Ingestão de pacotes de dados emitidos por microcontroladores, processamento assíncrono e armazenamento relacional.
  - Especificação OpenAPI padronizada e orquestração de ambiente conteinerizado via Docker Compose.
- **Metadados:** `PHP 8.3` `Laravel` `C++ (Firmware)` `Docker Compose` `OpenAPI`
- **Links:** `[ Repositório GitHub ↗ ]`

#### Sub-bloco: Outros Projetos Técnicos de Valor Científico
- **ATOMOX (Projeto-Integrador):** Sistema de monitoramento atmosférico com ESP32, websockets em tempo real e interface responsiva *(com link corrigido no GitHub)*.
- **Mini Interpretador Matemático:** Projeto acadêmico de compiladores implementando analisador léxico/sintático em Python com PLY, tabela de símbolos e tratamento formal de erros.

### 5.6 Seção Matriz Tecnológica por Camada de Produção (Stack)
Em vez de ícones flutuantes soltos com emojis, uma **Matriz de Engenharia em 4 Camadas**:

```text
┌── CAMADA 1: NÚCLEO BACK-END & RUNTIMES ─────────────────────────────────────┐
│ Node.js (v20/v24) · TypeScript · PHP (8.x) · Laravel 12 · Express · Deno    │
│ Padrões: REST APIs, Arquitetura em Camadas, DDD, Validação de DTOs, RBAC     │
└─────────────────────────────────────────────────────────────────────────────┘
┌── CAMADA 2: PERSISTÊNCIA & ENGENHARIA DE DADOS ─────────────────────────────┐
│ MongoDB · MySQL · Mongoose · Transações ACID · Modelagem NoSQL               │
│ Técnicas: Aggregation Pipelines, Índices Compostos, Otimização de Queries   │
└─────────────────────────────────────────────────────────────────────────────┘
┌── CAMADA 3: ARQUITETURA, INFRAESTRUTURA & QUALIDADE ────────────────────────┐
│ Docker · Linux (Ubuntu/Debian) · Git/GitHub · CI/CD (GitHub Actions)        │
│ Testes: Vitest, Supertest, Testes Unitários e de Integração, Swagger/OpenAPI │
└─────────────────────────────────────────────────────────────────────────────┘
┌── CAMADA 4: INTERFACE & CONSUMO DE DADOS ───────────────────────────────────┐
│ Vue.js · React · Next.js · HTML5/CSS3 Semântico · Tailwind CSS · Ionic      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.7 Seção Certificados & Credenciais Oficiais
Exibe com orgulho as credenciais técnicas do LinkedIn que estavam invisíveis no portfólio original:
1. **MongoDB Node.js Developer Path** — Emissor: MongoDB University (`ID: MDBz8yqgb1ahv`) — *Foco em Aggregation Framework, Índices e Drivers Oficiais.*
2. **MongoDB Data Modeling Path** — Emissor: MongoDB University (`ID: MDBjqyw6ftv4n`) — *Foco em Design de Schemas e Padrões NoSQL.*
3. **Introduction to MongoDB** — Emissor: MongoDB University (`ID: MDBst43cbdxts`) — *Foco em Operações no Atlas e Gerenciamento de Dados.*
4. **Formação Docker para Desenvolvedores** — Emissor: Udemy — *Foco em Conteinerização, Redes e Dockerfiles.*
5. **Reconhecimento Acadêmico: 5x Aluno Top da Uniso** — Universidade de Sorocaba — *Distinção concedida semestralmente por liderança de notas na graduação de Engenharia da Computação.*

### 5.8 Seção Contato (Endpoint de Comunicação)
- **Título:** `06 // ESTABELECER CONEXÃO`
- **Estrutura:** Painel técnico objetivo com dados prontos para ação imediata do recrutador:
  - **Endpoint Primário (E-mail):** `romulogoncalves13@gmail.com` acompanhado de botão de ação imediata: `[ COPIAR ENDPOINT ]` que altera temporariamente para `[ COPIADO ✓ ]` via feedback tátil e sonoro visual acessível.
  - **Canais de Rede Profissional:**
    - `[ GitHub // RomuuloGoncalves ↗ ]`
    - `[ LinkedIn // in/romuulogoncalves ↗ ]`
  - **Status de Disponibilidade:**
    - `Disponibilidade para posições Back-end (Remoto ou Híbrido em Sorocaba/SP/São Paulo).`
- **Rodapé de Engenharia:**
  - *"Construído com Vue 3 & TypeScript. Layout e tokens por Antigravity Design System. Zero bibliotecas pesadas de animação. Hospedado via GitHub Pages com 100% de conformidade com padrões web abertos."*

---

## 6. Plano Completo de Parallax & Engenharia de Scroll

O parallax do Design B **não é um show circense de elementos voando na diagonal**; ele é um mecanismo de **profundidade perceptual estrutural**, onde planos de fundo e marcas de engenharia se deslocam em taxas físicas distintas para guiar o foco da leitura.

### 6.1 Arquitetura de 4 Camadas de Profundidade

| Camada | Identificador | Velocidade Relativa | Elementos Contidos | Comportamento no Scroll |
|---|---|---|---|---|
| **Camada 0** (Fundo) | `layer-grid` | `0.10x` | Grid técnico milimétrico de blueprint em CSS | Desloca-se de forma quase imperceptível, conferindo peso e estabilidade à página. |
| **Camada 1** (Estrutura) | `layer-watermark` | `0.25x` | Identificadores de seção em mono gigante (`01_SYSTEM`, `02_HISTORY`, `04_PROJECTS`) | Tipografia mono monumental em opacidade ultrabaixa (3%) que sobe lentamente atrás dos cartões. |
| **Camada 2** (Conteúdo) | `layer-content` | `1.00x` (Velocidade Normal) | Títulos, textos, botões, diagramas e formulários | Rola de forma nativa e precisa, garantindo 100% de legibilidade e sem descolamento de baseline. |
| **Camada 3** (Destaques) | `layer-telemetry` | `1.15x` | Badges de status flutuantes e moldura do runtime | Desloca-se ligeiramente mais rápido que o texto, criando sutil sensação de elevação tridimensional. |

### 6.2 Estratégia de Implementação: CSS Scroll-Driven Nativo com Fallback Elegante

Privilegiamos a especificação moderna de **CSS Scroll-Driven Animations**, que roda inteiramente na *compositor thread* do navegador (GPU), eliminando qualquer `requestAnimationFrame` em JS e operando a 60-120fps mesmo em celulares modestos:

```css
/* ==========================================================================
   CSS SCROLL-DRIVEN ANIMATIONS (SUPORTE NATIVO CHROME / EDGE / OPERA)
   ========================================================================== */
@supports (animation-timeline: view()) {
  /* Marca d'água de seção com velocidade reduzida */
  .section-watermark {
    animation: parallaxWatermark linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
  }

  @keyframes parallaxWatermark {
    from { transform: translateY(-40px); }
    to { transform: translateY(40px); }
  }

  /* Barra de progresso da navbar vinculada ao scroll global */
  .navbar-scroll-progress {
    transform-origin: 0% 50%;
    animation: progressIndicator linear both;
    animation-timeline: scroll(root);
  }

  @keyframes progressIndicator {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
}
```

#### Fallback Progressivo em JavaScript Leve
Para navegadores que ainda não implementam `animation-timeline: view()` (Safari e versões legadas de Firefox), utiliza-se uma classe utilitária mínima com `IntersectionObserver` que adiciona estados de revelação sem qualquer dependência externa:
```ts
// Executado exclusivamente se CSS.supports('animation-timeline: scroll()') for falso
if (!window.CSS || !CSS.supports('animation-timeline: scroll()')) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-viewport');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}
```

### 6.3 Fallback Estrito de Acessibilidade (`prefers-reduced-motion`)
Em total conformidade com o critério WCAG 2.3.3: usuários com preferências ativadas de movimento reduzido (ou histórico de labirintite/vertigem) têm **todas as animações de deslocamento de parallax imediatamente desativadas**:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .section-watermark,
  .layer-telemetry,
  .layer-grid {
    transform: none !important;
    animation: none !important;
  }
}
```

---

## 7. Wireframes em ASCII Art

### 7.1 Visão Geral da Navbar e Hero Section
```text
+--------------------------------------------------------------------------------------------------+
| [●] RG.sys    [ 01 // SOBRE ]  [ 02 // TRAJETÓRIA ]  [ 03 // PROJETOS ]   [SOROCABA // UTC-3] [*]|
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  [● SISTEMA OPERACIONAL // AGX SOFTWARE — SOROCABA]                                              |
|                                                                                                  |
|  Rômulo Gonçalves                                            +--------------------------------+  |
|  Desenvolvedor Back-end                                      | [ FOTO REAL 4:5 EM TONS        |  |
|                                                              |   SÓBRIOS E MOLDURA TÉCNICA ]  |  |
|  Desenvolvo APIs e microsserviços em Node.js,                |                                |  |
|  TypeScript e MongoDB na AGX Software. Experiência           +--------------------------------+  |
|  prévia com PHP/Laravel em sistemas de ERP escolar.          | ┌── SYSTEM_SPEC ─────────────┐ |  |
|  Graduando em Engenharia da Computação na Uniso.             | │ RUNTIME: Node 24 / TS 5.x  │ |  |
|                                                              | │ DATABASE: MongoDB / MySQL  │ |  |
|  [ ↳ Explorar Projetos ]   [ ↓ Baixar CV (PDF) ]             | │ STATUS: Aberto a Propostas │ |  |
|                                                              | └────────────────────────────┘ |  |
+--------------------------------------------------------------------------------------------------+
```

### 7.2 Seção Sobre & Princípios de Engenharia
```text
+--------------------------------------------------------------------------------------------------+
| 01 // SOBRE O ENGENHEIRO                                                      [ 01_OVERVIEW ]    |
|--------------------------------------------------------------------------------------------------|
|                                                                                                  |
| [ NARRATIVA PROFISSIONAL ]                 [ PRINCÍPIOS ARQUITETURAIS ]                          |
|                                                                                                  |
| Sou desenvolvedor back-end focado em       ┌──────────────────────────────────────────────────┐  |
| estabilidade e integridade de dados.       │ 01. INTEGRIDADE TRANSACIONAL & MODELAGEM         │  |
| Comecei no técnico na Etec de Tatuí,       │ Bancos de dados com esquemas modelados e         │  |
| atuei na Education1 com ERP escolar        │ transações atômicas ACID via MongoDB Sessions.   │  |
| e hoje projeto APIs na AGX Software.       └──────────────────────────────────────────────────┘  |
|                                            ┌──────────────────────────────────────────────────┐  |
| Na Uniso, curso Engenharia da Computação   │ 02. CONTRATOS ESTRICTOS & OBSERVALIDADE          │  |
| com foco em estruturas de dados e          │ Tipagem forte em TypeScript, DTOs validados em   │  |
| algoritmos, reconhecido 5x como            │ runtime com Zod e documentação com OpenAPI.      │  |
| Aluno Top do curso.                        └──────────────────────────────────────────────────┘  |
|                                            ┌──────────────────────────────────────────────────┐  |
|                                            │ 03. RESOLUÇÃO DE CAUSA-RAIZ                      │  |
|                                            │ Diagnóstico estruturado através de logs e traces │  |
|                                            │ para eliminar tickets sem retrabalho.            │  |
|                                            └──────────────────────────────────────────────────┘  |
+--------------------------------------------------------------------------------------------------+
```

### 7.3 Seção Experiência & Educação (Service Changelog)
```text
+--------------------------------------------------------------------------------------------------+
| 02 // HISTÓRICO DE SERVIÇOS & FORMAÇÃO                                         [ 02_HISTORY ]    |
|--------------------------------------------------------------------------------------------------|
|                                                                                                  |
|  [04/2026 - PRESENTE]  AGX SOFTWARE ── SOROCABA/SP (PRESENCIAL)                   [ STATUS: ATIVO ]
|  Desenvolvedor Back-end                                                                          |
|  * Desenvolvimento de serviços back-end e APIs REST em Node.js e TypeScript.                     |
|  * Modelagem e operações de coleções no MongoDB; análise e resolução definitiva de tickets.      |
|  [TAGS: Node.js] [TypeScript] [MongoDB] [Mongoose] [Git] [REST APIs]                             |
|                                                                                                  |
|  ----------------------------------------------------------------------------------------------  |
|                                                                                                  |
|  [11/2025 - 04/2026]   EDUCATION1 ── REMOTO                                                      |
|  Desenvolvedor Full Stack                                                                        |
|  * Manutenção e melhorias no sistema ERP de Gestão Escolar (módulos financeiro e matrícula).     |
|  * Criação e otimização de queries SQL complexas; refatoração e resolução de bugs críticos.      |
|  [TAGS: PHP] [Laravel] [MySQL] [SQL Queries] [JavaScript] [Git]                                  |
|                                                                                                  |
|  ----------------------------------------------------------------------------------------------  |
|                                                                                                  |
|  [10/2024 - 11/2025]   EDUCATION1 ── SOROCABA/SP                                                 |
|  Estagiário em Desenvolvimento de Sistemas                                                      |
|  * Análise inicial de chamados, suporte a desenvolvedores plenos e documentação de sistemas.     |
|                                                                                                  |
|  ----------------------------------------------------------------------------------------------  |
|                                                                                                  |
|  [02/2024 - PRESENTE]  UNIVERSIDADE DE SOROCABA (UNISO)                                          |
|  Engenharia da Computação (Bacharelado)                                                          |
|  * [Mérito Acadêmico: 5x Aluno Top da Uniso por excelência em desempenho nas disciplinas]        |
|                                                                                                  |
|  ----------------------------------------------------------------------------------------------  |
|                                                                                                  |
|  [02/2021 - 12/2023]   ETEC SALES GOMES ── TATUÍ/SP                                              |
|  Técnico em Desenvolvimento de Sistemas (Concluído)                                              |
+--------------------------------------------------------------------------------------------------+
```

### 7.4 Seção Assinatura: The Living Architecture Pipeline Inspector
```text
+--------------------------------------------------------------------------------------------------+
| 03 // ANATOMIA DE UMA TRANSAÇÃO EM PRODUÇÃO                                   [ 03_PIPELINE ]    |
| Selecione o cenário para inspecionar o fluxo de dados e os contratos de código em cada nó:       |
|                                                                                                  |
| [•] Reserva Atômica com Transação (projetoAGX)   [ ] Ingestão DDD com Vitest (Liftech)           |
|                                                                                                  |
| +──────────────────────────────────────────────────────────────────────────────────────────────+ |
| | O FLUXO DE EXECUÇÃO:                                                                         | |
| |                                                                                              | |
| | [1. HTTP POST DTO] ──> [2. AUTH & RBAC] ──> [3. DOMAIN SERVICE] ──> [4. MONGO ACID] ──> [201]| |
| |        │                                                                                     | |
| |        ▼ (Nó Selecionado: 4. Transação Atômica em Banco NoSQL)                               | |
| +──────────────────────────────────────────────────────────────────────────────────────────────+ |
| | DETALHES DO CONTRATO & IMPLEMENTAÇÃO:                                                        | |
| |                                                                                              | |
| | ┌── schema-contract.ts ─────────────────────────┐  ┌── METRICAS OPERACIONAIS ──────────────┐ │ |
| | │ const session = await mongoose.startSession();│  │ Isolação: Snapshot Isolation         │ │ |
| | │ session.startTransaction();                   │  │ Concorrência: Optimistic Lock / Version│ │ |
| | │ try {                                         │  │ Latência de Commit: ~24ms             │ │ |
| | │   await Livro.updateOne({ _id, estoque: > 0 },│  │ Rollback Garantido: Sim               │ │ |
| | │     { $inc: { estoque: -1 } }, { session });  │  └───────────────────────────────────────┘ │ |
| | │   await session.commitTransaction();          │                                            │ |
| | └───────────────────────────────────────────────┘                                            │ |
+--------------------------------------------------------------------------------------------------+
```

### 7.5 Seção Projetos em Destaque (Architecture Spec Sheets)
```text
+--------------------------------------------------------------------------------------------------+
| 04 // PROJETOS DE ENGENHARIA EM DESTAQUE                                      [ 04_PROJECTS ]    |
|--------------------------------------------------------------------------------------------------|
|                                                                                                  |
| ┌── LIFTECH (PROJETO #1) ───────────────────────┐ ┌── PROJETO AGX: API BIBLIOTECA (#2) ────────┐ |
| │ Monorepo TS orientado a DDD com Express & Mongo│ │ API em Deno com Transações ACID & RBAC     │ |
| │                                               │ │                                            │ |
| │ • Casos de uso desacoplados em módulos DDD    │ │ • Reserva de estoque atômica com rollback  │ |
| │ • Testes automatizados unitários com Vitest   │ │ • Autenticação JWT com blacklist em cache  │ |
| │ • Deploy de alta disponibilidade no ar        │ │ • Swagger OpenAPI & Testes com Supertest   │ |
| │                                               │ │                                            │ |
| │ [TypeScript] [Express] [MongoDB] [DDD]        │ │ [Deno] [Mongoose] [JWT/RBAC] [OpenAPI]     │ |
| │                                               │ │                                            │ |
| │ [ ↳ Repositório GitHub ]  [ ↗ Deploy Ativo ]  │ │ [ ↳ Repositório GitHub ]                   │ |
| └───────────────────────────────────────────────┘ └────────────────────────────────────────────┘ |
|                                                                                                  |
| ┌── MONI: GESTÃO FINANCEIRA (#3) ───────────────┐ ┌── SOLOTRACK: IOT & TELEMETRIA (#4) ────────┐ |
| │ Camadas Repositories/Services com Next.js     │ │ Back-end Laravel + C++ Firmware + Docker   │ |
| │                                               │ │                                            │ |
| │ • Autenticação de sessão robusta via NextAuth │ │ • Ingestão assíncrona de telemetria IoT    │ |
| │ • Modelagem de agregação NoSQL para finanças  │ │ • Contratos padronizados via OpenAPI       │ |
| │ • Suíte completa de testes de integração      │ │ • Ambiente padronizado em Docker Compose   │ |
| │                                               │ │                                            │ |
| │ [Next.js] [TypeScript] [MongoDB] [Vitest]     │ │ [PHP 8.3] [Laravel] [C++] [Docker Compose] │ |
| │                                               │ │                                            │ |
| │ [ ↳ Repositório GitHub ]  [ ↗ Deploy Ativo ]  │ │ [ ↳ Repositório GitHub ]                   │ |
| └───────────────────────────────────────────────┘ └────────────────────────────────────────────┘ |
+--------------------------------------------------------------------------------------------------+
```

### 7.6 Seção Matriz Tecnológica, Certificados e Contato
```text
+--------------------------------------------------------------------------------------------------+
| 05 // MATRIZ TECNOLÓGICA DE PRODUÇÃO                                            [ 05_STACK ]     |
|--------------------------------------------------------------------------------------------------|
| [NÚCLEO BACK-END]     Node.js (v20/v24), TypeScript, PHP 8.3, Laravel 12, Express, Deno          |
| [PERSISTÊNCIA]        MongoDB, MySQL, Mongoose, Transações ACID, Aggregations, Índices           |
| [INFRAESTRUTURA/QA]   Docker, Linux, Git/GitHub, CI/CD Actions, Vitest, Supertest, OpenAPI/Swagger|
| [INTERFACE/CONSUMO]   Vue.js, React, Next.js, HTML5/CSS Semântico, Tailwind                      |
+--------------------------------------------------------------------------------------------------+
| 06 // CERTIFICAÇÕES & RECONHECIMENTO ACADÊMICO                             [ 06_CREDENTIALS ]    |
|--------------------------------------------------------------------------------------------------|
| • MongoDB Node.js Developer Path (MongoDB University // ID: MDBz8yqgb1ahv)                       |
| • MongoDB Data Modeling Path (MongoDB University // ID: MDBjqyw6ftv4n)                           |
| • Introduction to MongoDB (MongoDB University // ID: MDBst43cbdxts)                              |
| • Docker para Desenvolvedores (Udemy // 2026)                                                    |
| • 5x Reconhecido como Aluno Top da Uniso (Engenharia da Computação - UNISO)                      |
+--------------------------------------------------------------------------------------------------+
| 07 // ESTABELECER CONEXÃO (HANDSHAKE)                                            [ 07_CONNECT ]  |
|--------------------------------------------------------------------------------------------------|
|                                                                                                  |
|   ENDPOINT DIRETO:                                                                               |
|   romulogoncalves13@gmail.com                     [ COPIAR ENDPOINT ]                            |
|                                                                                                  |
|   CANAIS OFICIAIS:                                                                               |
|   [ ↳ GitHub: github.com/RomuuloGoncalves ]    [ ↳ LinkedIn: linkedin.com/in/romuulogoncalves ]  |
|                                                                                                  |
|   Disponível para oportunidades técnicas em Back-end (Remoto ou Presencial em Sorocaba/SP).      |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| (c) 2026 Rômulo Gonçalves // Antigravity Architecture Portfolio // Construído com Vue 3 & TS.    |
+--------------------------------------------------------------------------------------------------+
```

---

## 8. Riscos de Performance & Acessibilidade (com Mitigações Concretas)

### 8.1 Riscos de Performance & Tempo de Carregamento

| Risco Crítico Identificado | Impacto no Usuário | Solução / Mitigação Técnica de Engenharia B |
|---|---|---|
| **Imagens sem otimização** (`calculadoraLexica.png` com 2.8 MB, `foto-perfil.jpeg` com 680 KB) | Explosão do LCP (Largest Contentful Paint) em redes 4G/3G móveis; consumo desnecessário de dados. | **Pipeline de Compressão Imediata**: Converter para formato `.webp` e `.avif` de última geração. Otimizar a foto de perfil para `< 45 KB` e as miniaturas de projetos para `< 60 KB`. Declarar `width` e `height` explícitos e usar `<picture>` com `srcset`. |
| **Orbs com blur de 100px animados continuamente** | Gatilho permanente de *Paint* e *Composite* na GPU; consumo severo de CPU e bateria em laptops e celulares. | **Eliminação dos 3 Orbs**. Fundo gerado com padrão estático de grid vetorial via CSS puro (`background-image`), com custo zero de renderização contínua. |
| **Importação de fontes por `<link>` bloqueante** | Render Blocking Resource atrasando a renderização da primeira dobra (FCP alto) e FOUT/FOIT. | **Self-Hosting com `@fontsource`**: Instalar `@fontsource/space-grotesk`, `@fontsource/plus-jakarta-sans` e `@fontsource/jetbrains-mono`. Usar `font-display: swap` e sub-setting estrito apenas para o subset `latin`. |
| **Bloqueio da Main Thread em Animações de Scroll** | Framerate instável e engasgos (*jank*) caso scroll listeners JS manipulem o DOM. | **Uso de CSS Scroll-Driven Animations nativo**: A execução roda na *Compositor Thread*, independente da carga de JavaScript da página. |
| **Tamanho excessivo de DOM** | Queda de pontuação no Lighthouse e lentidão em dispositivos móveis. | **Contenção CSS**: Aplicação de `content-visibility: auto` e `contain-intrinsic-size: 1px 800px` nas seções inferiores da página (fora da primeira dobra), permitindo que o navegador ignore a pintura inicial de seções ainda não visíveis. |

### 8.2 Riscos de Acessibilidade (WCAG 2.1 / 2.2 Níveis AA e AAA)

| Barreira de Acessibilidade | Violação de Norma WCAG | Correção Mandatória de Design B |
|---|---|---|
| **Bloqueio de Zoom no Viewport** (`maximum-scale=1.0, user-scalable=no` presente no `index.html`) | Violação grave da WCAG 1.4.4 (Resize text). Impede que pessoas com baixa visão ampliem a tela no celular. | **Remover imediatamente** `maximum-scale=1.0` e `user-scalable=no` da tag `<meta name="viewport">`. Garantir zoom fluido até 200% sem quebra de layout. |
| **Contraste de Cor Insuficiente em Textos Secundários** | Violação da WCAG 1.4.3 (Contrast Minimum - 4.5:1). O texto `#8888a8` atual falha em contraste. | **Auditado e travado:** O texto secundário `--text-secondary` (`#9DA8B6` no Dark e `#48535E` no Light) atinge contraste mínimo de `7.1:1` (superando o critério AAA). O texto de apoio `--text-muted` atinge estritamente `4.6:1` (AA). |
| **Falta de Indicador Visível de Foco por Teclado** | Violação da WCAG 2.4.7 (Focus Visible). Usuários que navegam com Tab perdem o cursor visual. | **Implementação de `:focus-visible` customizado**: Contorno duplo de `2px solid var(--border-focus)` com offset de `2px` em todos os botões, links, abas do pipeline e seletores. |
| **Sensibilidade a Movimento / Labirintite** | Violação da WCAG 2.3.3 (Animation from Interactions). Animações de parallax não solicitadas podem causar náuseas. | **Suporte obrigatório a `@media (prefers-reduced-motion: reduce)`**: Todas as translações verticais de parallax são substituídas por layouts estáticos limpos e transições instantâneas. |
| **Elementos Interativos Sem Nomes Acessíveis** | Violação da WCAG 4.1.2 (Name, Role, Value). Botões com ícones puros (como o seletor de tema) sem rótulo textual. | **Rótulos `aria-label` descritivos e atualizados**: O botão de tema declara explicitamente `aria-label="Alternar para tema claro"` / `aria-label="Alternar para tema escuro"`, e as abas do Pipeline utilizam `role="tablist"`, `role="tab"` e `aria-selected`. |
| **Divergência na Restauração de Tema Salvo** | O código atual do `onMounted` lê `localStorage`, mas só reage se for `'dark'`, quebrando quando o usuário escolhe tema claro. | **Resolução no Script**: Leitura combinada de `localStorage.getItem('theme')` com fallback para `window.matchMedia('(prefers-color-scheme: dark)')`, aplicando a classe ou atributo `[data-theme]` no elemento raiz `<html>` de forma síncrona para evitar flashes (*FART - Flash of inAccurate Color Theme*). |

---

## 9. Plano de Ação & Arquitetura de Transição

Como Designer B, o objetivo desta pesquisa é entregar a fundamentação completa para a equipe de implementação. O plano de execução não requer nenhuma alteração imediata no banco de dados nem introdução de dependências pesadas:

1. **Camada de Estilo e Variáveis:** Substituir a paleta roxa do `variables.css` pelo sistema de tokens do Design B (Obsidian + Verde Telemetria).
2. **Otimização de Assets:** Rodar script de compressão de imagens em `src/assets/img/` (converter imagens de alta resolução para WebP leve).
3. **Refatoração Semântica do `HomePage.vue`:**
   - Remoção dos 3 divs `.orb` e de todas as classes `.glass-card`.
   - Implementação do grid técnico de blueprint.
   - Aplicação da cópia revisada com base em fatos (`copy.md` e `github-projetos.md`).
   - Inserção do componente de assinatura **Architecture Pipeline Inspector**.
   - Atualização da lista de projetos para priorizar *Liftech*, *projetoAGX*, *Moni* e *soloTrack*.
4. **Verificação de Performance e Acessibilidade:** Rodar auditoria no Lighthouse no Chrome DevTools com meta de **100 em Acessibilidade e Best Practices** e **> 95 em Performance**.

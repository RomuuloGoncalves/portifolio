# Conteúdo final (T1, rev. 2)

Fonte: `research/*.md`, `prototype-c/index.html` e `gh repo view`/`curl` em 2026-10-29 (links abaixo responderam HTTP 200). Rev. 2 aplica os ajustes de texto de `research/review-c.md` (§9, §12, §13) e a ficha SYSTEM_INFO.
Itens com **[CONFIRMAR]** dependem do usuário.

## Perfil e hero

- Nome: Rômulo Gonçalves
- Cargo: Desenvolvedor back-end (igual em `<title>`, description, OG e hero; hoje `index.html:6` diz "Full Stack")
- `<title>`: "Rômulo Gonçalves · Desenvolvedor back-end"
- Hero (2 frases): "Desenvolvo APIs em Node.js, TypeScript e MongoDB na AGX Software. Antes, PHP e Laravel no ERP escolar da Education1."
- Botões: "Ver projetos" · "Baixar currículo" (PDF) **[CONFIRMAR URL pública do PDF, D-16]**
- Foto: `prototype-c/foto-perfil.jpg` (1200×1600), alt "Foto de Rômulo Gonçalves". Legenda: `foto-perfil.avif · 1200×1600` **[CONFIRMAR texto da legenda]**

### Ficha SYSTEM_INFO (HERO-02)

| dt | dd |
| --- | --- |
| DEV | Rômulo Gonçalves |
| PRIMARY_STACK | Node.js / TS / MongoDB |
| SECONDARY | PHP / Laravel / MySQL |
| LOCATION | Sorocaba, SP · Brasil |
| STATUS | **[CONFIRMAR, D-12]** "Aberto a conversar" só com OK do usuário (está empregado na AGX). Sem OK: linha omitida |

## Sobre

- Lead: "Sou desenvolvedor back-end. Comecei no técnico da Etec Sales Gomes, em Tatuí, entrei como estagiário na Education1 em 2024 e hoje escrevo APIs na AGX Software."
- "Na Education1 passei um ano e meio entre estágio e full stack: recebia os tickets do suporte, achava a causa e corrigia no ERP de gestão escolar, nos módulos de matrícula e financeiro."
- "Faço Engenharia da Computação na Uniso, onde fui reconhecido 5 vezes como Aluno Top. Fora do trabalho, mantenho projetos próprios em Node.js, TypeScript e MongoDB."

Princípios (títulos como fatos curtos, COPY-05):

| Título | Texto |
| --- | --- |
| Transação quando não pode ficar pela metade | Coleções modeladas para a consulta, índices onde a query pede e transações quando a operação não pode ficar pela metade. |
| OpenAPI em todo endpoint | APIs REST tipadas em TypeScript, entrada validada antes de chegar ao domínio e endpoints documentados em OpenAPI/Swagger. |
| Correção na causa | Ticket bom é ticket que não volta: ler o log, reproduzir, achar a origem e corrigir lá. |

## Histórico (datas do LinkedIn)

Subtítulo: "Trabalho e graduação acontecendo ao mesmo tempo."

| Período | Título | Local | Texto | Tags |
| --- | --- | --- | --- | --- |
| 04/2026 a hoje (Atual) | Desenvolvedor back-end | AGX Software, Sorocaba/SP, presencial | Desenvolvo e mantenho serviços back-end. Analiso e corrijo tickets, crio funcionalidades novas e projeto APIs REST em Node.js e TypeScript, com MongoDB. **[CONFIRMAR: desenha as APIs do zero?]** | nenhuma (COPY-04) |
| 11/2025 a 04/2026 | Desenvolvedor full stack | Education1, remoto | Recebia os tickets do suporte, achava a causa e corrigia no ERP de gestão escolar, nos módulos de matrícula e financeiro. Criei telas, escrevi queries SQL e trabalhei na performance de APIs. | PHP, Laravel, JavaScript, jQuery, MySQL |
| 10/2024 a 11/2025 | Estagiário em Desenvolvimento de Sistemas | Education1, Sorocaba/SP | Analisava tickets, corrigia bugs e implantava melhorias no mesmo ERP. | — |
| 02/2024 a hoje (Graduação) | Engenharia da Computação | Uniso | Graduação em andamento. Reconhecido 5 vezes como Aluno Top da Uniso. **[CONFIRMAR semestre/previsão]** | — |
| 02/2021 a 12/2023 (Concluído) | Técnico em Desenvolvimento de Sistemas | Etec Sales Gomes, Tatuí/SP | Curso técnico integrado ao ensino médio: lógica, estrutura de dados, banco de dados e desenvolvimento web. | — |

## Pipeline Inspector

Os cenários do protótipo C (`prototype-c/main.js`: "projetoAGX: empréstimo" e "Liftech: caso de uso") são só rascunho de formato. O conteúdo final vem da análise real de cada projeto (T5, PIPE-05 a PIPE-08, D-18) e fica em `pipeline.md`. Todo trecho de código **[CONFIRMAR]** até a análise.

## Projetos em destaque (5)

Subtítulo (COPY-05): "Cinco projetos com API, banco e testes; links para o código."

| # | Nome | Ano | Stack | Descrição (≤ 220) | Links | Imagem |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Liftech | 2026 | TypeScript, Node.js, Express, MongoDB, React, Vitest | Monorepo TypeScript com API Express e MongoDB organizada por módulos de domínio, validação por feature e testes com Vitest. Front em React com 7 idiomas. | repo `github.com/RomuuloGoncalves/Liftech` · demo `liftech-pi.vercel.app` **[CONFIRMAR]** | print (T4) ou árvore de pastas |
| 2 | projetoAGX | 2026 | Deno, Express, Mongoose, JWT, Swagger | API de biblioteca com login JWT, permissão por perfil e empréstimo com transação no MongoDB para o estoque não ficar negativo. Tem Swagger e testes de integração. | repo `github.com/RomuuloGoncalves/projetoAGX` | print do Swagger (T4) ou bloco requisição/JSON |
| 3 | Moni | 2026 | Next.js, TypeScript, MongoDB, NextAuth, Vitest | Gestão financeira pessoal: contas, orçamentos, transações recorrentes e metas, com código em repositories e services e testes unitários e de integração. | repo `github.com/RomuuloGoncalves/Moni` · demo `ro-moni.vercel.app` **[CONFIRMAR]** | print (T4) ou só texto |
| 4 | soloTrack | 2026 | Laravel, TypeScript, C++, Docker, OpenAPI | Projeto em equipe: sensores com firmware em C++ mandam leituras para uma API Laravel, com front em TypeScript. Sobe com docker-compose. | repo `github.com/RomuuloGoncalves/soloTrack` · demo `solotrack-beta.vercel.app` | print (T4) ou só texto |
| 5 | ONGFlow | 2025 | Laravel 12, React, Vite, GitHub Actions | Projeto em equipe que liga voluntários a ONGs. API em Laravel, front em React e deploy automático pelo GitHub Actions. | repo `github.com/RomuuloGoncalves/ONGFlow` · demo `romuulogoncalves.github.io/ONGFlow/` | print (T4) ou só texto |

## Outros projetos

| Nome | Ano | Stack | Linha | Link | Miniatura |
| --- | --- | --- | --- | --- | --- |
| lauressucrier (freela, privado) | 2026 | Vite, Three.js, GSAP, Vitest | Landing page 3D feita como freela, com Three.js, GSAP e testes em Vitest. | demo **[CONFIRMAR URL, D-16]**; sem repo | print (T4) ou sem miniatura |
| ATOMOX | 2024 | ESP32, C++, JavaScript | Monitor de qualidade do ar com ESP32 e interface web com dados em tempo real. | repo `Projeto-Integrador` | `src/assets/img/atomox.png` |
| Mini interpretador | 2025 | Python, PLY | Trabalho de compiladores: análise léxica e sintática com PLY, tabela de símbolos e tratamento de erros. | repo `calculadora_compiladores` | `src/assets/img/calculadoraLexica.png` (converter, 2,8 MB) |

Saem: TO DO, Calculadora, Gerador de Senha, Jogo da Velha, Pedra/Papel/Tesoura, Clone Discord, API Países, dois repositórios privados (D-10). GeoLab e TCC-Delivery ficam fora como no C **[CONFIRMAR]**.

## Stack

Marquee (D-11): Node.js, TypeScript, MongoDB, Express, Deno, PHP, Laravel, MySQL, Docker, Git, Linux, Vitest, Swagger, Vue.js, React, Next.js.

Matriz:

| Grupo | Itens |
| --- | --- |
| Back-end | Node.js, TypeScript, Express, Deno, PHP, Laravel, Lumen, API REST |
| Persistência | MongoDB, Mongoose, Aggregation Framework, índices, modelagem NoSQL, MySQL, SQL |
| Infra e qualidade | Docker, Linux, Git, GitHub, Vitest, Supertest, OpenAPI/Swagger, Scrum, Kanban |
| Interface | React, Next.js, Vue.js, Angular, Ionic, JavaScript, HTML/CSS |

Saem: Photoshop, GIMP, Figma, Bootstrap, SCSS, Firebase **[CONFIRMAR]**.

## Certificados e reconhecimento

| Nome | Emissor | Data | Credencial |
| --- | --- | --- | --- |
| MongoDB Node.js Developer Path | MongoDB | 05/2026 | ID `MDBz8yqgb1ahv` **[CONFIRMAR URL]** |
| MongoDB Data Modeling Path | MongoDB | 04/2026 | ID `MDBjqyw6ftv4n` **[CONFIRMAR URL]** |
| Introduction to MongoDB | MongoDB | 04/2026 | ID `MDBst43cbdxts` **[CONFIRMAR URL]** |
| Curso de Docker | Udemy | 02/2026 | sem ID: não renderizar `<code>` (CERT-02) |
| Aluno Top da Uniso, 5 vezes | Universidade de Sorocaba | — | sem ID: não renderizar `<code>` |

## Contato

- Título: "Contato" (COPY-05). Sem subtítulo de vaga, a menos que D-12 confirme que está aberto a propostas.
- romulogoncalves13@gmail.com + botão "Copiar" · GitHub · LinkedIn. Instagram sai (D-09).
- Rodapé: "© 2026 Rômulo Gonçalves · Código deste site".

## Lista proibida (COPY-02)

apaixonado, paixão, alto impacto, soluções inovadoras, inovador, transformam, dinâmicas, robustas, robusto, de ponta a ponta, sólida, jornada, trajetória de sucesso, tecnologias modernas, sistêmicas, alta performance, de verdade, vamos conversar, "!".

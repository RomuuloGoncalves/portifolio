# LinkedIn x Portfólio: certificados, skills e divergências

Fonte: https://www.linkedin.com/in/romuulogoncalves/ (logado, leitura em 2026-10-29) e `src/views/HomePage.vue`.
Nada foi clicado que publique ou envie. Os links de credencial não foram abertos; só os códigos exibidos foram lidos.

## 1. Licenças e certificados (LinkedIn)

| # | Nome | Emissor | Emissão | Credential ID |
|---|------|---------|---------|---------------|
| 1 | MongoDB Node.js Developer Path | MongoDB | mai/2026 | `MDBz8yqgb1ahv` (skills: Aggregation Framework, Database Indexing) |
| 2 | MongoDB Data Modeling Path | MongoDB | abr/2026 | `MDBjqyw6ftv4n` (skills: Modelagem de dados, NoSQL) |
| 3 | Introduction to MongoDB | MongoDB | abr/2026 | `MDBst43cbdxts` (skill: MongoDB Atlas) |
| 4 | Curso de Docker | Udemy | fev/2026 | sem ID; anexo `curso-docker.pdf` (skill: Docker) |
| 5 | XIV Semana das Engenharias: Radiações na Indústria: da inspeção de materiais ao controle de processo | Even3 | out/2026 | `13967210.83950755.8033009.8.06532948061431184004468` |
| 6 | XIV Semana das Engenharias: Protagonismo na Carreira: do Autoconhecimento à Ação Estratégica | Even3 | out/2026 | `13967210.83950755.8033622.8.06532948061431184005228` |
| 7 | XIV Semana das Engenharias: Impulsionando a carreira com a AEAS | Even3 | out/2026 | `13967210.83950755.8084468.8.06532948061431184877588` |
| 8 | XIV Semana das Engenharias: Cultura Maker: onde ela pode te levar | Even3 | out/2026 | `13967210.83950755.8033048.8.06532948061431184004788` |
| 9 | XIV Semana das Engenharias: A Engenharia do Sorvete | Even3 | out/2026 | `13967210.83950755.8039667.8.06532948061431184065538` |
| 10 | Certificado de Atividade: XII Semana das Engenharias e Ciências Exatas da Uniso | Even3 | out/2024 | `18902453.83950755.129199.8.8902453839507551291998` (anexo `computacao-quantica.pdf`) |

Observações:
- Os links públicos ("Exibir credencial") só aparecem no item 10; os demais não mostram URL no texto da página.
- Para o portfólio, os relevantes são 1 a 4 (MongoDB e Docker). Os itens 5 a 10 são eventos da Uniso; agrupar em uma linha ("Semanas das Engenharias Uniso 2024 e 2026") ou omitir.
- Reconhecimentos (posts): **Aluno Top da Uniso** 5 vezes. A última foi anunciada em 16/out (1º semestre/2026), a 4ª em 27/abr/2026, a 3ª em 17/out/2025. Candidato a destaque na seção Educação.

## 2. Perfil LinkedIn (resumo)

- Título: Desenvolvedor Back-end @ AGX Software | Eng. da Computação | Node.js • TypeScript • MongoDB
- Local: Sorocaba, SP. Mais de 500 conexões e 1.734 seguidores.
- Destaques: link do portfólio (https://romuulogoncalves.github.io/portifolio/) e GitHub.
- Sobre: estudante de Eng. da Computação (UNISO) e dev back-end na AGX (Node.js, TypeScript, MongoDB). Antes, estágio e depois Full Stack em sistema de gestão escolar (PHP, Laravel, MySQL; matrículas e financeiro, tickets, bugs, otimização de APIs). Projetos em equipe: **SoloTrack** (sensores IoT, API Laravel, agente de IA via MCP, front React) e **ONGFlow** (ONGs x voluntários, Laravel + React).

### Experiência
| Cargo | Empresa | Período | Notas |
|-------|---------|---------|-------|
| Desenvolvedor Back-end | AGX Software (tempo integral, presencial, Sorocaba) | abr/2026 – atual | skills: Desenvolvimento de API, API REST e mais 7 |
| Desenvolvedor Full Stack | Education1 (tempo integral, remoto) | nov/2025 – abr/2026 | PHP, Laravel, JavaScript, MySQL, Git; ERP de gestão escolar, matrículas e financeiro, bugs e performance de APIs |
| Estagiário em Desenvolvimento de Sistemas | Education1 (estágio) | out/2024 – nov/2025 | skills: HTML5 e outras |
| Desenvolvedor full stack | Autônomo | jan/2023 – dez/2023 | só "Otimização de página" |

### Formação
- Universidade de Sorocaba: o LinkedIn mostra só a instituição e skills (Pesquisa, C e mais 24). **Curso e datas não aparecem no texto lido**; conferir na página.
- ETEC Sales Gomes, Desenvolvimento de Sistemas, fev/2021 – dez/2023.

### Competências (seção Sobre; a página /details/skills/ veio vazia)
- Back-end: Node.js, TypeScript, PHP, Laravel, Lumen, API REST
- Front-end: React, Angular, Vue.js, Ionic, JavaScript
- Bancos: MongoDB, MySQL, SQL
- Ferramentas: Git, GitHub, Linux, Scrum, Kanban
- Principais (fixadas): Desenvolvimento de front-end, Desenvolvimento de back-end, Git, AngularJS
- Outras citadas em experiências: SQL, jQuery, HTML5, Docker, MongoDB Atlas, Aggregation Framework, Indexing, Modelagem de dados, NoSQL

## 3. Skills do portfólio: adicionar / remover

Portfólio hoje (`categorias`, HomePage.vue ~L529): Back-End = PHP, Laravel, Python, MySQL, Firebase. Front-End = Angular, React, Vue.js, Ionic, TypeScript, JavaScript, SCSS, HTML, CSS, Bootstrap, Tailwind. Ferramentas = Git, Linux, Figma, Photoshop, Gimp, GitHub, Docker.

**Adicionar**
- **Node.js** (Back-End): é o stack atual e está no título do LinkedIn, mas falta nas categorias (só aparece nas tags da AGX).
- **MongoDB** (Back-End): 3 certificados MongoDB e stack atual; só aparece nas tags da AGX.
- **TypeScript**: já existe, mas está em Front-End. Mover para Back-End (ou duplicar), pois no LinkedIn é skill de back-end.
- **API REST**, **Lumen** (Back-End).
- **Scrum, Kanban** (Ferramentas/Metodologias).
- Opcional: **MongoDB Atlas**, **Aggregation Framework**, **Modelagem NoSQL** como sub-itens do MongoDB.
- **SQL** como item próprio (o LinkedIn lista).

**Remover ou rebaixar (não aparecem no LinkedIn)**
- **Firebase, Python, Photoshop, Gimp, Figma, Bootstrap, Tailwind, SCSS**: ausentes no LinkedIn. Não são necessariamente falsos. Confirmar com o dono se ainda usa; se não, remover para alinhar o foco em back-end.
- **Python**: só aparece no LinkedIn em post de terceiro (André Poles), não nas skills do Rômulo.

## 4. Divergências LinkedIn x Portfólio

| Item | LinkedIn | Portfólio | Ação sugerida |
|------|----------|-----------|---------------|
| Nome da empresa | **Education1** | "Education One" | padronizar "Education1" |
| Local do Full Stack | Remoto | "Sorocaba / SP" | corrigir para Remoto |
| Local do estágio | Sorocaba, SP | "Sorocaba" | ok (padronizar "Sorocaba / SP") |
| Estágio: cargo | "Estagiário em Desenvolvimento de Sistemas" | "Estágio em Desenvolvimento de Sistemas" | texto equivalente, ok |
| Cargo AGX | Back-end, presencial, tempo integral, abr/2026 | igual (04/2026) | bate |
| Descrição AGX | LinkedIn sem texto, só skills (API, API REST) | texto próprio (tickets, APIs RESTful) | bate |
| Experiência 2023 (Autônomo, full stack, jan–dez/2023) | existe | **ausente** | adicionar ou ignorar (decisão do dono) |
| Tags do Full Stack | PHP, Laravel, JavaScript, MySQL, Git | "SQL" duplicada nas tags (`SQL` aparece 2x) | remover duplicata; adicionar jQuery |
| Descrição Full Stack | matrículas e financeiro, bugs complexos, otimização de APIs | tickets, ERP, querys SQL, documentação | acrescentar matrículas e financeiro (mais forte) |
| Técnico (ETEC) | Desenvolvimento de Sistemas, fev/2021 – dez/2023 | 02/2021 — 12/2023, "Etec Sales Gomes — Tatuí" | datas batem; LinkedIn não mostra a cidade |
| Uniso: início | não visível | 02/2024 — Presente | verificar na página de formação |
| Texto "Sobre" | cita Node.js/TypeScript/MongoDB, SoloTrack, ONGFlow | só "Back-end", sem tecnologias nem projetos | incluir stack atual e os 2 projetos de equipe |
| Aluno Top Uniso (5x) | destacado em posts | ausente | adicionar em Educação |
| Certificados | 10 itens (4 técnicos) | **nenhuma seção** | criar seção "Certificados" (MongoDB x3, Docker) |
| Título | "Eng. da Computação" + Node.js • TypeScript • MongoDB | "Desenvolvedor Back-end" | incluir stack no hero |
| Anos de experiência | 1º estágio out/2024 (~2 anos); sem versão "2+" explícita | "2+" | ok |

## 5. Pendências / limites

- A página `/details/skills/` carregou vazia no extrator de texto; as skills vieram da seção Sobre e das experiências. Pode haver skills adicionais e contagem de endossos.
- Curso e datas da Uniso e o link público dos certificados MongoDB/Docker não foram lidos. Precisam de conferência manual.
- Nenhum login ou captcha foi pedido. A aba aberta foi usada só para leitura.

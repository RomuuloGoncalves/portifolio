# Revisão de copy do portfólio (src/views/HomePage.vue)

Escopo: todos os textos visíveis da HomePage (navbar, hero, sobre, experiência, educação, projetos, habilidades, contato, rodapé). Nada foi alterado no código. Fatos novos não foram inventados: onde falta dado, está marcado **[CONFIRMAR]**.

Estado dos fatos, tirado do próprio arquivo e usado como base:

- AGX Software, Desenvolvedor Back-end, 04/2026 até hoje. Node.js, TypeScript, MongoDB, Git, GitHub.
- Education One, Desenvolvedor Full Stack, 11/2025 a 04/2026. HTML/CSS, JavaScript, SQL, Git, PHP, Laravel, MySQL.
- Education One, Estágio, 10/2024 a 11/2025. Mesma stack.
- Uniso, Engenharia da Computação, desde 02/2024.
- Etec Sales Gomes (Tatuí), Desenvolvimento de Sistemas, 02/2021 a 12/2023.

## 1. Diagnóstico

### 1.1 Vícios de IA e clichês encontrados

| Onde | Trecho | Problema |
|---|---|---|
| Hero | "apaixonado por criar soluções que transformam o dia a dia de pessoas e empresas por meio do código" | Frase de impacto genérica. Serve para qualquer dev do mundo. Não diz o que ele faz. |
| Sobre | "sistemas complexos e APIs robustas" | "Robusto" e "complexo" são adjetivos de venda sem prova. |
| Sobre | "base sólida para explorar, construir e escalar soluções inovadoras de ponta a ponta" | Tríade forçada (explorar, construir, escalar), "inovadoras", "ponta a ponta". Nada verificável. |
| Sobre | "colaborar com equipes dinâmicas, aprender novas tecnologias e contribuir para a construção de produtos de alto impacto" | Tríade de objetivos, "dinâmicas" e "alto impacto" vazios. Texto de carta de apresentação. |
| Sobre | "Minha jornada na tecnologia começou com..." | "Jornada" é clichê. |
| Sobre (code block) | `paixão: "Resolver problemas reais"`, `foco: "Produtos de impacto"` | Repete o clichê do texto ao lado. |
| Experiência (AGX) | "arquitetura e criação de APIs RESTful utilizando tecnologias modernas" | "Tecnologias modernas" não diz nada, a lista de tags já diz. "Arquitetura" é uma afirmação grande sem detalhe. |
| Experiência (AGX) | "análise e correção de tickets, desenvolvimento de novas funcionalidades sistêmicas" | "Sistêmicas" é palavra de enchimento. |
| Experiência (Education One) | lista de 8 verbos em sequência | Lista de tarefas sem prioridade e sem resultado. Parece cópia de vaga. |
| Educação | "foco em algoritmos, arquitetura de computadores, engenharia de software e desenvolvimento de sistemas de alta performance" | Tríade+1 e "alta performance" sem lastro. Parece texto da grade do curso. |
| Educação | "construir soluções inovadoras desde o início da trajetória" | Repete "soluções inovadoras" e "trajetória". |
| Projetos | "Plataforma criada para conectar voluntários a ONGs, facilitando o engajamento e a gestão de ações sociais" | "Facilitando" é rider genérico. |
| Projetos | "Reprodução fiel", "design moderno", "interface intuitiva", "Aplicativo ... completo" | Adjetivos de venda. "Fiel" e "completo" são afirmações que o visitante não consegue checar. |
| Contato | "Sou apaixonado por resolver problemas reais por meio do código. Se você tem um projeto interessante ou uma oportunidade, ficarei feliz em conversar!" | Repete o hero (paixão, código). Fecha com convite padrão e exclamação. |
| Rodapé | "Desenvolvido com ♥ por..." | Aceitável, mas é o clichê padrão de rodapé de dev. |

### 1.2 Padrões estruturais

- **Palavras repetidas em seções diferentes:** "apaixonado/paixão" aparece 3 vezes (hero, code block, contato). "Resolver problemas reais" aparece 2 vezes. "Soluções" aparece 5 vezes. "Inovadoras", "impacto" e "trajetória" se repetem.
- **Tríades:** explorar/construir/escalar; colaborar/aprender/contribuir; algoritmos/arquitetura/engenharia. Todas sem três ideias distintas.
- **Descrições sem verbo na primeira pessoa:** "Desenvolvimento e manutenção de...", "Análise técnica...", "Implantação de...". Estilo de currículo copiado, sem sujeito.
- **Mistura de idiomas:** nav "Skills", "Scroll para explorar", code block com `cargo: "Back-end Developer"`, hero em "Desenvolvedor Back-end". Decida um idioma só. Termos técnicos (API, back-end, ticket) podem ficar em inglês, o resto em PT-BR.
- **Tom oscila:** o hero e o sobre estão em primeira pessoa ("sou", "me deu"), mas experiência e projetos estão em voz impessoal.
- **Excesso de títulos temáticos "// sobre mim", "// trajetória", "// vamos conversar":** é identidade visual do site, pode ficar. Só manter coerência de caixa e idioma.

## 2. Tom de voz proposto

- **Primeira pessoa, direto.** "Trabalho com", "corrijo", "montei". Sem "apaixonado", "jornada", "soluções inovadoras".
- **Fato antes de adjetivo.** Cada frase diz o que foi feito, com o quê, onde. Se não dá para checar, corta.
- **PT-BR falado, sem formalidade de currículo.** Frases curtas e médias alternadas. Pode usar "a gente" apenas se for natural ao Rômulo **[CONFIRMAR]**.
- **Termos técnicos em inglês só quando são o nome da coisa** (API, back-end, ticket, ERP). O resto em português.
- **Sem travessões, sem tríades por reflexo, sem exclamação.**
- **Um convite só, no contato.** O hero não precisa repetir.

## 3. Reescrita por seção (antes e depois)

### 3.1 Navbar

| Antes | Depois | Motivo |
|---|---|---|
| Sobre / Experiência / Projetos / Skills / Contato | Sobre / Experiência / Projetos / Habilidades / Contato | "Skills" destoa do título da seção ("Habilidades"). Educação não está na nav (decisão de estrutura, não de copy). |

### 3.2 Hero

**Antes**
- Saudação: "Olá, eu sou o"
- Cargo: "Desenvolvedor Back-end"
- Descrição: "Estudante de Engenharia da Computação, apaixonado por criar soluções que transformam o dia a dia de pessoas e empresas por meio do código."
- Botões: "Ver Projetos", "LinkedIn"
- Badge: "Disponível para oportunidades"
- Scroll: "Scroll para explorar"

**Depois**
- Saudação: "Olá, eu sou o"
- Cargo: "Desenvolvedor Back-end" (ver 4.3 sobre a coerência com as habilidades)
- Descrição: "Desenvolvo APIs em Node.js e TypeScript na AGX Software, em Sorocaba. Curso Engenharia da Computação na Uniso."
- Botões: "Ver projetos", "LinkedIn"
- Badge: ver 4.4. Sugestão: "Aberto a conversar" ou remover **[CONFIRMAR]**
- Scroll: "Role para ver mais"

Notas: a descrição nova só usa fatos já presentes na página (AGX, Node.js, TypeScript, Uniso). "Aberto a conversar" é mais fraco que "disponível para oportunidades" e mais honesto se ele está empregado.

### 3.3 Sobre

**Antes**
> Sou Desenvolvedor Back-end com experiência prática na criação e manutenção de **sistemas complexos** e APIs robustas. Minha jornada na tecnologia começou com um curso Técnico em Desenvolvimento de Sistemas, que me deu a base sólida para explorar, construir e escalar soluções inovadoras de ponta a ponta.
>
> Atualmente cursando **Engenharia da Computação** na Uniso, busco constantemente colaborar com equipes dinâmicas, aprender novas tecnologias e contribuir para a construção de **produtos de alto impacto**.

**Depois**
> Sou desenvolvedor back-end. Comecei no curso técnico de Desenvolvimento de Sistemas na Etec de Tatuí, entrei como estagiário na Education One em 2024 e hoje escrevo APIs na AGX Software. Meu dia a dia é analisar tickets, corrigir bugs e criar funcionalidades novas.
>
> Faço Engenharia da Computação na Uniso. Fora do trabalho, tenho projetos próprios, de um app de delivery (meu TCC) a um sistema de monitoramento de ar com ESP32.

Notas: tudo vem das datas e descrições existentes. "Meu dia a dia" resume as tarefas listadas nas experiências. A frase "Fora do trabalho" é inferência razoável (os projetos são pessoais/acadêmicos), mas **[CONFIRMAR]** se os projetos foram só acadêmicos ou também por hobby.

**Estatísticas (stat-items)**

| Antes | Depois | Observação |
|---|---|---|
| 2+ / Anos de experiência | ver 4.2 | |
| 10+ / Projetos realizados | 12 / Projetos no portfólio | O arquivo lista 5 em destaque + 7 outros = 12. |
| 15+ / Tecnologias | 23 / Tecnologias nas habilidades **ou** remover | Contagem real das habilidades é 5 + 11 + 7 = 23, mas inclui Photoshop e Gimp, que não são tecnologias de desenvolvimento. |

**Code block (sobre-mim.ts)**

Antes:
```ts
const romulo = {
  nome: "Rômulo Gonçalves",
  formação: "Eng. Computação",
  cargo: "Back-end Developer",
  paixão: "Resolver problemas reais",
  foco: ["Sistemas back-end", "Criação de APIs REST", "Produtos de impacto"],
};
```

Depois:
```ts
const romulo = {
  nome: "Rômulo Gonçalves",
  formação: "Engenharia da Computação (Uniso)",
  cargo: "Desenvolvedor Back-end",
  empresa: "AGX Software",
  stack: ["Node.js", "TypeScript", "MongoDB"],
};
```

Motivo: tira "paixão" e "produtos de impacto", troca por fatos da página. Corrige a mistura de idioma (`Back-end Developer`). A stack é a da AGX, listada nas tags. O "Eng. Computação" abreviado vira nome completo.

### 3.4 Experiência

**AGX Software, atual**

Antes:
> Desenvolvimento e manutenção de serviços back-end. Atuação focada em análise e correção de tickets, desenvolvimento de novas funcionalidades sistêmicas, e arquitetura e criação de APIs RESTful utilizando tecnologias modernas.

Depois:
> Desenvolvo e mantenho serviços back-end. Analiso e corrijo tickets, crio funcionalidades novas e projeto APIs REST em Node.js e TypeScript, com MongoDB.

Nota: "projeto" no lugar de "arquitetura" é mais modesto e ainda verdadeiro à fonte. **[CONFIRMAR]** se ele realmente desenha as APIs do zero ou implementa sobre desenho existente.

**Education One, Full Stack**

Antes:
> Análise técnica dos tickets criados pela equipe de suporte técnico. Correção de erros e manutenção do sistema de ERP de Gestão Escolar. Implantação de melhorias nas plataformas, customização de sistemas, criação de querys SQL, desenvolvimento de funcionalidades e telas, auxílio para a equipe de suporte, criação de documentação e refatoração de código.

Depois:
> Recebia os tickets do suporte, achava a causa e corrigia no ERP de Gestão Escolar. Também criei funcionalidades e telas novas, escrevi queries SQL, customizei sistemas, ajudei o suporte, documentei e refatorei código.

Nota: "querys" estava errado; o plural correto em PT-BR é "queries". A lista fica porque cada item é tarefa real, mas passa para a primeira pessoa e ganha uma ordem (o que chegava, o que fazia).

**Education One, Estágio**

Antes:
> Análise técnica dos tickets. Correção de bugs. Implantação de melhorias nas plataformas. Customização de sistemas.

Depois:
> Analisava tickets, corrigia bugs, implantava melhorias nas plataformas e customizava sistemas.

Nota de consistência: a empresa aparece como "Sorocaba / SP" no cargo Full Stack e só "Sorocaba" no estágio. Padronizar para "Education One, Sorocaba / SP".

Separador entre empresa e cidade: o código usa travessão ("AGX Software — Sorocaba / SP"). Trocar por vírgula ou ponto médio ("AGX Software · Sorocaba / SP"). Mesma coisa nas datas ("04/2026 — Presente" pode virar "04/2026 a hoje").

### 3.5 Educação

**Engenharia da Computação**

Antes:
> Graduação em andamento com foco em algoritmos, arquitetura de computadores, engenharia de software e desenvolvimento de sistemas de alta performance.

Depois:
> Graduação em andamento. **[CONFIRMAR]** quais matérias ele quer destacar (ex.: compiladores, que aparece no projeto do interpretador matemático; IoT, que aparece no ATOMOX) e em que semestre está.

Se ele não quiser detalhar: "Graduação em andamento, 02/2024 até hoje." e nada mais. Melhor curto e verdadeiro do que listar a grade.

**Desenvolvimento de Sistemas (Etec)**

Antes:
> Curso técnico integrado ao ensino médio com formação completa em lógica de programação, estrutura de dados, banco de dados e desenvolvimento web. Base sólida que permitiu explorar e construir soluções inovadoras desde o início da trajetória.

Depois:
> Curso técnico integrado ao ensino médio. Estudei lógica de programação, estrutura de dados, banco de dados e desenvolvimento web. Meu TCC foi o app de delivery.

Nota: "TCC" aparece em "APP Delivery" na seção de projetos, mas a página não diz de qual curso é o TCC. Etec ou Uniso? **[CONFIRMAR]** antes de publicar a última frase.

Também: o badge do primeiro item usa "Cursando" e o segundo "Concluído". Ok. Só que a data "02/2021 a 12/2023" mais curso "integrado ao ensino médio" fecha em 3 anos, coerente.

### 3.6 Projetos

Título da seção: "Projetos em destaque" → manter. Tag: "// meus projetos" → "// projetos" (o "meus" é redundante).

| Projeto | Antes | Depois |
|---|---|---|
| OngFlow | "Plataforma criada para conectar voluntários a ONGs, facilitando o engajamento e a gestão de ações sociais." | "Plataforma que conecta voluntários a ONGs e ajuda as ONGs a organizar suas ações." |
| APP Delivery | "Aplicativo de delivery completo para TCC, com funcionalidades para clientes e painel de gerenciamento para a loja." | "App de delivery do meu TCC. Tem a área do cliente e um painel para a loja gerenciar os pedidos." **[CONFIRMAR]** que o painel gerencia pedidos (o original diz só "gerenciamento para a loja"). Sem confirmação, usar "painel de gerenciamento para a loja". |
| Mini Interpretador Matemático | "Projeto acadêmico de compiladores que implementa um analisador léxico e sintático com PLY. Possui tabela de símbolos, regras de precedência, avaliação de expressões, verificação de overflow (-1023 a 1023) e tratamento de erros léxicos, sintáticos e semânticos." | "Trabalho de compiladores da faculdade. Faz análise léxica e sintática com PLY, avalia expressões e trata erros léxicos, sintáticos e semânticos. Tem tabela de símbolos, regras de precedência e checagem de overflow (de -1023 a 1023)." Mais curto que o original, mesma informação. |
| ATOMOX | "Sistema de monitoramento de qualidade do ar utilizando ESP32 com interface web responsiva e em tempo real." | "Monitor de qualidade do ar com ESP32 e uma interface web que mostra os dados em tempo real." |
| TO DO App | "Aplicação para criar e planejar tarefas com interface intuitiva." | "Lista de tarefas para criar e organizar o que fazer." |
| GeoLab | "Aplicativo educacional com salas virtuais e visualização de objetos 3D em realidade aumentada." | "App educacional com salas virtuais e objetos 3D em realidade aumentada." |
| Clone Discord | "Reprodução fiel da landing page do Discord." | "Réplica da landing page do Discord, só com HTML e Tailwind." |
| Calculadora | "Calculadora funcional com design moderno." | "Calculadora em JavaScript e CSS." |
| API Países | "Aplicação que consome API para exibir informações detalhadas sobre países." | "Consome uma API pública e mostra os dados de cada país." **[CONFIRMAR]** que a API é pública (a descrição original só diz "API"). |
| Gerador de Senha | "Gerador de senhas seguras com diferentes critérios configuráveis." | "Gerador de senhas em que dá para escolher os critérios." |
| Jogo da Velha | "Versão digital interativa do clássico jogo da velha." | "Jogo da velha para dois jogadores." **[CONFIRMAR]** (o original não diz se é contra a máquina). Alternativa neutra: "Jogo da velha no navegador." |
| Pedra, Papel, Tesoura | "Jogo interativo contra o computador com placar." | "Pedra, papel e tesoura contra o computador, com placar." |

Rótulos: "Outros projetos" → manter.

### 3.7 Habilidades

Título e tag: "// tecnologias" / "Habilidades". Manter.

Categorias: "Back-End" e "Front-End" têm hífen e caixa diferentes do resto do site ("Back-end" no hero). Padronizar "Back-end" e "Front-end".

Conteúdo: ver 4.3 (faltam Node.js e MongoDB, que são a stack atual).

### 3.8 Contato

**Antes**
- Tag: "// vamos conversar"
- Título: "Entre em contato."
- Texto: "Sou apaixonado por resolver problemas reais por meio do código. Se você tem um projeto interessante ou uma oportunidade, ficarei feliz em conversar!"

**Depois**
- Tag: "// contato"
- Título: "Vamos conversar."
- Texto: "Se você tem uma vaga, um projeto ou só quer trocar uma ideia sobre back-end, me escreve."

Notas: tira "apaixonado" (repetido), tira a exclamação, e o convite fica concreto. "Vaga" só vale se ele estiver aberto a propostas **[CONFIRMAR]** (mesma dúvida do badge do hero).

### 3.9 Rodapé

| Antes | Depois |
|---|---|
| "Desenvolvido com ♥ por Rômulo Gonçalves" | "Feito por Rômulo Gonçalves" |
| "© 2026" | "© 2026" (ou ano calculado em código para não ficar desatualizado) |

## 4. Inconsistências a corrigir

### 4.1 Tag SQL duplicada
Experiência Full Stack (Education One) tem `SQL` duas vezes (3ª e última tag). Remover a última. Aproveitar para ordenar: linguagens, depois frameworks, depois banco, depois ferramentas. Sugestão: `PHP, Laravel, JavaScript, HTML/CSS, MySQL, SQL, Git`.

### 4.2 "Anos de experiência: 2+" vs datas reais
- Primeira experiência profissional: estágio 10/2024.
- Hoje (10/2026): exatamente 2 anos, sem lacunas (10/2024 a 11/2025 estágio, 11/2025 a 04/2026 full stack, 04/2026 até hoje).
- "2+" está no limite: passa a ser verdadeiro "+" só depois de 10/2026 e está hardcoded, vai ficar errado quando o número mudar.

Opções, em ordem de preferência:
1. Calcular no código a partir de 10/2024 e mostrar "2 anos" / "3 anos". Texto: "Anos de experiência profissional".
2. Trocar por fato fixo: "Desde 2024 em desenvolvimento".
3. Remover o stat.

Atenção: "experiência" aqui conta estágio. Se ele quiser separar, o rótulo pode ser "Anos programando profissionalmente" **[CONFIRMAR]**.

### 4.3 Headline "Back-end" vs skills
- Hero e experiência atual dizem "Desenvolvedor Back-end".
- Skills: a categoria Back-end tem só 5 itens (PHP, Laravel, Python, MySQL, Firebase). Front-end tem 11. Node.js, MongoDB e TypeScript (stack atual da AGX) não aparecem em Back-end (TypeScript está em Front-end; Node.js e MongoDB não aparecem em lugar nenhum).
- Projetos em destaque são quase todos front-end/mobile (Vue, Angular, Ionic).

Correções de copy/dados:
1. Adicionar Node.js e MongoDB a Back-end. Mover ou duplicar TypeScript em Back-end. Precisa de ícone SVG novo **[CONFIRMAR]** (não há `node.svg`/`mongodb.svg` visto nesta leitura).
2. Reordenar para a stack atual vir primeiro: Node.js, TypeScript, MongoDB, depois PHP, Laravel, MySQL, Python, Firebase.
3. Considerar renomear o rótulo "Front-End" para "Front-end e mobile" por causa de Ionic, ou deixar como está.
4. Se ele preferir um perfil mais amplo, a headline "Desenvolvedor Back-end" ainda é defensável pelo emprego atual, mas o portfólio deveria mostrar pelo menos um projeto back-end. **[CONFIRMAR]** se existe algum repositório de API para colocar em destaque.

### 4.4 "Disponível para oportunidades" com emprego atual
O hero diz "Disponível para oportunidades", mas a experiência atual está marcada "Atual" na AGX. Não é contradição obrigatória (pode estar aberto a propostas), mas o visitante vai estranhar. **[CONFIRMAR]** com o usuário. Se não está procurando, trocar por "Em Sorocaba / SP" ou remover o badge.

### 4.5 Outras
- "Sorocaba / SP" com espaços em volta da barra em umas linhas e "Sorocaba" sem estado em outra (estágio). Padronizar.
- Idioma: "Skills" na nav, "Scroll para explorar", `Back-end Developer` no code block. Traduzir para PT-BR.
- Caixa de "Back-end": o código usa "Back-end" (hero) e "Back-End" (habilidades). Padronizar em "Back-end".
- Texto "Estudante de Engenharia da Computação" no hero e "Atualmente cursando Engenharia da Computação" no sobre repetem a mesma informação. Com a reescrita deste documento, a Uniso aparece no hero (curta) e no sobre (parágrafo próprio) sem repetir a frase.
- Educação (`#educacao`) existe na página mas não tem botão na nav. Decisão de estrutura, fora do escopo de copy; só registrar.
- Datas: "04/2026 — Presente" e "02/2024 — Presente" usam "Presente". Em PT-BR corrente é "atual" ou "hoje". Sugestão: "04/2026 a hoje".

## 5. Métricas verdadeiras a confirmar com o usuário

Todas abaixo precisam de confirmação antes de entrar no site. Nenhuma foi inventada: são perguntas.

1. **[CONFIRMAR]** Quantas APIs/endpoints ele criou ou mantém na AGX? (ex.: "mantenho X serviços")
2. **[CONFIRMAR]** Quantos tickets resolveu na Education One? O sistema deve ter um painel de tickets com esse número.
3. **[CONFIRMAR]** Quantas escolas/usuários usam o ERP de Gestão Escolar em que trabalhou? É um número público do produto, não privado.
4. **[CONFIRMAR]** Alguma melhoria com resultado medido: tempo de resposta de uma query, redução de tickets recorrentes, tela que foi refeita e substituiu um processo manual.
5. **[CONFIRMAR]** Tamanho da equipe em que trabalha hoje (ex.: "em um time de N devs").
6. **[CONFIRMAR]** Se o ONGFlow, o delivery ou o ATOMOX têm usuários reais, estrelas no GitHub ou demonstração pública. Qualquer número verificável substitui um adjetivo.
7. **[CONFIRMAR]** Média/nota do TCC ou prêmio/feira em que o projeto integrador (ATOMOX) foi apresentado, se existir.
8. **[CONFIRMAR]** Contribuições no GitHub no último ano (dado verificável no perfil público).

Regra de uso: métrica só entra se ele puder explicá-la numa entrevista. Se vier número da empresa, confirmar se é permitido divulgar.

## 6. Resumo das mudanças em uma linha

- Tirar "apaixonado", "soluções inovadoras", "alto impacto", "robustas", "sólida", "jornada", "trajetória" e as tríades.
- Passar todas as descrições para primeira pessoa e verbos concretos.
- Corrigir: SQL duplicada, "querys", idioma misturado, "Back-End"/"Back-end", cidade/estado inconsistentes, "2+ anos" fixo.
- Alinhar headline e habilidades (adicionar Node.js e MongoDB).
- Pendências para o usuário: itens marcados **[CONFIRMAR]** (badge de disponibilidade, métricas, TCC de qual curso, ícones Node/MongoDB).

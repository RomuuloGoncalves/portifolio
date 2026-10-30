# Referências de portfólios com parallax e scroll storytelling

Pesquisa feita em 2026-10-29 com a extensão Claude in Chrome. Nenhum código do projeto foi alterado.

## Como ler este documento

- **Visitado** significa que abri o site, tirei screenshot na dobra inicial e rolei a página. Só descrevo o que vi.
- **Conhecimento prévio** significa que não abri o site nesta sessão. A técnica indicada é o que o site é conhecido por usar e precisa ser conferida no DevTools antes de virar decisão.
- A detecção de bibliotecas por `window.gsap`, `window.Lenis` e `window.THREE` retornou `false` em todos os sites visitados. Isso não prova que não usam essas libs. Os bundles (Vite, Nuxt, Astro) escondem os globals. Só dá para afirmar a técnica abrindo o código ou o painel Animations/Performance.
- O awwwards.com/websites/portfolio/ foi aberto como fonte de curadoria. Ele listou, entre outros, Olivia Arents e Thomas Monavon, que estão abaixo.

## Os portfólios

### 1. Bruno Simon — https://bruno-simon.com (visitado)
- **Screenshot (descrição):** fundo roxo-azulado em grade perspectiva com pequenos "x", e um anel luminoso de loading no centro. Não esperei o carregamento completo.
- **O que torna bom:** o portfólio é um jogo 3D em que você dirige um carro. A navegação é a própria experiência e o visitante lembra dela.
- **Técnica (conhecimento prévio):** Three.js com física. Não é scroll storytelling, é exploração espacial.
- **Evitar copiar:** o roxo da tela de loading é exatamente o tom que sinaliza "gerado por IA" em landing pages comuns. Nele funciona porque é parte de um mundo coerente. Para um portfólio back-end, a lição é a ideia única, não o 3D.

### 2. Lusion — https://lusion.co (visitado, só o preloader)
- **Screenshot (descrição):** tela preta com barra de progresso branca minimalista e contador grande no canto inferior (vi "022").
- **O que torna bom:** preloader com personalidade tipográfica, sem spinner genérico. O contador grande vira elemento de design.
- **Técnica (conhecimento prévio):** WebGL/Three.js com scroll suave. Site em Astro (`_astro/hoisted...js`), confirmado pelo nome do bundle.
- **Evitar copiar:** WebGL pesado é caro para quem não é especialista. Aproveite só a ideia de loading como marca.

### 3. Robb Owen — https://robbowen.digital (visitado)
- **Screenshot (descrição):** fundo azul-gelo claro, ilustração vetorial do próprio autor em traço roxo e azul, título serifado "Hi, my name is Robb." com ponto em ciano. Ao rolar: título "Let's work together." em serifa pesada, linha ciana curta, botão com listras diagonais finas, textura de pontos na lateral e texto vertical de copyright. Uma linha vertical fina desce do topo como indicador de scroll.
- **O que torna bom:** identidade própria em tudo (ilustração, serifa, ponto colorido, texturas de listras e pontos). Os detalhes pequenos dão a sensação de feito à mão.
- **Técnica:** um único `main.js` e sem libs globais detectadas. Parece animação leve em CSS e JS próprio (inferência pela captura, não confirmada).
- **Evitar copiar:** o roxo aqui é traço fino sobre fundo claro, não gradiente. Funciona por causa da ilustração autoral. Sem ilustração própria, o resultado vira genérico.

### 4. Brittany Chiang — https://brittanychiang.com (visitado)
- **Screenshot (descrição):** tema escuro azul-marinho, coluna esquerda fixa com nome, cargo e navegação (About, Experience, Projects) e ícones sociais embaixo. Coluna direita rola com texto e a experiência profissional em linha do tempo, com tags de tecnologia.
- **O que torna bom:** a leitura é imediata. A coluna fixa funciona como índice e o destaque da seção ativa guia o scroll. É o oposto de efeito, e é uma referência forte para um dev back-end que quer ser contratado.
- **Técnica (conhecimento prévio):** layout sticky em CSS e destaque de seção por IntersectionObserver. Sem parallax.
- **Evitar copiar:** é o template mais clonado da web. Copiar o layout dá exatamente o visual de "portfólio de modelo".

### 5. Olivia Arents — https://www.oliviaarents.com (visitado, tela de boot)
- **Screenshot (descrição):** tela preta com "OLIVIAOS 96 / PERSONAL EDITION / CLICK ANYWHERE TO BOOT_" em fonte pixel verde, cursor piscando. Selo "Nominee" do Awwwards na lateral. Não entrei no sistema.
- **O que torna bom:** o conceito (sistema operacional retrô) é o portfólio inteiro. Tem humor e coerência.
- **Técnica:** bundle Vite (`/assets/index-*.js`), sem libs globais. É uma aplicação interativa, não scroll.
- **Evitar copiar:** o conceito é dela. Para um back-end, um tema de terminal é natural, mas é fácil virar clichê hacker verde sobre preto.

### 6. Thomas Monavon — https://www.thomasmonavon.com (visitado, durante o loading)
- **Screenshot (descrição):** fundo branco com contador de porcentagem pequeno no centro (24%) e, ao rolar, imagem de render 3D vermelho e cinza em coluna à esquerda, com outra imagem escura surgindo abaixo em coluna deslocada.
- **O que torna bom:** composição editorial assimétrica, muito espaço em branco, imagens em colunas deslocadas que se movem em velocidades diferentes (parallax de colunas). Contador discreto em vez de barra.
- **Técnica:** Nuxt (`/_nuxt/`). Pela aparência, scroll suave com parallax por camada (inferência).
- **Evitar copiar:** depende de imagens de altíssima qualidade. Sem material visual forte, o branco vira vazio.

### 7. Cassie Evans — https://cassie.codes (visitado, página de despedida)
- **Screenshot (descrição):** fundo preto com formas orgânicas em laranja, creme e cinza, distorcidas como líquido. No centro, uma caixa de texto monoespaçada "Thanks for reading." onde ela explica que encerrou o site pessoal.
- **O que torna bom:** referência histórica de animação com GSAP (a própria autora diz que continua no universo GSAP). A caixa monoespaçada e o texto pessoal soam humanos.
- **Técnica:** o site atual é um canvas/shader. Não há GSAP global detectado, e a versão anterior com scroll storytelling não existe mais no ar. Pesquise vídeos e posts dela se precisar do detalhe.
- **Evitar copiar:** o site foi desativado. Serve de lembrete de que a voz pessoal pesa mais que o efeito.

### 8. Dennis Snellenberg — https://dennissnellenberg.com (conhecimento prévio, não visitado)
- **O que torna bom:** premiado no Awwwards, com transições de página, cursor customizado magnético e tipografia grande. Hoje é referência para freelancers.
- **Técnica conhecida:** GSAP (incluindo ScrollTrigger) com scroll suave tipo Lenis ou Locomotive. Confirmar no DevTools.
- **Evitar copiar:** o cursor magnético e o texto gigante já viraram padrão repetido em templates.

### 9. Active Theory — https://activetheory.net (conhecimento prévio, não visitado)
- **O que torna bom:** WebGL em escala de estúdio, com narrativa de cena contínua.
- **Técnica conhecida:** engine própria (Hydra) em WebGL.
- **Evitar copiar:** inviável para um dev solo e foge do foco de um back-end.

## Técnicas para ter em mente

| Técnica | Quando usar | Observação |
|---|---|---|
| GSAP ScrollTrigger (pin + scrub) | Seção que conta uma história em etapas | Maduro e amplamente suportado. Usar `gsap.matchMedia()` para respeitar `prefers-reduced-motion` |
| CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`) | Parallax simples, barra de progresso, reveal | O Chrome usado nesta pesquisa retornou `true` em `CSS.supports('animation-timeline: scroll()')`. Para Safari e Firefox, manter fallback sem animação |
| Sticky + IntersectionObserver | Índice lateral e destaque de seção (caso Brittany Chiang) | Sem dependência, o mais barato |
| Lenis (scroll suave) | Só se o efeito pedir | Pode brigar com scroll nativo e acessibilidade |
| WebGL / Three.js | Só se for o conceito | Alto custo de manutenção e desempenho |

## O que evita parecer "gerado por IA"

Padrões a evitar, com o que fazer em vez disso:

- **Gradiente roxo/azul no hero.** Use uma paleta curta de 2 a 3 cores com um acento só, tirada do seu conteúdo.
- **Cards de vidro (glassmorphism) iguais em grade.** Use listas, linhas separadas por filetes finos e tabelas, que combinam com quem trabalha com dados.
- **Orbs e blobs desfocados no fundo.** Se precisar de fundo, use textura simples (grade, pontos, ruído) como no Robb Owen.
- **Ícones em emoji nos títulos de seção.** Use tipografia, números de seção ou SVG próprio e consistente.
- **Texto de marketing genérico** ("passionate developer", "building the future"). Escreva frases concretas sobre o que você construiu.
- **Três cards de features e botão "Get in touch" centralizado.** Quebre a simetria com alinhamento à esquerda, colunas desiguais e escala de texto contrastante.
- **Animação de entrada em tudo (fade-up em cada bloco).** Anime pouco, com propósito, e só o que ajuda a entender.

## 5 princípios de design para um dev back-end

1. **Conte uma história com dados reais.** Um scroll storytelling de back-end pode seguir o caminho de uma requisição (cliente, API, fila, banco, resposta), com números reais de projetos (latência, volume, uptime). Isso é conteúdo que um front-end puro não tem.
2. **Uma ideia visual, não várias.** Escolha um conceito (terminal, diagrama de arquitetura, log em tempo real) e aplique em tudo. Olivia Arents e Bruno Simon vencem por coerência, não por efeito.
3. **Legibilidade antes de efeito.** Brittany Chiang mostra que índice fixo e texto claro convertem melhor que parallax. Use animação só em um ou dois momentos de destaque.
4. **Animação com função, leve e acessível.** Prefira CSS scroll-driven ou GSAP ScrollTrigger com pin só onde houver narrativa. Respeite `prefers-reduced-motion` e mantenha o conteúdo legível sem JS.
5. **Identidade autoral nos detalhes.** Uma fonte escolhida com cuidado, um acento de cor, filetes, texturas simples e linguagem própria (como a ilustração de Robb Owen) pesam mais que gradientes. Se um detalhe puder aparecer em qualquer template, troque.

## Limitações

- Visitei 7 sites e descrevi só a dobra inicial e a primeira rolagem. Dois (Bruno Simon e Lusion) foram vistos só durante o carregamento. Os dois últimos (Dennis Snellenberg e Active Theory) vêm de conhecimento prévio e não foram abertos.
- Não consegui confirmar o stack real de nenhum site por inspeção de código. Os valores de `false` para GSAP e Lenis refletem apenas variáveis globais.
- Os sites da lista do Awwwards são carregados dinamicamente, então a lista cobriu pouco além de nomes.

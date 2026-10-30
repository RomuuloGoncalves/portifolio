# Review "anti-aparência de IA": prototype-c

Método: leitura de `index.html` e `style.css`; navegador em 1440px (escuro e claro) e 375px (escuro e claro, via dois iframes de 375px porque a janela não encolheu abaixo de 1440). Só crítica, o protótipo não foi editado.

## O que está bom e deve ficar

- Paleta de um acento só (sálvia/musgo), sem gradiente, glow ou sombra. Grafite quente e papel neutro. É o maior ganho contra o visual de template.
- Geist + Geist Mono: tipografia sóbria, mono usado com função (datas, rota, tags, código), não como enfeite.
- Barra `GET /rota` + popover: ideia própria, coerente com back-end, funciona em 375px (vira `RG`).
- Histórico em changelog (marcador quadrado para trabalho, redondo para estudo), sem cards.
- Pipeline Inspector: código real, com conteúdo; no mobile empilha bem. É o diferencial do site.
- `.principles`, `.matrix`, `.certs`: listas com filete, sem caixas e sem ícone em círculo.
- Textos em pt-BR concretos (ticket, matrícula, transação, estoque), sem "apaixonado por", "soluções inovadoras".
- Hero sem gradiente e sem "Olá, eu sou"; foto com `grayscale(0.25)` e raio de 4px.
- `.others` como linhas com miniatura, não como segundo grid de cards.

## Ajustes priorizados

### Alta

1. **Cards de projeto com diagrama de caixinhas (`.shot--diagram`, `.flow`)**: 3 dos 5 cards usam o mesmo "fluxograma de 4 caixinhas", e é o padrão de ilustração que mais lembra gerador de template. No desktop o card `.project--lead` ocupa duas linhas com `flex:1; min-height:360px`, e o diagrama (12px) fica solto no fundo de uma área quase vazia (visto em 1440px). Opções: (a) trocar por print real (já há `<!-- TROCAR POR PRINT REAL -->`), (b) para o Liftech, usar um trecho real da árvore de pastas (`src/modules/emprestimo/…`) em mono, que é mais honesto que um boxes-and-arrows, (c) no mínimo, alinhar `.project--lead .shot--diagram` com `place-items:center` real e tirar o `min-height:360px`, ou tirar o `grid-row: span 2` do lead.
2. **Bloco terminal do projetoAGX no tema claro (`.shot--term`, `--bg-terminal`)**: um retângulo preto chapado dentro de um card claro, com 5 linhas pequenas e muito vazio; parece placeholder. Reduzir `aspect-ratio` (ou `aspect-ratio:auto; padding:24px`), aumentar a fonte para 0.8125rem e mostrar uma resposta JSON curta (`{ "id": "…", "estoque": 3 }`). Em claro, usar `--bg-elevated` com texto escuro, e deixar o preto só no escuro.
3. **Marca d'água `01_SOBRE … 06_CONTATO` (`.section-watermark`)**: texto mono gigante atrás de cada título, com parallax. É ornamento puro e repete 6 vezes; aparece cortado na borda direita e disputa com o `h2` (ver "03_PIPELINE" sobre o título). Remover, ou manter só o número pequeno ao lado do título (`01 / sobre` em `--text-muted`, 0.8125rem mono). Se ficar, tirar o parallax (`px-mark`).
4. **Placeholders visíveis**: `.others__thumb--empty` ("Three.js" em caixa tracejada) lê como "imagem faltando". Trocar por print real do lauressucrier ou remover a miniatura dessa linha (a grade da linha já suporta `grid-template-columns:1fr auto`). Idem `<code></code>` vazios em `.certs` (Docker, Aluno Top): omitir o elemento em vez de deixar coluna vazia.

### Média

5. **Grade de blueprint fixa no fundo (`.layer-grid`, `--grid-line`) e repetida em `.shot--diagram`**: o quadriculado de 48px sobre a página toda é um clichê "dev/blueprint". Já está discreto (3,5% de opacidade), mas tem parallax. Sugestão: manter só dentro de `.shot--diagram` (se este ficar) e remover o `.layer-grid` e o `px-grid`. Ganha silêncio visual e performance.
6. **Barra de progresso de scroll (`.navbar-scroll-progress`)** em verde na base do header: detalhe de template/blog. Remover; a rota `GET /xxx` já informa onde o leitor está.
7. **Marquee de logos (`.marquee`)**: carrossel infinito de logotipos é o ornamento "stack" mais comum em templates de portfólio, e repete a matriz logo abaixo (`.matrix`). Duplicação de informação. Remover o marquee e manter a matriz, ou trocar por uma linha estática de logos monocromáticos pequenos (`.marquee ul{flex-wrap:wrap}` sem animação).
8. **Hero (`.hero__grid`, `.photo`)**: composição texto à esquerda + retrato à direita com moldura é a mais comum possível. O contraste é bom, mas falta um traço do autor. Opções baratas: legenda mono sob o retrato (`Sorocaba/SP · AGX Software`), ou uma linha de status mono acima do nome (`Disponível a partir de…` só se for verdade, ver `[CONFIRMAR]`). Não adicionar badge "Open to work" verde pulsando.
9. **Tags em mono sem borda (`.tags`)** estão ótimas, mas há uma sequência repetitiva: toda entrada de histórico e todo projeto termina com a mesma linha de 4–6 tags. No histórico, remover as tags do emprego atual (repete "Node.js, TypeScript, MongoDB" já dito na frase acima).
10. **Botão primário sálvia no escuro (`.btn--primary`, `#7FA88B` com texto `#151513`)**: legível, mas é o único bloco de cor cheia da home e se parece com os verdes de "dashboard". Opcional: acento um pouco mais quente/amarelado (ver paleta).
11. **Pipeline: nó ativo em preenchimento total (`.pipe__nodes .active button`)** é o elemento mais chamativo da seção e se parece com "stepper" de formulário. Trocar por borda de acento + `--accent-soft` no fundo (como `.scenarios button[aria-selected]`), para os dois controles falarem a mesma língua.

### Baixa

12. **Texto**: "Repositórios públicos com back-end de verdade." (`#projetos .section__sub`) soa como slogan; trocar por algo factual ("Cinco projetos com API, banco e testes; links para o código."). "Trabalho e graduação acontecendo ao mesmo tempo." (`#historico .section__sub`) está bom. "Vamos conversar" é o título padrão de contato em qualquer template: "Contato" ou o e-mail como título resolve.
13. **Princípios em `.principles` (3 itens com títulos tipo "Integridade e modelagem / Contratos estritos / Correção na causa")**: o terceiro, "Correção na causa", e a frase "Ticket bom é ticket que não volta" são boa voz. Os dois primeiros ficam abstratos ("Contratos estritos"); trocar o título por um fato curto ("OpenAPI em todo endpoint").
14. **Ritmo vertical**: todas as seções têm `padding:96/128px` iguais, com `border-top` e mesmo cabeçalho (`h2` + sub). Ritmo uniforme demais. Variar: Sobre mais compacto (80px), Contato sem sub e com menos altura, Projetos mantém 128px.
15. **Seta `↗` nos links** é aceitável; manter só uma convenção (em `.links` e em `.others`, já iguais).
16. **Foto**: JPEG 3000×4000 (já anotado com `ponytail:`). Gerar WebP/AVIF para a versão final.
17. **`.pill--ok` "Atual"** em verde com borda: pequena, ok; só garantir que seja a única pill colorida.
18. **Mobile 375px**: sem overflow horizontal (`scrollWidth 360` com a barra de rolagem). `.scenarios` em 2 colunas quebra "projetoAGX: empréstimo" em duas linhas; aceitável. Hero no mobile empilha com a foto abaixo dos botões, bom.

## Paleta e tipografia

Manter. Só dois ajustes opcionais:

- **Acento escuro**: `#7FA88B` é correto, mas fica frio-esverdeado de UI. Um tom mais seco, como `#8FAE8B` (sálvia amarelada) ou `#A3B18A`, aproxima de papel e tinta. Conferir contraste contra `#151513` (>= 4.5:1 para texto) e do texto do botão.
- **Claro**: `#EDEDE8` / `#F7F7F4` está bem; o `--bg-terminal` preto no claro é o ponto de maior contraste da página (ver item 2). Alternativa: `#1F201C` em vez de `#10100E` no claro.
- **Tipografia**: Geist para texto e Geist Mono para dados está bom. O que ainda soa a template é o `letter-spacing` negativo em todos os títulos (`-0.03em` a `-0.035em`, `.hero__name`, `.section__title`, `.contact__mail a`). Reduzir para `-0.02em`/`-0.025em` e usar peso 500 em vez de 600 nos `h2` deixa mais editorial e menos "landing SaaS". Não é obrigatório.
- **Hierarquia**: `.prose__lead` (1.25–1.5rem) está acima do corpo (`--text-lg`), bom contraste. Manter.

## Notas de verificação

- 1440px: janela real de 1440px. 375px: renderizado em iframe de 375px, escuro e claro lado a lado; vi hero, projetos, pipeline e histórico. Não vi Stack, Certificados e Contato em 375px.
- Nenhum arquivo do protótipo foi alterado. Sem banco de dados, sem commit.

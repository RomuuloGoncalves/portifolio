# Prints do soloTrack

Arquivos (1440x900, só o conteúdo da página):
- `home-1440.png`: landing pública
- `visao-geral-1440.png`: dashboard (KPIs + gráficos)
- `gestao-propriedade-1440.png`: tela de gestão da propriedade

## Como foram gerados (sem banco, sem back-end)

1. `gh repo clone RomuuloGoncalves/soloTrack <scratch>/soloTrack -- --depth 1`
2. `cd Frontend && npm install && npx vite --port 5199 --strictPort` (só o front; o back-end **não** foi iniciado)
3. Script Playwright (`playwright-core` + Google Chrome do sistema, viewport 1440x900) que intercepta `**/api/**` no navegador (`context.route`) e responde JSON fictício para `/api/propriedades`, `/api/areas-plantio`, `/api/visao-geral` e `/api/visao-geral/filtros`. Sessão simulada com cookie `token=mock` e `localStorage.usuario` fictício (`Usuário Demo`, sem e-mail). Nenhuma requisição foi para rede/banco.
4. Processo do Vite encerrado ao final (porta 5199 livre).

## Checklist anti-vazamento

- Sem barra de endereço nem devtools (screenshot de página): OK
- Sem token/JWT/chave visível (o cookie `mock` só existe no navegador de teste): OK
- Sem e-mail nem dado real de pessoa (nomes: "Fazenda Exemplo", "Cidade Exemplo", "Usuário Demo"): OK
- Sem URL interna/produção nas imagens: OK
- Sem dado de produção (tudo fictício, valores inventados): OK
- Conferi visualmente os três PNGs: OK

## Não feito

- Versão 390px: o script falhou na rodada mobile e não foi refeito (houve estouro de cota de disco no /tmp durante o `npm install`). Dá para refazer.
- Dispositivos, Finanças, Relatório e Chatbot não foram capturados (os mocks cobrem só 4 rotas).
- A tela de Gestão mostra a aba "Minha fazenda"; a aba "Áreas de plantio" não chegou a abrir no script.

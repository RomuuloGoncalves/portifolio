# Prints do Liftech

Só o **front-end** foi executado. O back-end precisa de MongoDB (`Backend/src/config/conn.ts:16-26`) e **não foi iniciado**; nenhum driver de banco, `.env` ou connection string foi usado ou criado.

## Como foram gerados

1. Clone raso do repo (`gh repo clone RomuuloGoncalves/Liftech ... -- --depth 1`), em pasta temporária fora do portfólio.
2. `cd Frontend && yarn install --frozen-lockfile`
3. `node_modules/.bin/vite --port 5199 --strictPort --host 127.0.0.1` (sem `VITE_API_URL`, então o front aponta para `localhost:3000/api`, onde não há nada rodando).
4. Playwright-core com o Google Chrome headless; `page.route(/\/api\//)` responde todas as chamadas `/api/*` com JSON fictício (máquinas `EMP-01..06`, categorias, setores, operadores "Operador Exemplo N", 1 incidente), e `localStorage` recebe um `token` de texto fixo `token-ficticio` e um usuário "Administrador Exemplo" (`admin@exemplo.test`, empresa "Empresa Exemplo") para passar da tela de login. Nenhuma requisição saiu para a rede.
5. Viewports: 1440x900 e 390x844, `deviceScaleFactor: 1`, captura só da página (`page.screenshot`), sem moldura do navegador.
6. Processo do Vite encerrado ao final (porta 5199 livre).

## Arquivos

- `visao-geral-desktop.png` (1440px): Visão Geral, lista de máquinas com status.
- `frota-desktop.png` (1440px): Gerenciamento da frota por categoria (kanban).
- `visao-geral-mobile.png` (390px): Visão Geral em tela estreita.

## Checklist anti-vazamento

- [x] Sem barra de endereço nem devtools (captura de página, headless).
- [x] Sem token/JWT/chave: o `token` é o texto `token-ficticio`, que nem aparece na tela.
- [x] Sem e-mail ou dados reais: nomes "Operador Exemplo N", "Administrador Exemplo", "Empresa Exemplo"; MACs `00:00:00:00:00:NN`; o e-mail fictício `admin@exemplo.test` não aparece nas imagens.
- [x] Sem URL interna visível nas imagens (conferido olhando cada PNG).
- [x] Sem dado de produção: tudo vem do mock do script, nada do banco do dono.
- Observação: a barra lateral mostra o bloco "DEV: Telas de auth" (links de desenvolvimento do próprio app); não é dado sensível, mas o dono pode preferir recortar. A data "30 Outubro 2026" na Frota é a data do sistema na captura.

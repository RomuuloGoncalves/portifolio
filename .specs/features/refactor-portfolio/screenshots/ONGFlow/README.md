# ONGFlow — prints

Classificação: o app completo **precisa de banco** (Laravel + Eloquent, ver `research/arch-ONGFlow.md` §9); o **front-end roda sem banco**. O back-end NÃO foi subido (regra: nunca acessar banco).

## Comando usado

Front-end (Vite, dev) em porta local livre, a partir de uma cópia de `Frontend/` do commit `175a8bf`:

```sh
cd Frontend && npm ci && npx vite --port 5391 --strictPort
node capture.mjs 5391     # Playwright-core + /usr/bin/google-chrome headless, viewports 1440x900 e 390x844
```

`capture.mjs` (neste diretório) intercepta `**/api/**` no navegador com `page.route` e responde JSON fictício (ONG Exemplo, Voluntário Exemplo A/B/C, Horta Comunitária, Reforço Escolar, Campanha do Agasalho). Nenhuma requisição chega ao proxy do Vite nem a qualquer rede/banco. Um cookie `token=mock` e `localStorage.user` fictícios liberam a `PrivateRoute`.

Arquivos: `home-{desktop,mobile}.png` (página pública), `dashboard-{desktop,mobile}.png` (Dashboard ONG), `projetos-{desktop,mobile}.png` (Lista de projetos ONG).

## Checklist anti-vazamento

- Sem barra de endereço nem devtools (screenshot só da página pelo Playwright): OK
- Sem token/JWT/chave visível (cookie `mock` não aparece na tela): OK
- Sem e-mail ou dados reais de pessoas (nomes "Exemplo A/B/C", "ONG Exemplo"): OK
- Sem URL interna na tela: OK
- Sem dado de produção (API 100% interceptada, `import.meta.env.PROD` falso em dev): OK
- Conferidos visualmente: dashboard-desktop, dashboard-mobile, projetos-desktop, home-desktop. Os demais (home-mobile, projetos-mobile) NÃO foram abertos um a um; usam os mesmos dados fictícios.

Processos encerrados: Vite (porta 5391). Cópia de trabalho com `node_modules` removida.

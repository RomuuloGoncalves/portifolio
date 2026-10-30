# Prints do lauressucrier

Projeto: front-end estático (Vite + Three.js + GSAP). **Sem back-end e sem banco** (ver `../../research/arch-lauressucrier.md`). Nenhum mock foi necessário: o app não faz nenhuma chamada de rede de dados.

## Comando usado

```bash
gh repo clone RomuuloGoncalves/lauressucrier <scratchpad>/repos/lauressucrier -- --depth 1
cp -r <clone> ~/.cache/lauressucrier-run/app && cd ~/.cache/lauressucrier-run/app
npm ci                                   # a pasta /tmp estourou a cota, por isso a cópia em ~/.cache
npx vitest run --exclude '.claude/**'    # 23 arquivos, 133 testes, todos passaram
npx vite --port 5199 --strictPort        # dev server local
# puppeteer-core + /usr/bin/google-chrome headless (swiftshader p/ WebGL), viewport 1440x900 e 390x844 (mobile),
# interceptação de requisições: só localhost passa, todo o resto é abortado (sem rede externa)
```

Servidor Vite e Chrome encerrados ao final.

## Arquivos

- `desktop-hero.png`: hero em 1440x900.
- `mobile-hero.png`: hero em 390x844.

A seção "Escolha o seu doce" (vitrine) foi fotografada, mas **não salva**: as fotos dos cards mostram mãos de uma pessoa real (foto de Instagram). Se o dono quiser essa tela, deve autorizar ou trocar por fotos sem pessoas.

## Checklist anti-vazamento

| Item | Resultado |
| --- | --- |
| Sem barra de endereço/devtools | OK (screenshot da viewport via CDP) |
| Sem token/JWT/chave | OK (não existe no app) |
| Sem e-mail ou dados de pessoas | OK nos 2 prints salvos (só doces recortados, marca e botões). O número de WhatsApp existe só no `href` (`src/lib/content.js:4`), não aparece na tela |
| Sem URL interna | OK |
| Sem dado de produção/banco | OK (não há banco; app local servido do dev server) |
| Fotos | Hero usa recortes de doces sem mãos (`src/lib/textures.js:6`) |

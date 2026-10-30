# Prints dos projetos e classificação por banco (T3 e T4)

Regra: nenhum back-end com banco foi iniciado. Onde o front roda sem banco, a API foi interceptada no navegador com dados fictícios. Checklist anti-vazamento registrado no `README.md` de cada pasta em `screenshots/<projeto>/`.

| Projeto | Classificação | Evidência | Prints |
| --- | --- | --- | --- |
| Liftech | Back-end precisa de MongoDB; front roda sem banco | `conn.ts:16-26`, `autenticar.ts:36` | 3 (1440 x2, 390 x1). Mostra bloco "DEV: Telas de auth" na sidebar: decidir se recorta |
| soloTrack | Back-end precisa de banco; front roda sem banco | `AuthController.php:23`, `docker-compose.yml:32` | 3 (1440). Falta versão 390 px |
| ONGFlow | Back-end precisa de banco; front roda sem banco | Eloquent/Sanctum | 6 (home, dashboard e projetos em 1440 e 390) |
| lauressucrier | Roda sem banco (landing estática) | 133 testes passaram, sem `.env` | 2 (hero 1440 e 390); vitrine fora (mãos de pessoa real) |
| projetoAGX | Precisa de banco; API sem front-end | `connection/conn.ts:24,42` | Nenhum. Opcional: o dono envia print do Swagger ou Postman com dados fictícios |
| Moni | Precisa de banco; Server Components chamam Server Actions | `lib/db/connect.ts:24-29`, `lib/auth/options.ts:28`, `middleware.ts:3-14` | Nenhum. O dono envia 1-3 prints (dashboard, transações, contas) com dados fictícios |

Pendências do usuário: aprovar os prints (SHOT-03); enviar prints de Moni e projetoAGX (D-13 mantém: nada do deploy público).

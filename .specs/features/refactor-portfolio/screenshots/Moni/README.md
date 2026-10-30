# Moni: prints não gerados

**Classificação: precisa de banco.** Nenhum print foi tirado (regra: sem banco, não subir o back-end).

## Motivo
- As telas principais (`/`, `/transactions`, `/accounts`...) são Server Components que chamam Server Actions no servidor para ler dados, ex. `app/(dashboard)/transactions/page.tsx:17-21`. Essas chamadas acontecem no Node, não no navegador, então não dá para simular por interceptação de rede no navegador.
- O login só funciona com usuário no MongoDB: `lib/auth/options.ts:28` (`userRepository.findByEmail`). Sem sessão, `middleware.ts:3-14` redireciona tudo para `/login`.
- Toda leitura chama `connectDB()`, que exige `MONGODB_URI` (`lib/db/connect.ts:24-29`).
- Não foi instalado nada, não foi criado `.env` e nenhum processo foi iniciado. Não houve checklist anti-vazamento a rodar, pois não há imagens.

## O que o dono deve enviar
1-3 capturas feitas por você mesmo, em ambiente local com dados fictícios: dashboard (`/`), lista de transações (`/transactions`) e contas (`/accounts`). Em 1440px (e 390px se quiser). Sem barra de endereço/devtools, sem e-mail ou nomes reais, valores fictícios.

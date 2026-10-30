# Arquitetura: RomuuloGoncalves/Moni

Análise só de leitura (clone raso, `master`). Nenhum banco acessado. Todas as referências são `arquivo:linha` dentro do repo Moni.

## Resumo
Finanças pessoais em **Next.js 16 (App Router) + React 19**, TypeScript, **MongoDB via Mongoose**, auth **next-auth v4 (Credentials, JWT)**. Não há API REST separada: o "back-end" são **Server Actions** (`"use server"`) chamadas direto dos componentes. (`package.json`)

## Árvore de pastas (sem assets)
```
app/
  (auth)/login, register          páginas + register/actions.ts
  (dashboard)/<feature>/{page.tsx,actions.ts,loading.tsx}
     accounts budgets categories goals import merchants recurring transactions
  api/auth/[...nextauth]/route.ts único Route Handler
components/  (ui, dashboard, transactions, accounts, ...)
services/    regra de negócio (*.service.ts + *.test.ts)
repositories/ acesso ao Mongoose (*.repository.ts + *.integration.test.ts)
models/      schemas Mongoose (Account, Budget, Transaction, User, ...)
lib/         auth/options.ts, db/connect.ts, parsers (csv/ofx/pdf), serialize.ts
scripts/     scripts avulsos de manutenção
middleware.ts
.specs/      specs do próprio projeto (tlc-spec-driven)
```

## Ponto de entrada
- Next.js (`next dev` / `next start`, `package.json` scripts). Não há `server.js`/`main`.
- Rotas por convenção de pastas em `app/`. Único endpoint HTTP explícito: `app/api/auth/[...nextauth]/route.ts:4-6` (`NextAuth(authOptions)` exportado como GET/POST).
- Layout das telas logadas: `app/(dashboard)/layout.tsx:4-11`.

## Camadas reais
Existe sim a cadeia **Server Action → service → repository → model**, aplicada de forma consistente:
1. `app/(dashboard)/<feature>/actions.ts` (borda: sessão, `ActionResult`, mapeia erros para texto pt-BR)
2. `services/*.service.ts` (validação e regras, transações Mongo)
3. `repositories/*.repository.ts` (queries Mongoose, sempre filtrando por `userId`)
4. `models/*.ts` (schemas)

Observações: `services/account.service.ts:89-91` é só repasse para o repositório. `transaction.service.ts` importa também `accountRepository` e `categoryRepository` direto (`:4-5`), então o service às vezes pula outro service. Pages (RSC) chamam as actions no servidor, ex.: `transactions/page.tsx:17-21`.

## Middlewares / auth
- `middleware.ts:3-7`: `withAuth` do next-auth, redireciona para `/login`. `matcher` em `:12-14` libera `login|register|api/auth|_next/static|_next/image|favicon.ico`.
- `lib/auth/options.ts:9-12`: sessão `jwt`, 30 dias. `:23-44` `authorize` (Credentials): `userRepository.findByEmail` (`:28`) e `verifyPassword` (`:34`, bcryptjs). Resposta nula igual para e-mail inexistente e senha errada (`:29-31`).
- `options.ts:48-59`: callbacks `jwt`/`session` colocam `id` no token/sessão.
- Autorização por ação: `requireUserId()` em cada `actions.ts` (ex. `transactions/actions.ts:31-38`) usa `getServerSession`; `userId` vem da sessão e é repassado a toda query (isolamento por usuário).
- Não há rate limit, CORS ou validação de schema com zod nas actions que eu tenha visto [CONFIRMAR: `zod` está nas dependências; não rastreei onde é usado].

## Persistência (só o modelo)
- Conexão: `lib/db/connect.ts:19-43`, cache em `globalThis`, exige `MONGODB_URI` (`:24-29`), `mongoose.connect(uri)` (`:32`).
- Modelo `models/Transaction.ts:6-18`: `userId`, `accountId`, `toAccountId?`, `categoryId?`, `type` enum `INCOME|EXPENSE|TRANSFER` (`:3,11`), `amount` (centavos), `date`, `description` (max 200), `isPaid`, `tags`. Índices em `:22,25,26`. Export em `:30-31`.
- Transações Mongo (`session.withTransaction`) exigem replica set: `transaction.service.ts:211-214`; testes usam `MongoMemoryReplSet` (`vitest.setup.ts:9-11`).

## Testes
- Unit (`vitest.unit.config.mts`): `services/*.test.ts` (mockam repositórios, ex. `transaction.service.test.ts:1-30`) e `lib/parsers/*.test.ts`.
- Integração (`vitest.integration.config.mts:11-17`): `repositories/**`, `app/**`, `lib/auth`, `lib/db`, `middleware`. 18 arquivos `*.integration.test.ts`. Usam `mongodb-memory-server` (`vitest.setup.ts`), ou seja, **banco em memória**; não rodados aqui.
- Scripts npm: `test:unit`, `test:integration` (`package.json`).

## Caso de uso rastreado: criar transação (despesa)
Fluxo "Nova transação" na tela `/transactions`.

| # | Passo | Local |
|---|-------|-------|
| 1 | Submit do formulário chama a Server Action | `components/transactions/transaction-list.tsx:570` `await createTransactionAction({...})` (import `:5`) |
| 2 | Middleware já exigiu sessão para `/transactions` | `middleware.ts:3-14` |
| 3 | Action: exige usuário e delega | `app/(dashboard)/transactions/actions.ts:78-79` `requireUserId()` → `transactionService.createTransaction(userId, input)` |
| 4 | Sessão lida do JWT | `actions.ts:32-37` `getServerSession(authOptions)` |
| 5 | Service: validações de regra | `services/transaction.service.ts:198-201` valor, descrição, categoria, transferência |
| 6 | Service: confere que conta/categoria são do usuário | `transaction.service.ts:202-207` → `assertOwnedReferences` (`:133-152`) → `accountRepository.findById(userId,id)` (`:141`) |
| 7 | Abre sessão Mongo e transação | `transaction.service.ts:211-214` `mongoose.startSession()` / `withTransaction` |
| 8 | Repositório grava | `transaction.service.ts:215` → `repositories/transaction.repository.ts:43-47` `connectDB()` + `Transaction.create([input],{session})` |
| 9 | Schema Mongoose valida/persiste | `models/Transaction.ts:6-18` |
| 10 | Se pago, ajusta saldo na mesma transação | `transaction.service.ts:230-238` → `applyBalanceEffect` (`:160-176`) → `accountService.adjustBalance` (`account.service.ts:89`) → `account.repository.ts:52-60` `$inc: { balance }` |
| 11 | Pós-commit: regra de categoria por estabelecimento | `transaction.service.ts:241` → `maybeUpsertMerchantRule` (`:184-194`) |
| 12 | Resposta serializada | `actions.ts:80` `{ data: toPlainObject(transaction) }`; erro vira texto em `mapError` (`actions.ts:152-175`) |

## Etapas propostas para a aba do Pipeline Inspector
Cinco etapas (a cadeia real tem 4 camadas + a sessão). Trechos curtos copiados do código:

1. **Server Action** (`actions.ts:78-79`)
   ```ts
   const userId = await requireUserId();
   const transaction = await transactionService.createTransaction(userId, input);
   ```
2. **Sessão / auth** (`actions.ts:32-33`; `middleware.ts:3`)
   ```ts
   const session = await getServerSession(authOptions);
   export default withAuth({ pages: { signIn: "/login" } });
   ```
3. **Service: regras** (`transaction.service.ts:198-201`)
   ```ts
   assertValidAmount(input.amount);
   assertValidCategoryUsage(input.type, input.categoryId);
   assertValidTransferAccounts(input.type, input.accountId, input.toAccountId);
   ```
4. **Repository + transação Mongo** (`transaction.service.ts:211-214`; `transaction.repository.ts:45`)
   ```ts
   const session = await mongoose.startSession();
   await session.withTransaction(async () => { ... });
   const [doc] = await Transaction.create([input], { session });
   ```
5. **Model / efeito no saldo** (`models/Transaction.ts:11`; `account.repository.ts:54-55`)
   ```ts
   type: { type: String, required: true, enum: TRANSACTION_TYPES },
   { $inc: { balance: deltaCents } }
   ```
Se quiser só 4 etapas, junte 1 e 2. Aviso: no repositório as etapas 3 e 4 estão no mesmo arquivo de service; mostrar dois trechos do mesmo arquivo é fiel.

## Back-end rastreável?
**Sim**, com ressalva: o back-end existe e é legível (Server Actions + services + repositories + models), mas **não é uma API HTTP**, e portanto não há endpoint/URL para exibir, só o nome da action. No Inspector, o rótulo da primeira etapa deve ser "Server Action", não "Endpoint". Não rodável sem MongoDB (ver classificação).

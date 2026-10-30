# projetoAGX — arquitetura (somente leitura)

Repo: `RomuuloGoncalves/projetoAGX` (clone raso, commit `e343530`). Referências abaixo no formato `projetoAGX/arquivo:linha`.
Projeto: "Projeto Biblioteca — API em Deno" (`readme.md:1`). **Só back-end, sem front-end.**

## Árvore (sem docs/binários)
```
main.ts                 server.ts               deno.json
config/env.ts           connection/{conn,mongooseModels}.ts
core/{CoreModel,CoreRepository,authMiddleware,adminMiddleware,tokenBlacklist}.ts
features/{auth,autor,emprestimo,livro,usuario}/<x>Controller|Service|Repository.ts
features/httpErrorHandler.ts
models/{autor,emprestimo,livro,usuario}.ts    utils/cpfFormatter.ts
tests/*_test.ts (9 arquivos)                  docs/{arquitetura.md,swagger.json,...}
```
(`auth` tem só controller+service; não tem repository.)

## Ponto de entrada
- `main.ts:3` `app.listen(8000, ...)`; importa `app` de `server.ts`.
- `server.ts` monta Express 5: `express.json()` (`:19`), morgan, `responser` (`:26,:28`), rotas via `express.Router` e Swagger em `/api-docs`.
- Runtime Deno (`deno.json:2-4`, task `dev`), libs via `npm:`.

## Camadas reais
Existe de fato **controller → service → repository → modelo Mongoose**, por feature (confirmado nos imports de `emprestimoController.ts:1-9`). Extras:
- Modelo de domínio (classe) em `models/*.ts` (`EmprestimoModelo extends ModeloBase`, `core/CoreModel.ts:1`).
- `core/CoreRepository.ts`: repositório base genérico (`obterTodos/obterPorId/criar/atualizarPorId/deletarPorId`) sobre `mongoose.Model`; cada repo só implementa `converterParaModelo`.
- Controllers instanciam repo+service no próprio arquivo (`emprestimoController.ts:35-43`), sem DI/container.
- Erros: `throwlhos` nos services + `tratarErroHttp` (`features/httpErrorHandler.ts`) nos controllers.

## Middlewares / auth
- Globais: `express.json`, `urlencoded`, `morgan("combined")`, `responser` (adiciona `res.send_ok/send_created/...`).
- `core/authMiddleware.ts`: exige `Authorization: Bearer`, checa blacklist (`tokenBlacklist.ts`), `jwt.verify` (`:26`), grava `res.locals.usuario`. Há fallback de segredo JWT hardcoded (`:25`) — **não citar o valor no portfólio**.
- `core/adminMiddleware.ts`: exige `role === "admin"` (`:6`), senão `send_forbidden`.
- Públicas: `/login`, `/livro`, `/usuario`, `/autor` (CRUD sem auth); `/emprestimo*` exige auth, escrita exige admin (`server.ts:60-65`).

## Persistência (só modelo)
`connection/mongooseModels.ts:26-32`:
```ts
const emprestimoSchema = new conn.mongoose.Schema({
  usuario_id: conn.mongoose.Schema.Types.ObjectId,
  livro_id: conn.mongoose.Schema.Types.ObjectId,
  data_emprestimo: Date,
  data_devolucao: { type: Date, default: null },
  status: { type: String, enum: ["ativo", "devolvido"], default: "ativo" },
});
```
MongoDB via Mongoose, conexão em `connection/conn.ts:42` (top-level await, importado por tudo). Transações Mongoose (`startSession`) em `emprestimoService.ts:33`.

## Testes
`tests/` com 9 arquivos, ~90 `Deno.test`, ~2300 linhas; `deno.json` task `test`: `deno test -A --no-check`. Integração via `supertest(app)` (`emprestimo_test.ts`) criando e limpando dados reais no Mongo; só `utils_test.ts` e partes de `core_test.ts`/`models_test.ts` são puros. Observação: `conn_test.ts` importa `conn.ts`, que já conecta ao importar. [CONFIRMAR] se `core_test`/`models_test` rodam sem banco (provavelmente não, por importarem `server`/`conn` indiretamente — não executado, por regra de não acessar banco).

## Caso de uso rastreado: criar empréstimo (`POST /emprestimo`)
| # | Passo | Local |
|---|---|---|
| 1 | Entrada HTTP, `app.listen(8000)` | `main.ts:3` |
| 2 | Parse do JSON | `server.ts:19` |
| 3 | Rota com 2 middlewares | `server.ts:62` `router.post("/emprestimo", authMiddleware, adminMiddleware, emprestimoController.criar)` |
| 4 | Auth JWT: header Bearer, blacklist, `jwt.verify` | `core/authMiddleware.ts:7-26` |
| 5 | RBAC admin | `core/adminMiddleware.ts:6` |
| 6 | Validação do corpo (`request-check`) → 400 | `emprestimoController.ts:94-102` |
| 7 | Monta `EmprestimoModelo` | `emprestimoController.ts:105` |
| 8 | Chama service | `emprestimoController.ts:116` |
| 9 | Abre sessão/transação Mongoose | `emprestimoService.ts:33-34` |
| 10 | Busca livro, 404 se não existe, 400 se sem estoque | `emprestimoService.ts:38-47` |
| 11 | Decrementa `quantidade_disponivel` na mesma sessão | `emprestimoService.ts:49` |
| 12 | Persiste empréstimo | `emprestimoService.ts:52` → `core/CoreRepository.ts:39` `this.bd.create([modelo.obterDados()], options)` |
| 13 | Commit | `emprestimoService.ts:57` (catch: `abortTransaction`) |
| 14 | Resposta 201 | `emprestimoController.ts:118` `response.send_created(...)`; erros: `tratarErroHttp` (`:123`) |

## Proposta: abas do Pipeline Inspector (6 etapas)
Etapas e trechos reais curtos (conferir linhas ao copiar):
1. **Rota** — `router.post("/emprestimo", authMiddleware, adminMiddleware, emprestimoController.criar)` (`server.ts:62`)
2. **Autenticação** — `const decoded = jwt.verify(token, secret);` (`authMiddleware.ts:26`)
3. **Autorização (admin)** — `if (!usuario || usuario.role !== "admin")` (`adminMiddleware.ts:6`)
4. **Validação** — `const erros = regras.check({ usuario_id: corpo.usuario_id }, ...)` (`emprestimoController.ts:94`)
5. **Regra de negócio + transação** — `if (livro.obterQuantidadeDisponivel() <= 0) throw ...err_badRequest(...)` (`emprestimoService.ts:43-44`) e `session.startTransaction()`
6. **Persistência + resposta** — `this.bd.create([modelo.obterDados()], options)` (`CoreRepository.ts:39`), `response.send_created("Empréstimo criado com sucesso", ...)`
[CONFIRMAR] números de linha exatos dos trechos 5 (`:43-44`) e 4; conferi os principais por grep, os demais são aproximados.

## Back-end rastreável?
**Sim.** Fluxo linear e explícito, com camadas reais, auth/RBAC e transação; todos os passos têm arquivo:linha. Limitação: o ao vivo exige MongoDB, então o Inspector deve ser **estático** (trechos de código), sem execução ao vivo.

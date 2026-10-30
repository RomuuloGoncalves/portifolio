# Liftech: arquitetura (leitura do código)

Repo: `RomuuloGoncalves/Liftech` (clone raso, só leitura). Todos os caminhos `arquivo:linha` abaixo são relativos à raiz do repo.

## 1. Árvore de pastas (monorepo Yarn)

```
Liftech/
├─ package.json            # só orquestra: concurrently "dev:back" + "dev:front" (package.json raiz)
├─ Backend/
│  ├─ src/
│  │  ├─ server.ts         # app.listen(3000)
│  │  ├─ app.ts            # monta middlewares e rotas /api/...
│  │  ├─ config/           # env.ts (dotenv), conn.ts (mongoose.connect)
│  │  ├─ core/             # autenticar.ts (middleware JWT), escopo.ts, coreRepository.ts, coreService.ts, coreModel.ts
│  │  ├─ feature/<x>/      # <x>Router, <x>Controller, <x>Service, <x>Repository, <x>Rules (varia por feature)
│  │  │                    #   auth, accessRequest, branch, category, company, device, feedback, forklift,
│  │  │                    #   incident, machine, me, operator, reset, sector, session, telemetry, user
│  │  ├─ models/           # classes de domínio (userModel, forkliftModel, telemetryModel, ...), 13 arquivos
│  │  ├─ schemas/          # schemas Mongoose (user, forklift, telemetry, incident, ...), 13 arquivos
│  │  ├─ scripts/          # seeds e migrações (seedAdmin, seedData, resetData, migrate*)
│  │  └─ utils/            # responseHandler, senha (scrypt), logger (pino), corpo
│  └─ tests/{unit,integration}/   # vitest; 62 arquivos em unit/
├─ Frontend/               # React 19 + Vite + react-router + axios + i18next (7 idiomas) + CSS Modules
│  └─ src/{pages,components,services,context,hooks,data,locales,routes,test}
├─ docs/                   # arquitetura.md, api.md, frontend.md, modelagem_de_dados.md
├─ .specs/                 # fluxo spec-driven (spec/design/tasks por feature)
└─ figma-telas/, videos/
```

## 2. Ponto de entrada

- Back-end: `Backend/src/server.ts:10` `app.listen(3000, ...)`; `--seed` roda `seedAdmin()` antes (`server.ts:6-8`). Script: `"dev": "tsx watch src/server.ts"` (`Backend/package.json`).
- A conexão com o banco acontece como efeito colateral do import de `config/conn.ts` (top-level await, `conn.ts:16-26`), puxado por qualquer `schemas/*.ts` (ex.: `schemas/user.ts:1`). Se faltam `MONGODB_URI`/`MONGODB_NAME`, só avisa e segue (`conn.ts:27-29`); se falha, `process.exit(1)` (`conn.ts:23-26`).
- Front-end: `Frontend/src/main.tsx` → `App.tsx` → `routes/appRoutes.tsx` (rotas lazy: `/`, `/dashboard`, `/frota`, `/equipe`, `/alertas`, `/login`, `/login/colaborador`, `/solicitar-acesso`, `/solicitacoes`, `/funcionario/*`; `appRoutes.tsx:70-89`).

## 3. Camadas reais (o que existe, não o que o README promete)

A cadeia **Router → Controller → Service → Repository** existe, mas **não é uniforme**:

| Feature | Cadeia real |
|---|---|
| telemetry, forklift, user, branch, category, ... | Router → Controller → `Service extends ServiceBase` → `Repository extends RepositoryBase` → schema Mongoose |
| machine | Router → Controller → **funções** em `machineService.ts` / `statusService.ts` (módulo de funções, sem classe) que instanciam repositórios no topo do arquivo (`machineService.ts:28-32`, `statusService.ts:19-22`) |
| auth | Router → Controller → **função** `login` em `authService.ts` que usa `UserRepository`, `CompanyRepository`, `OperatorRepository` (`authService.ts:17-19`) |
| accessRequest | Controller grava no schema direto (`docs/arquitetura.md`, "Camadas do Backend") |

Classes-base genéricas: `core/coreRepository.ts:16` (`RepositoryBase<T>`: `obterTodos`, `criar`, `atualizarPorId`, `deletarPorId`, `obterUm`, ...) e `core/coreService.ts:4` (`ServiceBase<T,R>`: `listar`, `criar`, `atualizar`, `deletar`). Cada repositório só implementa `converterParaModelo` (ex.: `telemetryRepository.ts:11`).

Camada extra característica: **escopo multi-tenant** (`core/escopo.ts`): `carregarEscopo` (`escopo.ts:32`) resolve as filiais do usuário e `filtroPorFilial` (`escopo.ts:49`) vira filtro de consulta; "falha fechada" quando vazio (comentário em `escopo.ts:48`).

## 4. Middlewares e autenticação

Pilha global (`Backend/src/app.ts`):
- `helmet()` `:29`, `compression()` `:30`, `cors()` `:32`, `express.json()` `:33`, `pinoHttp` `:36` (log de requisição).
- Rotas públicas: `/api/auth` `:66`, `/api/access-requests` `:67`, `/api/reset` `:68`, `/api/health` `:52`.
- `app.use('/api', autenticar)` `:70`: tudo abaixo exige token.

`core/autenticar.ts:27-46`: extrai `Bearer` (`:28`), `jwt.verify(..., { algorithms: ["HS256"] })` (`:33`), **lê o usuário no banco a cada requisição** (`User.findById`, `:36`) e recusa `acessoNegado` (`:37`), preenche `req.usuario` (`:39`) e `req.escopo` (`:40`). `exigirAdmin` em `:48`.

Login: `authService.ts:21-65`: busca por `email` (admin) ou `usuario` (colaborador) (`:26-30`), `verificarSenha` com scrypt + `timingSafeEqual` (`utils/senha.ts`), `jwt.sign` (`authService.ts:39`).

Validação do corpo: `request-check` + `@zarco/isness` em `feature/*/ *Rules.ts` (ex.: `authRules.ts:7-24`).

Observação de segurança (fato do código): `GET /api/reset` é público e apaga/recria o banco (`app.ts:68`, `resetController.ts:7`, comentário "decisão do dono").

## 5. Persistência (só o código do modelo)

MongoDB via Mongoose; schemas em `Backend/src/schemas`, classes de domínio em `Backend/src/models`.

```ts
// Backend/src/schemas/forklift.ts:4-25 (trecho)
const forkliftSchema = new Schema({
    identificacao: String,
    nome: String,
    setorId: { type: conn.mongoose.Schema.Types.ObjectId, ref: 'sector', default: null, index: true },
    status: { type: String, enum: ['disponivel', 'em_uso', 'manutencao', 'alerta', 'offline', null], default: null },
    categoriaTravada: { type: Boolean, default: false },
    filialId: { type: conn.mongoose.Schema.Types.ObjectId, ref: 'branch', required: true, index: true },
    dispositivoConectadoId: { type: conn.mongoose.Schema.Types.ObjectId, ref: 'device' },
    operadorConectadoId: { type: conn.mongoose.Schema.Types.ObjectId, ref: 'operator' }
})
```
```ts
// Backend/src/schemas/telemetry.ts:5-14
const telemetrySchema = new Schema({
    dataDados: Date,
    forcaImpacto: Number,
    dispositivoId: { type: conn.mongoose.Schema.Types.ObjectId, ref: 'device' },
})
telemetrySchema.index({ dispositivoId: 1, dataDados: -1 });
```
```ts
// Backend/src/schemas/incident.ts:4-22 (trecho)
const incidentSchema = new Schema ({
    dataIncidente: Date, forcaImpacto: Number, status: String,
    origem: { type: String, enum: ['sensor', 'funcionario'], default: 'sensor' },
    filialId: { ..., ref: 'branch', required: true },
    empilhadeiraId: { ..., ref: 'forklift' }, operadorId: { ..., ref: 'operator' }
})
incidentSchema.index({ empilhadeiraId: 1, status: 1 })
```
`schemas/user.ts:11` esconde o hash (`senhaHash: { type: String, select: false }`), e `models/userModel.ts:47-58` (`obterDados`) nunca devolve credenciais. Modelo de domínio com `obterDados()` = formato da API: `core/coreModel.ts` (`abstract obterDados()`).

Entidades (13): user, company, branch, sector, category, operator, device, forklift, telemetry, incident, workSession, accessRequest, feedback.

## 6. Testes

- Back-end: Vitest. `yarn test` = `vitest run tests/unit` (`Backend/package.json`). 62 arquivos em `tests/unit` com mock de schemas (ex.: `tests/unit/app.test.ts:13-27` mocka `conn`, `User`, `Branch` e sobe o `app` real em porta 0 com `fetch`). `tests/integration/` (7 arquivos) conecta ao MongoDB real e roda à parte (`yarn test:integration`).
- Front-end: Vitest + jsdom + Testing Library (`Frontend/vite.config.ts`, `src/test/**`: componentes, contexts, data, i18n).
- Não há CI no repo (só `.github/CODEOWNERS`) nem Dockerfile.

## 7. Caso de uso principal rastreado: sensor reporta impacto → máquina entra em alerta

`POST /api/telemetry` com `{ dispositivoId, dataDados, forcaImpacto }` (a telemetria nasce do dispositivo IoT na empilhadeira; o front lista depois como alerta). É a regra de negócio central do produto.

| # | Passo | Onde | Trecho real |
|---|---|---|---|
| 1 | Middleware global | `Backend/src/app.ts:70` | `app.use('/api', autenticar);` |
| 2 | Montagem da rota | `Backend/src/app.ts:76` | `app.use('/api/telemetry', telemetryRouter);` |
| 3 | Rota | `Backend/src/feature/telemetry/telemtryRouter.ts:9` | `router.post("/", criar);` |
| 4 | Autenticação + escopo | `Backend/src/core/autenticar.ts:33-40` | `jwt.verify(token, env.jwt_secret, { algorithms: ["HS256"] })` … `req.escopo = await carregarEscopo(usuario);` |
| 5 | Validação do corpo | `Backend/src/feature/telemetry/telemetryController.ts:83-90` | `regras.check({ dispositivoId: ..., dataDados: ... })` |
| 6 | Isolamento por filial | `telemetryController.ts:97` | `if (!(await idsDosDispositivos(req)).includes(String(corpo.dispositivoId)))` → 404 |
| 7 | Modelo + Service | `telemetryController.ts:102-104` | `new telemetryModel(dataDados, corpo.dispositivoId, undefined, forcaImpacto)` → `servicoTelemetry.criar(telemetria)` |
| 8 | ServiceBase | `Backend/src/core/coreService.ts:25-31` | `const criado = await this.repositorio.criar(entidade);` |
| 9 | Repository genérico → schema | `Backend/src/core/coreRepository.ts:130-132` | `const dados = modelo.obterDados(); ... await this.bd.create(dados)` (collection `telemetry`, `schemas/telemetry.ts:16`) |
| 10 | Regra de impacto | `telemetryController.ts:106-108` | `if (forcaImpacto !== undefined && forcaImpacto >= limiteImpacto()) { await registrarImpacto(...) }` |
| 11 | Limite configurável | `Backend/src/feature/machine/statusService.ts:25-29` | `limiteImpacto()` lê `LIMITE_IMPACTO` do env, padrão 5 |
| 12 | Cria incidente | `statusService.ts:63-75` | `registrarImpacto`: acha a empilhadeira pelo dispositivo e `incidentes.criar(new incidentModel({ ..., status: "pendente", origem: "sensor" }))` |
| 13 | Muda status | `statusService.ts:40-59`, chamado em `:76` | `aplicarStatus(id, "alerta")`: grava `status`, reposiciona a categoria se não travada (`:49-52`) |
| 14 | Resposta | `telemetryController.ts:109` | `respostaSucesso(res, StatusCode.CREATED, criado.obterDados())` → `utils/responseHandler.ts:14-19` (`res.status(201).json`) |

Efeito visível no front: `GET /api/machines` (`machineRouter.ts:6` → `machineController.ts:23-33` → `listarMaquinas` `machineService.ts:89` → `consultar` `machineService.ts:42-86`) devolve `status: "alerta"` e `alertaEm` do incidente pendente (`machineService.ts:48-58, 80`).

Decisão registrada no próprio código: a leitura fica gravada mesmo que a regra de impacto falhe depois (`telemetryController.ts:105`), e `aplicarStatus` não usa transação (`statusService.ts:39`, comentário `ponytail:`).

## 8. Proposta de etapas para a aba do Pipeline Inspector

Cadeia real sem "inventar camada": 6 etapas, trechos reais curtos.

1. **Entrada: rota protegida**: `app.ts:70` `app.use('/api', autenticar);` + `app.ts:76` `app.use('/api/telemetry', telemetryRouter);`
2. **Autenticação e escopo**: `autenticar.ts:33` `jwt.verify(token, env.jwt_secret, { algorithms: ["HS256"] })` e `:40` `req.escopo = await carregarEscopo(usuario);`
3. **Controller: validação e isolamento**: `telemetryController.ts:83` `regras.check({ dispositivoId: corpo.dispositivoId, dataDados: corpo.dataDados })` e `:97` checagem dos dispositivos do escopo.
4. **Service/Repository: gravação**: `coreService.ts:26` `await this.repositorio.criar(entidade)` → `coreRepository.ts:132` `await this.bd.create(dados)`
5. **Regra de domínio: impacto vira alerta**: `statusService.ts:63-76` `registrarImpacto(...)` → `incidentes.criar(... status: "pendente", origem: "sensor")` → `aplicarStatus(..., "alerta")`
6. **Resposta**: `telemetryController.ts:109` `respostaSucesso(res, StatusCode.CREATED, criado.obterDados())`

Alternativa mais curta (4 etapas): Rota+Auth → Controller → Regra de impacto (`statusService`) → Persistência (schema). [CONFIRMAR] qual granularidade o dono prefere; as 6 acima são todas reais.

Nota: o nome do arquivo do router tem erro de digitação no repo (`telemtryRouter.ts`); citar como está.

## 9. Back-end rastreável?

**Sim.** Há back-end próprio (Express 5 + Mongoose) no mesmo repo, com fluxo real do endpoint à resposta, auth JWT, testes unitários e regra de domínio não trivial (impacto → incidente → alerta, escopo por filial). Ressalvas a declarar: a cadeia Router→Controller→Service→Repository não vale em todas as features (machine e auth são módulos de funções); a doc `docs/arquitetura.md` diz que as páginas do front "ainda usam dados mock", mas o código atual já chama a API nos serviços (`Frontend/src/services/*.ts`, ex.: `machineService.ts:12`), então o doc está defasado nesse ponto.

## 10. Classificação (Parte 2): **precisa de banco** (back-end); front-end roda sem banco

- **Back-end: precisa de banco (MongoDB).** `Backend/src/config/conn.ts:16-26` conecta com `MONGODB_URI`/`MONGODB_NAME` e faz `process.exit(1)` se falhar; `Backend/.env.example` lista `MONGODB_URI`; `autenticar.ts:36` consulta `User.findById` em toda requisição autenticada; `authService.ts:30` consulta o usuário no login. Sem a URI o servidor sobe só com aviso (`conn.ts:27-29`), mas nenhuma rota de negócio funciona. Não há banco em memória, SQLite nem mock no caminho de execução (só nos testes unitários, `tests/unit/app.test.ts:13-27`).
- **Front-end: roda sem banco.** `Frontend/src/services/api.ts:5-7` só chama HTTP em `VITE_API_URL ?? http://localhost:3000/api`; não há driver de banco no front (`Frontend/package.json`). Com a API interceptada no navegador, as telas Visão Geral, Frota e Dashboard renderizam (ver `screenshots/Liftech/README.md`).
- **Testes:** `yarn test` do back-end é unitário e não toca no banco (`app.test.ts:13`); `test:integration` conecta ao MongoDB real.

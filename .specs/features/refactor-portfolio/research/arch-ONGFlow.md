# ONGFlow — arquitetura (leitura do código)

Repo: `RomuuloGoncalves/ONGFlow` (clone raso, commit `175a8bf`). Monorepo `Backend/` (Laravel 12, PHP) + `Frontend/` (React + Vite + TS). Citações no formato `arquivo:linha` relativas à raiz do repo.

## 1. Árvore de pastas (resumida)

```
ONGFlow/
├── Backend/                     Laravel (API)
│   ├── app/Http/Controllers/    13 controllers (Auth, Ong, Voluntario, Projeto, Convite, Dashboard, ...)
│   ├── app/Http/Requests/       6 FormRequests (Convite, Endereco, Habilidade, Ong, Projeto, Voluntario) — só StoreRequest
│   ├── app/Models/              8 models Eloquent (User, Ong, Voluntario, Projeto, Convite, Habilidade, Endereco, VoluntarioHabilidade)
│   ├── bootstrap/app.php        roteamento, middlewares, handlers de exceção
│   ├── routes/{api,web,console,test_routes}.php
│   ├── database/{migrations,factories,seeders}/
│   ├── config/                  sanctum.php, cors.php, database.php, ...
│   ├── public/index.php         front controller
│   └── tests/{Feature,Unit}/    só ExampleTest
├── Frontend/                    SPA React
│   └── src/{pages,components,modals,services,interfaces,router,lib,style}/
├── Dockerfile                   imagem php:8.2-cli + pdo_pgsql, `php artisan serve` :10000
├── .github/workflows/deploy.yml build do Frontend → GitHub Pages
└── Documents/                   DER, diagramas de atividade/classe (drawio), ToDo
```

## 2. Ponto de entrada

- Back-end: `Backend/public/index.php:18-20` (`require bootstrap/app.php` → `$app->handleRequest(Request::capture())`).
- Configuração do app: `Backend/bootstrap/app.php:9-15` (`withRouting(web, api, commands, health: '/up')`).
- Front-end: `Frontend/src/main.tsx:6` → `Frontend/src/App.tsx:1,23` (`HashRouter`).
- Produção: `Dockerfile:35` (`php artisan serve --host=0.0.0.0 --port=10000`); front publicado em GitHub Pages (`Frontend/vite.config.ts:14`, `base: '/ONGFlow/'`) e consome `https://ongflow-backend.onrender.com/api` (`Frontend/src/services/api.ts:8`).

## 3. Camadas reais

Não há camada de service nem repository no back-end. O fluxo real é:

`routes/api.php` → **Controller** (lógica + consulta Eloquent direto) → **Model Eloquent** → banco.

- Controllers usam `Projeto::create`, `Projeto::with(...)`, `DB::` direto (`ProjetoController.php:10,31,50`). Regras de negócio (compatibilidade de voluntários por habilidades, `ProjetoController.php:106-135`; agregações do dashboard, `DashboardController.php:12-50`) ficam dentro do controller.
- FormRequests existem (`app/Http/Requests/Projeto/StoreRequest.php`) mas o `ProjetoController::store` NÃO os usa: recebe `Request $request` genérico (`ProjetoController.php:26`) e faz `$request->all()` (`:28`). Ou seja, a validação do projeto não é executada nesse endpoint. (Os nomes de campo do FormRequest também divergem do model: `ongs_id` vs `id_ong`.)
- Front-end: `pages/` (telas) → `services/*.ts` (funções finas sobre axios) → `services/api.ts` (instância axios + interceptor de token).

## 4. Middlewares / autenticação

- Globais do grupo `api` (`bootstrap/app.php:17-22`): `HandleCors` (prepend) e `EnsureFrontendRequestsAreStateful` do Sanctum (append). CSRF desligado para `/api/*` (`:25-27`).
- Guard `auth:sanctum` aplicado por grupo em `routes/api.php`: `/user`, `/logout` (`:16,20`), rotas de voluntário (`:29`) e de ONG (`:45`).
- Login: `AuthController::loginVoluntario` (`AuthController.php:13`) e `loginOng` (`:40`) → `Hash::check` (`:54`) → `$ong->createToken(...)->plainTextToken` (`:58`). Token Bearer, não sessão. `Ong` usa `HasApiTokens` (`Models/Ong.php:15`) e `setPasswordAttribute` com `bcrypt` (`:40-43`).
- Erros padronizados: 422 de validação e 401 "Não autenticado." (`bootstrap/app.php:30-43`).
- Pontos fracos reais (observação, não alterar): grupos `projetos`, `habilidades`, `convites`, `enderecos`, `voluntariohabilidades` (`routes/api.php:55-114`) NÃO têm `auth:sanctum`; existe rota `GET /internal/run-migrations-once` que roda `migrate:refresh --seed` sem auth (`:123-129`); `routes/test_routes.php` é incluído em `api.php:116`.
- Front: `PrivateRoute` (`Frontend/src/router/PrivateRoute.tsx:8-42`) valida o cookie `token` chamando `GET /user` e redireciona para `/login`.

## 5. Persistência (somente o código do modelo)

Eloquent ORM, sem repository. `Backend/app/Models/Projeto.php`:

```php
class Projeto extends Model                       // Projeto.php:8
{
    protected $table = 'projetos';                // :13
    protected $fillable = ['nome','descricao','data_inicio','quantidade_maxima_voluntarios','status','id_ong','id_endereco']; // :15-23
    public function ong()          { return $this->belongsTo(Ong::class, 'id_ong'); }                       // :35-38
    public function habilidades()  { return $this->belongsToMany(Habilidade::class, 'projeto_habilidade', 'id_projeto', 'id_habilidade'); } // :40-43
    public function voluntarios()  { return $this->belongsToMany(Voluntario::class, 'projeto_voluntario', 'id_projeto', 'id_voluntario'); } // :45-48
}
```

Tabela `projetos` (`database/migrations/2025_10_09_175121_create_projetos_table.php:14-24`): `nome`, `descricao`, `data_inicio`, `data_fim` (nullable), `quantidade_maxima_voluntarios`, `status` enum(ativo/cancelado/finalizado), FK `id_ong` e `id_endereco`. Obs.: `data_fim` não está em `$fillable`, então não é gravada via `create`/`update($request->all())`; `finalizar`/`cancelar` atribuem direto (`ProjetoController.php:77,86`).
Banco: padrão `sqlite` (`config/database.php:19`, `.env.example:23`); produção aponta para PostgreSQL (`Dockerfile:7,17`, `pdo_pgsql`). Tabelas pivô: `projeto_habilidade`, `projeto_voluntario`, `ong_voluntario`, `voluntario_habilidade`.

## 6. Testes

Só os exemplos do Laravel: `Backend/tests/Feature/ExampleTest.php:13-18` (GET `/` espera 200) e `tests/Unit/ExampleTest.php`. Sem testes de domínio, sem testes no Frontend (`package.json` sem script `test`). `RefreshDatabase` está comentado (`ExampleTest.php:5`).

## 7. Caso de uso rastreado: ONG cria um projeto (`POST /api/projetos`)

| # | Passo | Onde | O que acontece |
|---|-------|------|----------------|
| 1 | Clique em salvar | `Frontend/src/pages/ong/CriarProjeto/CriarProjeto.tsx:36` (`handleSalvarProjeto`) | Valida campos locais (`:40-43`), lê `id` da ONG do `localStorage` (`:37-38`). |
| 2 | Monta payload | `CriarProjeto.tsx:50-56` | `{ nome, descricao, data_inicio, id_ong, habilidades: [descrições] }`. |
| 3 | Chama o service | `CriarProjeto.tsx:59` → `Frontend/src/services/projetoService.ts:27-29` | `api.post<Projeto>('/projetos', data)`. |
| 4 | Cliente HTTP | `Frontend/src/services/api.ts:7-9,11-17` | `baseURL` = `/api` em dev (proxy `vite.config.ts:16-21` → `localhost:8000`) ou `onrender.com/api` em prod; interceptor injeta `Authorization: Bearer <cookie token>`. |
| 5 | Front controller | `Backend/public/index.php:20` | `$app->handleRequest(Request::capture())`. |
| 6 | Middlewares do grupo `api` | `Backend/bootstrap/app.php:17-27` | CORS, Sanctum stateful, CSRF ignorado em `/api/*`. |
| 7 | Rota | `Backend/routes/api.php:58` | `Route::post('/', [ProjetoController::class, 'store'])` dentro do prefixo `projetos` (`:55`) — sem `auth:sanctum`. |
| 8 | Controller | `Backend/app/Http/Controllers/ProjetoController.php:26-29` | `store(Request $request)`: `$data = $request->all(); $data['status'] = 'ativo';` (sem FormRequest). |
| 9 | Persistência | `ProjetoController.php:31` → `Backend/app/Models/Projeto.php:15-23` | `Projeto::create($data)`; só campos de `$fillable` entram; INSERT em `projetos` (`migration:14-24`). |
| 10 | Habilidades (pivô) | `ProjetoController.php:33-43` | Busca `Habilidade::where('descricao', ...)` e `$projeto->habilidades()->sync($ids)` (tabela `projeto_habilidade`). |
| 11 | Resposta | `ProjetoController.php:44-45` | `load(['habilidades','ong.endereco','voluntarios'])` e `response()->json($projeto, 201)`. |
| 12 | Volta ao front | `CriarProjeto.tsx:60-61` | Toast "Projeto criado com sucesso!" e `navigate("/projetos/ong")`. |

## 8. Pipeline Inspector — etapas propostas

Back-end rastreável: **sim** (Laravel; fluxo rota → controller → model Eloquent, sem service/repository). Proposta de 6 etapas, nomes fiéis ao que existe:

| # | Etapa | Arquivo:linha | Trecho real (curto) |
|---|-------|---------------|---------------------|
| 1 | Chamada no front | `Frontend/src/services/projetoService.ts:27-29` | `return api.post<Projeto>('/projetos', data);` |
| 2 | Cliente HTTP + token | `Frontend/src/services/api.ts:13-17` | `const token = Cookies.get('token'); if (token) { config.headers['Authorization'] = \`Bearer ${token}\`; }` |
| 3 | Rota | `Backend/routes/api.php:58` | `Route::post('/', [ProjetoController::class, 'store']);` |
| 4 | Controller | `Backend/app/Http/Controllers/ProjetoController.php:28-31` | `$data = $request->all(); $data['status'] = 'ativo'; $projeto = Projeto::create($data);` |
| 5 | Model Eloquent | `Backend/app/Models/Projeto.php:15-23` e `:40-43` | `protected $fillable = ['nome', 'descricao', ...]` / `belongsToMany(Habilidade::class, 'projeto_habilidade', ...)` |
| 6 | Resposta JSON | `Backend/app/Http/Controllers/ProjetoController.php:44-45` | `$projeto->load(['habilidades', 'ong.endereco', 'voluntarios']); return response()->json($projeto, 201);` |

Notas:
- Não há etapas "service" nem "repository": não inventar. Autenticação (`auth:sanctum`, `routes/api.php:45`) só entra se a aba usar um endpoint protegido (ex.: `GET /api/ongs/dashboard`, `DashboardController.php:12-14`, `$ong = $request->user()`); para `POST /projetos` ela não se aplica.
- Linhas conferidas contra o clone `175a8bf` (grep) antes de gravar. Se o Inspector exibir o `StoreRequest` de Projeto, [CONFIRMAR]: ele existe mas não é chamado neste endpoint, então NÃO incluir como etapa.
- Alternativa se quiser mostrar autenticação de ponta a ponta: caso de uso `POST /api/ongs/login` (`AuthController.php:40-65`: `validate` → `Ong::where('email', ...)` → `Hash::check` → `createToken`). 

## 9. Classificação (roda sem banco / precisa de banco / indefinido)

**Back-end: PRECISA DE BANCO.** Todo endpoint de domínio consulta Eloquent (`ProjetoController.php:16,31,50`; `DashboardController.php:17-20`), o login depende de `Ong::where('email', ...)` (`AuthController.php:52`), `GET /api/user` e `auth:sanctum` leem `personal_access_tokens` (`database/migrations/2025_09_03_161519_create_personal_access_tokens_table.php`), e o README manda rodar `php artisan migrate` (SQLite padrão, `config/database.php:19`, `.env.example:23`). Não subi o back-end (regra do usuário: nunca acessar banco, nem SQLite).
**Front-end: RODA SEM BANCO** (SPA estática; só fala HTTP com a API). Em dev usa `baseURL: '/api'` (`Frontend/src/services/api.ts:7-9`), então a API pode ser interceptada no navegador. Prints feitos assim (ver `screenshots/ONGFlow/README.md`). O front, sozinho, não exibe dados reais sem API; páginas públicas (Home, Login, SignUp) renderizam sem nenhum dado.
**Classificação do projeto como um todo:** precisa de banco (para funcionar de ponta a ponta); front-end isolado roda sem banco.

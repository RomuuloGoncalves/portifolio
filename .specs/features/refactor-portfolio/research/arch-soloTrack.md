# soloTrack: arquitetura (leitura do código, `--depth 1`)

Repo: `RomuuloGoncalves/soloTrack` (monorepo). Todas as referências abaixo são `soloTrack/<caminho>:<linha>`.

## Resumo

- Monorepo com **Backend Laravel (PHP) + Frontend React/Vite (TS) + firmware Arduino/ESP32**. Há back-end rastreável.
- Back-end é **Laravel padrão: rota → (FormRequest) → Controller → Model Eloquent → resposta JSON**. **Não existe camada service/repository** para o CRUD. O único service é `GeminiService` (chat com IA).
- Persistência: MySQL via Docker (`docker-compose.yml:32-35`); padrão do config e do `.env.example` é SQLite (`Backend/config/database.php:20`, `Backend/.env.example:23`).

## Árvore de pastas (essencial)

```
soloTrack/
├── Backend/                      Laravel (artisan, composer.json)
│   ├── routes/api.php            todas as rotas da API
│   ├── bootstrap/app.php         middlewares + handlers de exceção JSON
│   ├── app/Http/Controllers/     11 controllers (Auth, Usuario, Propriedade, AreaPlantio, Cultura, Insumo,
│   │                             Equipamento, TipoSensor, Leitura, Chat, VisaoGeral)
│   ├── app/Http/Requests/        7 FormRequests (Store/Update de Área, Propriedade, Cultura, Insumo, Usuario)
│   ├── app/Models/               8 models Eloquent
│   ├── app/Services/GeminiService.php   chamada à API Gemini (chat)
│   ├── app/Mcp/Tools/            12 tools MCP usadas pelo chat (Criar/Listar/Excluir ...)
│   ├── database/migrations|seeders|factories
│   └── tests/                    só ExampleTest (Feature e Unit)
├── Frontend/                     React 19 + Vite 8 + TS, CSS Modules, HashRouter
│   └── src/{Pages,components,contexts,services,hooks,types}
├── Sketches/                     firmware Arduino/ESP32 (.ino)
├── Documentos/                   DER, telas, IoT, MCP, docker
├── docker-compose.yml            backend + frontend + db (mysql:8.0)
└── .github/workflows/deploy.yml
```

## Ponto de entrada

- Back-end: `Backend/public/index.php` → `Backend/bootstrap/app.php:12-18` (`withRouting(api: routes/api.php, health: '/up')`).
- Front-end: `Frontend/src/main.tsx` → `Frontend/src/App.tsx:27` (`<Router>` = `HashRouter`, `App.tsx:1`), rotas em `App.tsx:30-61`.

## Camadas reais

| Camada | Onde | Observação |
|---|---|---|
| Rotas | `Backend/routes/api.php` | `apiResource` por entidade (`:36-48`) |
| Validação | `Backend/app/Http/Requests/*` ou `$request->validate()` inline | Login valida inline (`AuthController.php:13`); Área usa FormRequest (`AreaPlantioController.php:29`) |
| Controller | `Backend/app/Http/Controllers/*` | Chama o Model Eloquent direto (`AreaPlantio::create`, `Usuario::where`). Sem service/repo |
| Helper de resposta | `Controller.php:7-14` (`success()`) e `:16-23` (`error()`) | Formato `{success, message, data}` |
| Model | `Backend/app/Models/*` | Eloquent, `$fillable` + relacionamentos |
| Service | só `app/Services/GeminiService.php` | Usado por `ChatController` (`routes/api.php:51`) |
| Front: HTTP | `Frontend/src/services/*.ts` + `api.ts` | Um service por entidade, sobre uma instância axios |
| Front: estado | `Frontend/src/contexts/ContextoAuth.tsx`, `ToastContext.tsx` | Sessão em cookie `token` + localStorage `usuario` |

## Middlewares e autenticação

- Sanctum token (Bearer). Rotas privadas agrupadas em `Route::middleware('auth:sanctum')->group(...)` (`routes/api.php:32`).
- Públicas: `GET /hello` (`:19`), `POST /login` (`:25`), `POST /usuarios` (cadastro, `:28`), `POST /iot/leituras` (hardware, `:60`, "segurança por MAC registrado").
- `bootstrap/app.php:20` CORS no grupo `api`; `:23-25` `EnsureFrontendRequestsAreStateful`; `:28-30` CSRF desativado para `/api/*`.
- Erros JSON padronizados para `api/*`: 422 (`bootstrap/app.php:35`), 401 (`:46`), 404 (`:56`), HTTP genérico (`:66`), 500 (`:76`).
- Token criado com `HasApiTokens` em `Backend/app/Models/Usuario.php:17`; tabela `personal_access_tokens` (migration `2026_04_12_020759`).
- Front: interceptor injeta `Authorization: Bearer` (`Frontend/src/services/api.ts:9-16`), 401 limpa sessão e vai para `#/login` (`api.ts:26-39`). Guarda de rota: `RotaPrivada.tsx:17`.
- Atenção (achado, não alterar): `GET /api/internal/run-migrations-once` (`routes/api.php:64-90`) é público e roda `migrate:refresh --seed --force`. Não mencionar no portfólio.

## Persistência (só o código do modelo)

`Backend/app/Models/AreaPlantio.php:10-18`:

```php
class AreaPlantio extends Model
{
    protected $fillable = [
        'qr_code_hash', 'propriedade_id', 'nome_area',
        'tamanho_area_m2', 'latitude', 'longitude',
    ];
```

Relacionamentos: `belongsTo(Propriedade)` (`:29`), `hasMany(Leitura)` (`:38`), `belongsToMany(Cultura)` via `area_cultura` (`:48`), `belongsToMany(Insumo)` via `area_insumo` (`:60`).
`Backend/app/Models/Usuario.php:17,19`: `use HasFactory, Notifiable, HasApiTokens; protected $table = 'usuarios';`, `$hidden = ['password','remember_token']`.
Esquema nas migrations (ex.: `create_area_plantios_table.php:14-23`, com `softDeletes`).

## Testes

- Só os modelos de exemplo: `Backend/tests/Feature/ExampleTest.php:13-18` (`$this->get('/')` espera 200) e `tests/Unit/ExampleTest.php`. Nenhum teste de domínio.
- `phpunit.xml:26-27`: SQLite `:memory:`. O `RefreshDatabase` está comentado (`ExampleTest.php:5`).
- Front: sem testes (`Frontend/package.json` só tem `dev/build/lint/preview`).

## Caso de uso principal rastreado: Login (fluxo ligado de ponta a ponta)

| # | Arquivo:linha | Trecho real |
|---|---|---|
| 1 | `Frontend/src/Pages/auth/Login/Login.tsx:28` | `const response = await usuarioService.login({ email, password });` |
| 2 | `Frontend/src/services/usuarioService.ts:19-20` | `login: (dados) => { return api.post<LoginResponse>('/login', dados);` |
| 3 | `Frontend/src/services/api.ts:9-11` | `baseURL: isProduction ? '<URL do back-end em produção>/api' : '/api'` (URL real omitida de propósito) |
| 4 | `Backend/routes/api.php:25` | `Route::post('/login', [AuthController::class, 'login']);` |
| 5 | `Backend/bootstrap/app.php:19-31` | `prependToGroup('api', HandleCors::class)` e `validateCsrfTokens(except: ['/api/*'])` |
| 6 | `Backend/app/Http/Controllers/AuthController.php:13` | `$credentials = $request->validate(['email' => 'required\|string\|email', 'password' => 'required\|string\|min:8'], ...)` |
| 7 | `AuthController.php:23` | `$usuario = Usuario::where('email', $credentials['email'])->first();` |
| 8 | `AuthController.php:25` | `if (!$usuario \|\| !Hash::check($credentials['password'], $usuario->password))` → 401 |
| 9 | `AuthController.php:32` | `$token = $usuario->createToken($usuario->nome . '-AuthToken')->plainTextToken;` |
| 10 | `AuthController.php:34-39` | `return response()->json(['success'=>true, 'message'=>'Login realizado com sucesso!', 'usuario'=>$usuario, 'access_token'=>$token]);` |
| 11 | `Frontend/src/Pages/auth/Login/Login.tsx:33` | `entrar(access_token, usuario);` |
| 12 | `Frontend/src/contexts/ContextoAuth.tsx:34-36` | `Cookies.set('token', token, { expires: 7, path: '/' }); localStorage.setItem('usuario', ...)` |
| 13 | `Frontend/src/components/RotaPrivada/RotaPrivada.tsx:17` | `return estaAutenticado ? <>{children}</> : <Navigate to="/login" replace />;` |

Caso secundário (só back-end, porque o `criar` de área está **comentado** no front em `GestaoPropriedade.tsx:204`): `POST /api/areas-plantio`
`routes/api.php:40` → `StoreAreaPlantioRequest` (`Requests/StoreAreaPlantioRequest.php:15-21`, ex.: `'propriedade_id' => 'required|exists:propriedades,id'`) → `AreaPlantioController.php:29-36` (`$dados['qr_code_hash'] = Str::uuid()->toString(); $area = AreaPlantio::create($dados); return $this->success($area, 'Área criada', 201);`) → `Controller.php:7-14`.

## Proposta de etapas da aba do Pipeline Inspector (Login)

Sugestão: **7 etapas**, agrupando os passos acima. Trechos curtos e reais; nada de camadas inventadas.

1. **Formulário (React)**: `Login.tsx:28` `usuarioService.login({ email, password })`
2. **Cliente HTTP (axios)**: `usuarioService.ts:20` `api.post<LoginResponse>('/login', dados)`
3. **Rota Laravel**: `routes/api.php:25` `Route::post('/login', [AuthController::class, 'login']);`
4. **Validação inline**: `AuthController.php:13` `$request->validate(['email' => 'required|string|email', ...])`
5. **Busca + senha (Eloquent)**: `AuthController.php:23` `Usuario::where('email', ...)->first()` e `:25` `Hash::check(...)`
6. **Token Sanctum**: `AuthController.php:32` `$usuario->createToken(...)->plainTextToken`
7. **Sessão no front**: `ContextoAuth.tsx:34-36` `Cookies.set('token', token, { expires: 7 })`; depois `RotaPrivada.tsx:17`

Observações: o back-end **não** tem camada service/repository, então a aba não deve mostrar "Service" nem "Repository". O que corresponde ao "persistência" é a etapa 5 (Model `Usuario`, `$table = 'usuarios'`, `Usuario.php:19`). Se preferir um fluxo de CRUD, usar `POST /areas-plantio` (caso secundário, 5 etapas: Rota → FormRequest → Controller → `AreaPlantio::create` → `success()`); **[CONFIRMAR]** com o dono se mostrar esse caso, pois o front não o chama hoje (comentado). A mensagem de erro 401 do passo 8 não tem etapa própria; incluir como "ramo de erro" **[CONFIRMAR]** se o inspector comporta ramos.

## Tem back-end rastreável?

**Sim.** Código PHP/Laravel completo no repo (`Backend/`), rotas, controllers e models legíveis. Dá para rastrear do endpoint à resposta sem rodar nada.

## Classificação (Parte 2): **PRECISA DE BANCO** (back-end); o front-end roda sem banco

- Back-end precisa de banco: o login consulta `Usuario::where('email', ...)->first()` (`Backend/app/Http/Controllers/AuthController.php:23`); `docker-compose.yml:32-35` sobe `mysql:8.0` e o backend `depends_on: db` (`:16-17`); `Backend/config/database.php:20` `'default' => env('DB_CONNECTION', 'sqlite')`; `Backend/.env.example:23` `DB_CONNECTION=sqlite`; migrations em `Backend/database/migrations/*`.
- Front-end roda sem banco: não importa driver de banco; só HTTP via axios (`Frontend/src/services/api.ts:7-9`, baseURL `/api`). A tela pública `Home` não faz chamada de API (`Pages/public/Home/Home.tsx`, nenhuma referência a `api`/`Service`). As telas privadas precisam só de respostas JSON (mockáveis).
- O `DatabaseSeeder.php:26-28` cria um usuário demo, mas **não foi executado** (regra de nunca acessar banco).

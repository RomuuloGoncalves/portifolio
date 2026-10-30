import type { CenarioPipeline } from './portfolio'

// Trechos copiados de .specs/features/refactor-portfolio/research/arch-<projeto>.md (PIPE-04); o teste de fonte confere cada linha.
export const pipeline: CenarioPipeline[] = [
  {
    id: 'projetoAGX',
    titulo: 'projetoAGX: empréstimo',
    etapas: [
      {
        label: 'POST /emprestimo',
        file: 'server.ts:62',
        desc: 'A rota de criar empréstimo passa por dois middlewares antes de chegar ao controller.',
        tags: ['Express 5', 'Deno', 'TypeScript'],
        code: `router.post("/emprestimo", authMiddleware, adminMiddleware, emprestimoController.criar)`,
      },
      {
        label: 'Autenticação JWT',
        file: 'core/authMiddleware.ts:26',
        desc: 'Exige o header Bearer, confere a blacklist de tokens revogados e verifica o JWT.',
        tags: ['JWT', 'Blacklist'],
        code: `const decoded = jwt.verify(token, secret);`,
      },
      {
        label: 'Autorização (admin)',
        file: 'core/adminMiddleware.ts:6',
        desc: 'Só administrador cria empréstimo; os outros recebem 403.',
        tags: ['RBAC'],
        code: `if (!usuario || usuario.role !== "admin")`,
      },
      {
        label: 'Validação',
        // [CONFIRMAR] número de linha aproximado no arch-projetoAGX.md
        file: 'emprestimoController.ts:94',
        desc: 'O corpo é validado com request-check; erro de validação volta como 400 antes de chegar ao service.',
        tags: ['request-check'],
        code: `const erros = regras.check({ usuario_id: corpo.usuario_id }, ...)`,
      },
      {
        label: 'Regra + transação',
        // [CONFIRMAR] número de linha aproximado no arch-projetoAGX.md
        file: 'emprestimoService.ts:43-44',
        desc: 'Numa transação Mongoose, o service busca o livro, recusa se não houver estoque e decrementa a quantidade disponível.',
        tags: ['Mongoose', 'Transação'],
        code: `session.startTransaction()
if (livro.obterQuantidadeDisponivel() <= 0) throw ...err_badRequest(...)`,
      },
      {
        label: 'Persistência + 201',
        file: 'core/CoreRepository.ts:39',
        desc: 'O repositório base grava o empréstimo na mesma sessão; depois do commit o controller responde 201.',
        tags: ['MongoDB', 'Repository'],
        code: `this.bd.create([modelo.obterDados()], options)
response.send_created("Empréstimo criado com sucesso", ...)`,
      },
    ],
  },
  {
    id: 'Liftech',
    titulo: 'Liftech: impacto vira alerta',
    etapas: [
      {
        label: 'POST /api/telemetry',
        file: 'Backend/src/app.ts:70',
        desc: 'Tudo abaixo de /api exige token; a telemetria do sensor IoT entra por esse roteador.',
        tags: ['Express 5', 'TypeScript'],
        code: `app.use('/api', autenticar);
app.use('/api/telemetry', telemetryRouter);`,
      },
      {
        label: 'Autenticação e escopo',
        file: 'Backend/src/core/autenticar.ts:33-40',
        desc: 'Verifica o JWT, relê o usuário no banco a cada requisição e carrega as filiais que ele pode ver.',
        tags: ['JWT', 'Multi-tenant'],
        code: `jwt.verify(token, env.jwt_secret, { algorithms: ["HS256"] })
req.escopo = await carregarEscopo(usuario);`,
      },
      {
        label: 'Validação e isolamento',
        file: 'feature/telemetry/telemetryController.ts:83-97',
        desc: 'Valida o corpo e devolve 404 se o dispositivo não pertence ao escopo do usuário.',
        tags: ['request-check', 'Escopo por filial'],
        code: `regras.check({ dispositivoId: corpo.dispositivoId, dataDados: corpo.dataDados })
if (!(await idsDosDispositivos(req)).includes(String(corpo.dispositivoId)))`,
      },
      {
        label: 'Service → Repository',
        file: 'core/coreService.ts:25-31',
        desc: 'O ServiceBase genérico repassa ao RepositoryBase, que grava a leitura na collection telemetry.',
        tags: ['ServiceBase', 'Mongoose'],
        code: `const criado = await this.repositorio.criar(entidade);
await this.bd.create(dados)`,
      },
      {
        label: 'Impacto vira alerta',
        file: 'feature/machine/statusService.ts:63-76',
        desc: 'Acima do limite configurável, abre um incidente pendente e coloca a empilhadeira em alerta.',
        tags: ['Regra de domínio'],
        code: `if (forcaImpacto !== undefined && forcaImpacto >= limiteImpacto()) { await registrarImpacto(...) }
incidentes.criar(new incidentModel({ ..., status: "pendente", origem: "sensor" }))
aplicarStatus(id, "alerta")`,
      },
      {
        label: 'Resposta 201',
        file: 'feature/telemetry/telemetryController.ts:109',
        desc: 'Devolve a leitura no formato da API, sem campos internos.',
        tags: ['REST'],
        code: `respostaSucesso(res, StatusCode.CREATED, criado.obterDados())`,
      },
    ],
  },
  {
    id: 'Moni',
    titulo: 'Moni: nova transação',
    etapas: [
      {
        label: 'Server Action',
        file: 'app/(dashboard)/transactions/actions.ts:78-79',
        desc: 'Não há endpoint HTTP: o formulário chama a Server Action, que pega o usuário da sessão e delega ao service.',
        tags: ['Next.js', 'Server Actions'],
        code: `const userId = await requireUserId();
const transaction = await transactionService.createTransaction(userId, input);`,
      },
      {
        label: 'Sessão',
        file: 'app/(dashboard)/transactions/actions.ts:32-33',
        desc: 'O middleware do next-auth já exigiu login; a action lê a sessão JWT para obter o userId.',
        tags: ['next-auth', 'JWT'],
        code: `const session = await getServerSession(authOptions);
export default withAuth({ pages: { signIn: "/login" } });`,
      },
      {
        label: 'Service: regras',
        file: 'services/transaction.service.ts:198-201',
        desc: 'Valida valor, uso de categoria e contas de transferência antes de tocar no banco.',
        tags: ['TypeScript'],
        code: `assertValidAmount(input.amount);
assertValidCategoryUsage(input.type, input.categoryId);
assertValidTransferAccounts(input.type, input.accountId, input.toAccountId);`,
      },
      {
        label: 'Transação Mongo',
        file: 'services/transaction.service.ts:211-214',
        desc: 'Abre uma transação e o repositório grava a transação financeira dentro dela.',
        tags: ['Mongoose', 'Repository'],
        code: `const session = await mongoose.startSession();
await session.withTransaction(async () => { ... });
const [doc] = await Transaction.create([input], { session });`,
      },
      {
        label: 'Model e saldo',
        file: 'models/Transaction.ts:11',
        desc: 'O schema restringe o tipo; se a transação está paga, o saldo da conta é ajustado na mesma transação.',
        tags: ['MongoDB'],
        code: `type: { type: String, required: true, enum: TRANSACTION_TYPES },
{ $inc: { balance: deltaCents } }`,
      },
    ],
  },
  {
    // [CONFIRMAR] caso de uso: Login (escolhido) ou POST /areas-plantio, ver arch-soloTrack.md
    id: 'soloTrack',
    titulo: 'soloTrack: login',
    etapas: [
      {
        label: 'Formulário',
        file: 'Frontend/src/Pages/auth/Login/Login.tsx:28',
        desc: 'A tela de login envia e-mail e senha pelo service do usuário.',
        tags: ['React'],
        code: `const response = await usuarioService.login({ email, password });`,
      },
      {
        label: 'Cliente HTTP',
        file: 'Frontend/src/services/usuarioService.ts:20',
        desc: 'Uma instância axios faz o POST para a API Laravel.',
        tags: ['axios'],
        code: `api.post<LoginResponse>('/login', dados)`,
      },
      {
        label: 'POST /login',
        file: 'Backend/routes/api.php:25',
        desc: 'Rota pública; as demais ficam no grupo auth:sanctum.',
        tags: ['Laravel'],
        code: `Route::post('/login', [AuthController::class, 'login']);`,
      },
      {
        label: 'Validação',
        file: 'Backend/app/Http/Controllers/AuthController.php:13',
        desc: 'Validação inline no controller; erro vira 422 em JSON.',
        tags: ['PHP'],
        code: `$credentials = $request->validate(['email' => 'required|string|email', 'password' => 'required|string|min:8'], ...)`,
      },
      {
        label: 'Busca + senha',
        file: 'Backend/app/Http/Controllers/AuthController.php:23-25',
        desc: 'Sem service nem repository: o controller consulta o Model Eloquent e compara o hash; falha devolve 401.',
        tags: ['Eloquent'],
        code: `$usuario = Usuario::where('email', $credentials['email'])->first();
if (!$usuario || !Hash::check($credentials['password'], $usuario->password))`,
      },
      {
        label: 'Token Sanctum',
        file: 'Backend/app/Http/Controllers/AuthController.php:32',
        desc: 'Gera um token Bearer e devolve junto com o usuário.',
        tags: ['Sanctum'],
        code: `$token = $usuario->createToken($usuario->nome . '-AuthToken')->plainTextToken;`,
      },
      {
        label: 'Sessão no front',
        file: 'Frontend/src/contexts/ContextoAuth.tsx:34-36',
        desc: 'O token vai para um cookie e a rota privada passa a liberar as telas.',
        tags: ['React', 'Cookie'],
        code: `Cookies.set('token', token, { expires: 7, path: '/' });
return estaAutenticado ? <>{children}</> : <Navigate to="/login" replace />;`,
      },
    ],
  },
  {
    id: 'ONGFlow',
    titulo: 'ONGFlow: novo projeto',
    etapas: [
      {
        label: 'Chamada no front',
        file: 'Frontend/src/services/projetoService.ts:27-29',
        desc: 'A ONG salva o projeto e o service faz o POST.',
        tags: ['React', 'axios'],
        code: `return api.post<Projeto>('/projetos', data);`,
      },
      {
        label: 'Cliente HTTP + token',
        file: 'Frontend/src/services/api.ts:13-17',
        desc: 'O interceptor injeta o token do cookie em toda requisição.',
        tags: ['axios', 'Bearer'],
        code: `const token = Cookies.get('token');
if (token) { config.headers['Authorization'] = \`Bearer \${token}\`; }`,
      },
      {
        label: 'POST /api/projetos',
        file: 'Backend/routes/api.php:58',
        desc: 'Rota dentro do prefixo projetos, sem auth:sanctum.',
        tags: ['Laravel'],
        code: `Route::post('/', [ProjetoController::class, 'store']);`,
      },
      {
        label: 'Controller',
        file: 'Backend/app/Http/Controllers/ProjetoController.php:28-31',
        desc: 'Sem service nem repository: o controller monta os dados e cria o projeto pelo Eloquent.',
        tags: ['PHP'],
        code: `$data = $request->all();
$data['status'] = 'ativo';
$projeto = Projeto::create($data);`,
      },
      {
        label: 'Model Eloquent',
        file: 'Backend/app/Models/Projeto.php:15-23',
        desc: 'Só os campos de $fillable entram; as habilidades ficam na tabela pivô.',
        tags: ['Eloquent', 'SQL'],
        code: `protected $fillable = ['nome','descricao','data_inicio','quantidade_maxima_voluntarios','status','id_ong','id_endereco'];
return $this->belongsToMany(Habilidade::class, 'projeto_habilidade', 'id_projeto', 'id_habilidade');`,
      },
      {
        label: 'Resposta 201',
        file: 'Backend/app/Http/Controllers/ProjetoController.php:44-45',
        desc: 'Carrega as relações e devolve o projeto criado em JSON.',
        tags: ['REST'],
        code: `$projeto->load(['habilidades', 'ong.endereco', 'voluntarios']);
return response()->json($projeto, 201);`,
      },
    ],
  },
]

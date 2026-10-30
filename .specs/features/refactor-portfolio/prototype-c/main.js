const root = document.documentElement;

// ---------- Tema ----------
const toggle = document.querySelector('.theme-toggle');
function syncToggleLabel() {
  toggle.setAttribute('aria-label', `Alternar para tema ${root.dataset.theme === 'dark' ? 'claro' : 'escuro'}`);
}
toggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
  syncToggleLabel();
});
syncToggleLabel();

// ---------- Barra de requisição: rota da seção visível ----------
const rota = document.getElementById('rota-atual');
const menu = document.getElementById('rotas');
const navLinks = [...document.querySelectorAll('#rotas a, .nav__links a')];
const sectionObserver = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    rota.textContent = e.target.dataset.route;
    navLinks.forEach((a) => a.toggleAttribute('aria-current', a.hash === `#${e.target.id}`));
  }
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main > section').forEach((s) => sectionObserver.observe(s));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.hidePopover()));

// ---------- Pipeline Inspector ----------
// Trechos ilustrativos dos padrões descritos nos READMEs; sem métricas de produção.
const scenarios = {
  agx: [
    {
      label: 'POST /emprestimos',
      file: 'routes/emprestimo.routes.ts',
      desc: 'A requisição chega com o id do livro. O corpo é validado antes de qualquer acesso ao banco.',
      tags: ['Express', 'Deno', 'TypeScript'],
      code: `// rota de empréstimo
router.post(
  '/emprestimos',
  autenticar,
  autorizar('leitor', 'admin'),
  emprestimoController.criar,
);`,
    },
    {
      label: 'JWT + RBAC',
      file: 'middlewares/auth.ts',
      desc: 'O token é verificado, conferido contra a blacklist de tokens revogados e o papel do usuário decide se ele pode seguir.',
      tags: ['JWT', 'RBAC', 'Blacklist'],
      code: `export const autorizar = (...papeis: Papel[]) =>
  (req, res, next) => {
    if (!papeis.includes(req.usuario.papel)) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }
    next();
  };`,
    },
    {
      label: 'Serviço de domínio',
      file: 'services/emprestimo.service.ts',
      desc: 'A regra de negócio fica no serviço: o controller não sabe de banco nem de transação.',
      tags: ['Camadas', 'Services'],
      code: `async criar(usuarioId: string, livroId: string) {
  return this.comTransacao(async (session) => {
    await this.reservarExemplar(livroId, session);
    return Emprestimo.create(
      [{ usuario: usuarioId, livro: livroId }],
      { session },
    );
  });
}`,
    },
    {
      label: 'Transação MongoDB',
      file: 'services/emprestimo.service.ts',
      desc: 'O estoque só diminui se houver exemplar disponível. Se qualquer passo falhar, a transação é abortada e nada fica pela metade.',
      tags: ['Mongoose', 'Transações', 'Atomicidade'],
      code: `const session = await mongoose.startSession();
session.startTransaction();
try {
  const ok = await Livro.updateOne(
    { _id: livroId, estoque: { $gt: 0 } },
    { $inc: { estoque: -1 } },
    { session },
  );
  if (ok.modifiedCount === 0) throw new SemEstoque();
  await session.commitTransaction();
} catch (e) {
  await session.abortTransaction();
  throw e;
}`,
    },
    {
      label: '201 Created',
      file: 'tests/emprestimo.test.ts',
      desc: 'A resposta segue o contrato documentado no Swagger, e os testes de integração com Supertest cobrem o fluxo.',
      tags: ['Swagger', 'Supertest'],
      code: `const res = await request(app)
  .post('/emprestimos')
  .set('Authorization', \`Bearer \${token}\`)
  .send({ livroId });

expect(res.status).toBe(201);`,
    },
  ],
  liftech: [
    {
      label: 'HTTP request',
      file: 'modules/<feature>/routes.ts',
      desc: 'Cada módulo de domínio expõe as próprias rotas Express. A API fica organizada por feature, não por tipo de arquivo.',
      tags: ['Express', 'Node.js 24', 'Monorepo'],
      code: `// um router por módulo de domínio
router.post('/', controller.criar);
router.get('/:id', controller.buscar);

app.use('/api/<feature>', router);`,
    },
    {
      label: 'Validação',
      file: 'modules/<feature>/rules.ts',
      desc: 'As regras de validação ficam junto da feature e rodam antes do caso de uso.',
      tags: ['Validação', 'TypeScript'],
      code: `export function validar(dto: CriarDTO): Erro[] {
  const erros: Erro[] = [];
  if (!dto.nome?.trim()) erros.push({ campo: 'nome' });
  return erros;
}`,
    },
    {
      label: 'Caso de uso',
      file: 'modules/<feature>/use-cases/criar.ts',
      desc: 'O caso de uso recebe o repositório por parâmetro. Isso deixa o domínio testável sem banco.',
      tags: ['DDD', 'Casos de uso'],
      code: `export class Criar {
  constructor(private repo: Repositorio) {}

  async executar(dto: CriarDTO) {
    const entidade = Entidade.criar(dto);
    return this.repo.salvar(entidade);
  }
}`,
    },
    {
      label: 'Repositório',
      file: 'modules/<feature>/repository.ts',
      desc: 'A implementação concreta do repositório usa Mongoose. O domínio só conhece a interface.',
      tags: ['Mongoose', 'MongoDB', 'Repository'],
      code: `export class RepositorioMongo implements Repositorio {
  async salvar(e: Entidade) {
    const doc = await Model.create(e.toJSON());
    return Entidade.fromDoc(doc);
  }
}`,
    },
    {
      label: 'Teste',
      file: 'modules/<feature>/criar.test.ts',
      desc: 'Testes unitários com Vitest usam um repositório em memória no lugar do Mongoose.',
      tags: ['Vitest', 'Testes unitários'],
      code: `it('cria a entidade', async () => {
  const uc = new Criar(new RepositorioEmMemoria());
  const r = await uc.executar({ nome: 'teste' });
  expect(r.id).toBeDefined();
});`,
    },
  ],
};

const tabs = document.querySelectorAll('[role="tab"]');
const pipe = document.getElementById('pipe');
const nodesEl = pipe.querySelector('.pipe__nodes');
const detail = pipe.querySelector('.pipe__detail');
const stacked = matchMedia('(max-width: 1023px)');
let current = 'agx';
let activeIndex = 0;

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const TOKEN = /(\/\/.*$)|('[^']*'|"[^"]*"|`[^`]*`)|\b(\d+(?:\.\d+)?)\b|\b(const|let|await|async|return|if|throw|try|catch|finally|export|class|new|function|implements|private|constructor|import|from|of|in)\b|\b([A-Z][A-Za-z0-9_]*)\b|(\$?[A-Za-z_][\w$]*)(?=\s*\()|(?<=\.)([A-Za-z_$][\w$]*)|(\$?[A-Za-z_][\w$]*)(?=\s*:(?!:))/gm;
const CLASSES = ['c', 's', 'n', 'k', 't', 'f', 'p', 'p'];

function highlight(code) {
  return escapeHtml(code).replace(TOKEN, (m, ...g) => {
    const i = g.findIndex((x, idx) => idx < CLASSES.length && x !== undefined);
    return i < 0 ? m : `<span class="${CLASSES[i]}">${m}</span>`;
  });
}

// No celular/tablet o detalhe abre dentro da etapa ativa (acordeão); no desktop fica abaixo da linha
function placeDetail() {
  const li = nodesEl.children[activeIndex];
  if (stacked.matches) li.append(detail);
  else nodesEl.after(detail);
}
stacked.addEventListener('change', placeDetail);

function renderNodes() {
  nodesEl.innerHTML = '';
  scenarios[current].forEach((node, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = node.label;
    btn.addEventListener('click', () => selectNode(i, true));
    li.append(btn);
    nodesEl.append(li);
  });
}

function selectNode(i, fromUser) {
  const node = scenarios[current][i];
  activeIndex = i;
  [...nodesEl.children].forEach((li, j) => {
    li.classList.toggle('active', j === i);
    li.classList.toggle('done', j < i);
    li.querySelector('button').setAttribute('aria-pressed', String(j === i));
  });
  detail.querySelector('.code__file').textContent = node.file;
  detail.querySelector('code').innerHTML = highlight(node.code);
  detail.querySelector('.pipe__node-title').textContent = node.label;
  detail.querySelector('.pipe__desc').textContent = node.desc;
  detail.querySelector('.pipe__tags').innerHTML = node.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join('');
  placeDetail();
  if (fromUser && stacked.matches) nodesEl.children[i].scrollIntoView({ block: 'nearest' });
  detail.classList.remove('swap');
  void detail.offsetWidth; // reinicia a animação curta de troca
  detail.classList.add('swap');
}

function selectScenario(tab) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
  });
  pipe.setAttribute('aria-labelledby', tab.id);
  current = tab.dataset.scenario;
  nodesEl.after(detail); // tira o detalhe de dentro das etapas antes de recriá-las
  renderNodes();
  selectNode(current === 'agx' ? 3 : 2);
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectScenario(tab));
  tab.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    next.focus();
    selectScenario(next);
  });
});
selectScenario(tabs[0]);

// ---------- Carrossel de tecnologias: cópia para o loop contínuo ----------
const [marqueeList, marqueeClone] = document.querySelectorAll('.marquee ul');
marqueeClone.innerHTML = marqueeList.innerHTML;

// ---------- Copiar e-mail ----------
const copyBtn = document.querySelector('.copy');
const copyStatus = copyBtn.nextElementSibling;
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.copy);
    copyBtn.textContent = 'Copiado';
    copyBtn.classList.add('copied');
    copyStatus.textContent = 'E-mail copiado';
  } catch {
    getSelection().selectAllChildren(document.querySelector('.contact__mail a'));
    copyStatus.textContent = 'Não foi possível copiar. E-mail selecionado.';
  }
  setTimeout(() => {
    copyBtn.textContent = 'Copiar';
    copyBtn.classList.remove('copied');
    copyStatus.textContent = '';
  }, 2000);
});

document.querySelector('.year').textContent = new Date().getFullYear();

// ---------- Fallback sem CSS scroll-driven (Safari / Firefox) ----------
// ponytail: no fallback só há barra de progresso e reveal; o parallax fica estático
if (!CSS.supports('animation-timeline: scroll()')) {
  root.classList.add('js-fallback');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-viewport');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => revealObserver.observe(el));

  let ticking = false;
  const update = () => {
    ticking = false;
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--progress', max > 0 ? scrollY / max : 0);
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

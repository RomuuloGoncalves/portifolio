const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fade = (el, ms) => reduced.matches || el.animate([{ opacity: 0 }, { opacity: 1 }], ms);

// tema
document.getElementById('tema').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});

// rota ativa na request line
const rota = document.getElementById('rota-atual');
const menu = document.getElementById('rotas');
const navLinks = document.querySelectorAll('#rotas a, .bar-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    rota.textContent = e.target.dataset.route;
    navLinks.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id));
  }
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main > section').forEach((s) => sectionObserver.observe(s));

// navegação: fecha o menu e leva o foco para o título da seção
navLinks.forEach((a) => a.addEventListener('click', () => {
  if (menu.matches(':popover-open')) menu.hidePopover();
  const target = document.querySelector(a.getAttribute('href'));
  const h = target?.querySelector('h2, h1');
  if (h) setTimeout(() => h.focus({ preventScroll: true }), 0);
}));

// trace: posição em meses a partir de 02/2021 até o mês atual
const toMonths = (ym) => { const [y, m] = ym.split('-').map(Number); return y * 12 + m - 1; };
const now = new Date();
const base = toMonths('2021-02');
const end = now.getFullYear() * 12 + now.getMonth() + 1;
const total = end - base;
const track = document.querySelector('.trace-track');
track.style.setProperty('--total', total);

const spans = [...document.querySelectorAll('.trace-spans > li')];
for (const li of spans) {
  const start = toMonths(li.dataset.start) - base;
  const stop = li.dataset.end ? toMonths(li.dataset.end) - base + 1 : total;
  li.style.setProperty('--start', start);
  li.style.setProperty('--len', stop - start);
  li.toggleAttribute('data-open', !li.dataset.end);
}
const axis = document.querySelector('.trace-axis');
for (let y = 2021; y <= now.getFullYear(); y++) {
  const t = document.createElement('span');
  t.className = 'tick';
  t.textContent = y;
  t.style.left = (Math.max(0, y * 12 - base) / total * 100) + '%';
  axis.append(t);
}

const panel = document.querySelector('.trace-panel');
const buttons = spans.map((li) => li.querySelector('button'));
function select(btn) {
  buttons.forEach((b) => { b.setAttribute('aria-pressed', b === btn); b.tabIndex = b === btn ? 0 : -1; });
  const li = btn.closest('li');
  panel.innerHTML = `<p class="panel-title"></p><p class="panel-time"></p>${li.querySelector('.span-desc').innerHTML}`;
  panel.querySelector('.panel-title').textContent = btn.querySelector('.span-name').textContent;
  panel.querySelector('.panel-time').textContent =
    btn.querySelector('.span-time').textContent + ' · ' + li.querySelector('.span-meta').textContent;
  fade(panel, 150);
}
buttons.forEach((b, i) => {
  b.addEventListener('click', () => select(b));
  b.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    buttons[(i + step + buttons.length) % buttons.length].focus();
  });
});
select(document.querySelector('[data-default] button'));

// projetos: painel sticky com o screenshot do item em hover/foco
const projPanel = document.querySelector('.proj-panel');
const projItems = [...document.querySelectorAll('.proj-list > li')];
const shots = projItems.map((li) => projPanel.appendChild(li.querySelector('.shot').cloneNode(true)));
function showProj(i) {
  projItems.forEach((li, j) => li.classList.toggle('is-active', i === j));
  shots.forEach((s, j) => s.classList.toggle('is-active', i === j));
}
projItems.forEach((li, i) => {
  li.addEventListener('pointerenter', () => showProj(i));
  li.addEventListener('focusin', () => showProj(i));
});
showProj(0);

// copiar e-mail
const copyBtn = document.getElementById('copiar');
const copyLabel = document.getElementById('copiar-label');
const copyStatus = document.getElementById('copiar-status');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    copyLabel.textContent = copyStatus.textContent = 'copiado';
  } catch {
    // fallback: seleciona o e-mail para o usuário copiar
    getSelection().selectAllChildren(document.querySelector('.email'));
    copyLabel.textContent = 'selecionado';
    copyStatus.textContent = 'Não foi possível copiar. E-mail selecionado.';
  }
  setTimeout(() => { copyLabel.textContent = 'copiar'; }, 2000);
});

document.getElementById('ano').textContent = now.getFullYear();

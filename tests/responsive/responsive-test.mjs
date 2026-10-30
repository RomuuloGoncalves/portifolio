// Teste de responsividade: Chrome headless via CDP, sem dependências.
// Uso: node responsive-test.mjs [url]   (padrão: dev server em 127.0.0.1:5180 (VITE_BASE=/ npx vite --port 5180))
// Saída: tabela largura x tema x ok, falhas detalhadas e _responsive/<largura>_<tema>.png. Exit 1 se algo falhar.
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const URL_ALVO = process.argv[2] ?? 'http://127.0.0.1:5180/';
const LARGURAS = [320, 360, 375, 390, 414, 600, 768, 1024, 1280, 1440, 1920];
const TEMAS = ['dark', 'light'];
const ALTURA = 800;
const OUT = join(dirname(fileURLToPath(import.meta.url)), '_responsive');
const CHROME = process.env.CHROME ?? '/usr/bin/google-chrome';

// ---------- CDP mínimo ----------
async function abrirChrome() {
  const perfil = await mkdtemp(join(tmpdir(), 'resp-chrome-'));
  const proc = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${perfil}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu', 'about:blank',
  ], { stdio: 'ignore' });
  let porta;
  for (let i = 0; i < 100 && !porta; i++) {
    await sleep(100);
    porta = await readFile(join(perfil, 'DevToolsActivePort'), 'utf8').then((t) => t.split('\n')[0]).catch(() => null);
  }
  if (!porta) throw new Error('Chrome não abriu a porta de depuração');
  const { webSocketDebuggerUrl } = await (await fetch(`http://127.0.0.1:${porta}/json/version`)).json();
  const ws = new WebSocket(webSocketDebuggerUrl);
  await new Promise((ok, erro) => { ws.onopen = ok; ws.onerror = erro; });
  let id = 0;
  const pendentes = new Map();
  const ouvintes = new Set();
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pendentes.has(msg.id)) {
      const { ok, erro } = pendentes.get(msg.id);
      pendentes.delete(msg.id);
      msg.error ? erro(new Error(msg.error.message)) : ok(msg.result);
    } else ouvintes.forEach((fn) => fn(msg));
  };
  const send = (method, params = {}, sessionId) => new Promise((ok, erro) => {
    pendentes.set(++id, { ok, erro });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const fechar = async () => { ws.close(); proc.kill(); await sleep(200); await rm(perfil, { recursive: true, force: true }); };
  return { send, ouvintes, fechar };
}

// ---------- Verificações dentro da página (serializada para Runtime.evaluate) ----------
async function verificar() {
  await document.fonts.ready;
  const vw = innerWidth;
  const falhas = [];
  const visivel = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('.sr-only, [popover]:not(:popover-open)');
  };
  const nome = (el) => el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).join('.')}` : '');
  // recortado por um ancestral com overflow (marca d'água, marquee, blocos de código com rolagem)
  const recortado = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      if (getComputedStyle(a).overflowX !== 'visible') {
        const r = a.getBoundingClientRect();
        if (r.left >= -1 && r.right <= vw + 1) return true;
      }
    }
    return false;
  };

  // 1) sem rolagem horizontal
  const sw = document.documentElement.scrollWidth;
  if (sw > vw) falhas.push(`rolagem horizontal: scrollWidth ${sw} > innerWidth ${vw}`);

  // 2) nenhum elemento vazando da viewport
  const vazando = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (el.closest('svg') && el.tagName !== 'svg') continue;
    if (el.matches('.skip, .layer-grid, script, style') || !visivel(el)) continue;
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 1 || r.left < -1) && !recortado(el)) vazando.push(`${nome(el)} [${Math.round(r.left)}..${Math.round(r.right)}]`);
  }
  if (vazando.length) falhas.push(`vaza da viewport: ${vazando.slice(0, 5).join(', ')}${vazando.length > 5 ? ` (+${vazando.length - 5})` : ''}`);

  // 3) alvos clicáveis >= 40px no mobile
  if (vw < 768) {
    const pequenos = [];
    for (const el of document.querySelectorAll('a[href], button, [role="tab"]')) {
      if (el.matches('.skip') || !visivel(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.height < 40 || r.width < 40) pequenos.push(`${nome(el)} "${el.textContent.trim().slice(0, 20)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
    if (pequenos.length) falhas.push(`alvo < 40px: ${pequenos.slice(0, 6).join(', ')}${pequenos.length > 6 ? ` (+${pequenos.length - 6})` : ''}`);
  }

  // 4) pipeline: acordeão < 1024px (detalhe dentro da etapa ativa), sem corte em nenhuma etapa
  const tick = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 20)));
  let nodes = document.querySelector('.pipe__nodes');
  for (const tab of document.querySelectorAll('[role="tab"]')) {
    tab.click();
    await tick();
    nodes = document.querySelector('.pipe__nodes');
    for (const btn of [...nodes.querySelectorAll('button')]) {
      btn.click();
      await tick();
      const detalhe = document.querySelector('.pipe__detail');
      const ativo = nodes.querySelector('li.active');
      const etapa = `${tab.textContent.trim()}/${btn.textContent.trim()}`;
      if (vw < 1024) {
        if (!ativo?.contains(detalhe)) falhas.push(`pipeline ${etapa}: detalhe fora da etapa ativa`);
        if (btn.getAttribute('aria-expanded') !== 'true') falhas.push(`pipeline ${etapa}: aria-expanded`);
      } else if (detalhe.parentElement !== nodes.parentElement) falhas.push(`pipeline ${etapa}: detalhe deveria ficar abaixo das etapas`);
      const pipe = document.getElementById('pipe').getBoundingClientRect();
      const d = detalhe.getBoundingClientRect();
      if (d.left < pipe.left - 1 || d.right > pipe.right + 1) falhas.push(`pipeline ${etapa}: detalhe sai do painel`);
      const pre = detalhe.querySelector('pre');
      // no desktop o <pre> pode rolar (overflow-x: auto); abaixo de 1024 tem que quebrar sem corte
      if (vw < 1024 && pre.scrollWidth > pre.clientWidth + 1) falhas.push(`pipeline ${etapa}: código cortado (${pre.scrollWidth} > ${pre.clientWidth})`);
    }
  }
  document.querySelector('[role="tab"]').click();
  await tick();

  // 4b) blocos terminal/árvore dos projetos cabem sem rolagem interna
  for (const fig of document.querySelectorAll('.shot--term')) {
    if (fig.scrollWidth > fig.clientWidth + 1) falhas.push(`terminal cortado em ${fig.closest('article').querySelector('h3').textContent} (${fig.scrollWidth} > ${fig.clientWidth})`);
  }

  // 5) ficha SYSTEM_INFO visível e sem overflow
  const ficha = document.querySelector('.sysinfo');
  if (!ficha || !visivel(ficha)) falhas.push('SYSTEM_INFO ausente ou invisível');
  else {
    const r = ficha.getBoundingClientRect();
    if (r.left < -1 || r.right > vw + 1) falhas.push('SYSTEM_INFO sai da viewport');
    for (const el of [ficha, ...ficha.querySelectorAll('dt, dd, div')]) {
      if (el.scrollWidth > el.clientWidth + 1) falhas.push(`SYSTEM_INFO overflow em ${nome(el)} "${el.textContent.trim().slice(0, 24)}"`);
    }
    const linhas = [...ficha.querySelectorAll('dt')].map((dt) => dt.textContent);
    if (linhas.join() !== 'DEV,PRIMARY_STACK,SECONDARY,LOCATION') falhas.push(`SYSTEM_INFO linhas: ${linhas}`);
    const foto = document.querySelector('.photo__frame').getBoundingClientRect();
    if (r.top < foto.bottom) falhas.push('SYSTEM_INFO não está abaixo da foto');
  }
  return { falhas, altura: document.documentElement.scrollHeight };
}

// ---------- Execução ----------
const chrome = await abrirChrome();
await mkdir(OUT, { recursive: true });
const resultados = [];
try {
  for (const tema of TEMAS) {
    for (const largura of LARGURAS) {
      const { targetId } = await chrome.send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await chrome.send('Target.attachToTarget', { targetId, flatten: true });
      const s = (m, p) => chrome.send(m, p, sessionId);
      const erros = [];
      const ouvinte = (msg) => {
        if (msg.sessionId !== sessionId) return;
        if (msg.method === 'Runtime.exceptionThrown') erros.push(msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text);
        if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') erros.push(msg.params.args.map((a) => a.value ?? a.description).join(' '));
        if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') erros.push(`${msg.params.entry.text} ${msg.params.entry.url ?? ''}`.trim());
      };
      chrome.ouvintes.add(ouvinte);
      await Promise.all([s('Page.enable'), s('Runtime.enable'), s('Log.enable')]);
      const mobile = largura < 768;
      await s('Emulation.setDeviceMetricsOverride', { width: largura, height: ALTURA, deviceScaleFactor: 1, mobile });
      await s('Emulation.setTouchEmulationEnabled', { enabled: mobile });
      await s('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('theme', '${tema}')` });
      const carregou = new Promise((ok) => {
        const fn = (msg) => { if (msg.sessionId === sessionId && msg.method === 'Page.loadEventFired') { chrome.ouvintes.delete(fn); ok(); } };
        chrome.ouvintes.add(fn);
      });
      await s('Page.navigate', { url: URL_ALVO });
      await carregou;
      await sleep(300);

      const { result, exceptionDetails } = await s('Runtime.evaluate', { expression: `(${verificar})()`, awaitPromise: true, returnByValue: true });
      const falhas = exceptionDetails ? [`erro no teste: ${exceptionDetails.exception?.description ?? exceptionDetails.text}`] : [...result.value.falhas];
      const temaAplicado = (await s('Runtime.evaluate', { expression: 'document.documentElement.dataset.theme', returnByValue: true })).result.value;
      if (temaAplicado !== tema) falhas.push(`tema esperado ${tema}, aplicado ${temaAplicado}`);

      // print de página inteira: viewport do tamanho da página para as animações de entrada (view()) terminarem
      const altura = Math.min(result?.value?.altura ?? ALTURA, 16000);
      await s('Emulation.setDeviceMetricsOverride', { width: largura, height: altura, deviceScaleFactor: 1, mobile });
      await s('Runtime.evaluate', { expression: 'scrollTo(0, 0)' });
      await sleep(400);
      const { data } = await s('Page.captureScreenshot', { format: 'png' });
      await writeFile(join(OUT, `${largura}_${tema}.png`), Buffer.from(data, 'base64'));

      if (erros.length) falhas.push(`console: ${erros.join(' | ')}`);
      chrome.ouvintes.delete(ouvinte);
      await chrome.send('Target.closeTarget', { targetId });
      resultados.push({ largura, tema, falhas });
      process.stdout.write(falhas.length ? 'F' : '.');
    }
  }
} finally {
  await chrome.fechar();
}

console.log('\n\n| largura | escuro | claro |\n| --- | --- | --- |');
for (const largura of LARGURAS) {
  const st = (tema) => (resultados.find((r) => r.largura === largura && r.tema === tema).falhas.length ? 'FALHA' : 'ok');
  console.log(`| ${largura} | ${st('dark')} | ${st('light')} |`);
}
const comFalha = resultados.filter((r) => r.falhas.length);
for (const r of comFalha) console.log(`\n${r.largura}px ${r.tema}:\n  - ${r.falhas.join('\n  - ')}`);
console.log(`\n${resultados.length - comFalha.length}/${resultados.length} ok. Prints em ${OUT}`);
process.exitCode = comFalha.length ? 1 : 0;

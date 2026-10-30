import { chromium } from 'playwright-core';
const PORT = process.argv[2];
const OUT = '/home/romulo/Projetos/portifolio/.specs/features/refactor-portfolio/screenshots/ONGFlow';
const base = `http://localhost:${PORT}/ONGFlow/`;
const hab = (id, d) => ({ id, descricao: d });
const projetos = [
  { id: 1, id_ong: 1, nome: 'Horta Comunitária', descricao: 'Fictício', data_inicio: '2026-03-10', data_fim: null, status: 'ativo', habilidades: [hab(1,'Jardinagem'),hab(2,'Organização'),hab(3,'Comunicação'),hab(4,'Fotografia')], ong: { endereco: { cidade: 'Cidade Exemplo', estado: 'SP' } }, voluntarios: [] },
  { id: 2, id_ong: 1, nome: 'Reforço Escolar', descricao: 'Fictício', data_inicio: '2026-02-01', data_fim: null, status: 'ativo', habilidades: [hab(5,'Ensino')], ong: { endereco: { cidade: 'Cidade Exemplo', estado: 'SP' } }, voluntarios: [] },
  { id: 3, id_ong: 1, nome: 'Campanha do Agasalho', descricao: 'Fictício', data_inicio: '2025-05-01', data_fim: '2025-07-30', status: 'finalizado', habilidades: [hab(3,'Comunicação')], ong: { endereco: { cidade: 'Cidade Exemplo', estado: 'SP' } }, voluntarios: [] },
];
const dash = {
  stats: { projetosAtivos: 2, projetosFinalizados: 1, voluntariosAtivos: 3 },
  voluntariosAtivos: [{ id: 1, voluntario: { id: 1, nome: 'Voluntária Exemplo A' }, projeto: { id: 1, nome: 'Horta Comunitária' } }, { id: 2, voluntario: { id: 2, nome: 'Voluntário Exemplo B' }, projeto: { id: 2, nome: 'Reforço Escolar' } }],
  voluntariosDisponiveis: [{ id: 3, voluntario: { id: 3, nome: 'Voluntário Exemplo C', habilidades: [hab(1,'Jardinagem'), hab(5,'Ensino')] } }],
  projetosAtivos: projetos.slice(0, 2),
  projetosFinalizados: [projetos[2]],
};
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
for (const [name, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  await ctx.route(/\/api\//, (r) => {
    const u = new URL(r.request().url()).pathname;
    const j = (b) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(b) });
    if (u.endsWith('/ongs/dashboard')) return j(dash);
    if (u.endsWith('/ongs/1/projetos')) return j(projetos);
    if (u.endsWith('/user')) return j({ id: 1, nome: 'ONG Exemplo' });
    return j([]);
  });
  await ctx.addCookies([{ name: 'token', value: 'mock', url: base }]);
  await ctx.addInitScript(() => { localStorage.setItem('user', JSON.stringify({ id: 1, nome: 'ONG Exemplo' })); localStorage.setItem('userType', 'ong'); });
  const p = await ctx.newPage();
  for (const [file, hash] of [['home', '#/'], ['dashboard', '#/dashboard/ong'], ['projetos', '#/projetos/ong']]) {
    await p.goto(base + hash); await p.reload(); await p.waitForTimeout(2500);
    await p.screenshot({ path: `${OUT}/${file}-${name}.png` });
  }
  await ctx.close();
}
await browser.close();

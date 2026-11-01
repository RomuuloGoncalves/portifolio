import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import * as dados from '@/data/portfolio'

const { perfil, sobre, historico, projetosDestaque, outrosProjetos, certificados, marquee, matrizStack, secoes } = dados
const indexHtml = readFileSync('index.html', 'utf8')
const projetos = [...projetosDestaque, ...outrosProjetos]

// lista proibida de content.md (COPY-02); "!" é checado à parte
const PROIBIDOS = ['apaixonado', 'paixão', 'alto impacto', 'soluções inovadoras', 'inovador', 'transformam', 'dinâmicas', 'robustas', 'robusto', 'de ponta a ponta', 'sólida', 'jornada', 'trajetória de sucesso', 'tecnologias modernas', 'sistêmicas', 'alta performance', 'de verdade', 'vamos conversar']

// todas as strings de um valor, recursivamente
const textos = (v: unknown): string[] =>
  typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(textos) : v && typeof v === 'object' ? Object.values(v).flatMap(textos) : []

const proibidosEm = (v: unknown) => textos(v).filter((t) => t.includes('!') || PROIBIDOS.some((p) => t.toLowerCase().includes(p)))

describe('metadados (DADOS-02, A11Y-02)', () => {
  test('cargo do portfolio.ts aparece no <title>, description e og:title', () => {
    const cargo = perfil.cargo.toLowerCase()
    expect(indexHtml.match(/<title>(.*)<\/title>/)![1].toLowerCase()).toContain(cargo)
    expect(indexHtml.match(/name="description" content="([^"]*)"/)![1].toLowerCase()).toContain(cargo)
    expect(indexHtml.match(/property="og:title" content="([^"]*)"/)![1].toLowerCase()).toContain(cargo)
  })
  test('index.html não diz "Full Stack" nem bloqueia zoom', () => {
    expect(indexHtml).not.toMatch(/full stack/i)
    expect(indexHtml).not.toContain('user-scalable=no')
    expect(indexHtml).not.toContain('maximum-scale')
  })
})

describe('projetos (DADOS-03, PROJ-04)', () => {
  test.each(projetos.map((p) => [p.nome, p]))('%s tem os campos obrigatórios', (_, p) => {
    expect(p.nome.trim()).not.toBe('')
    expect(p.descricao.trim()).not.toBe('')
    expect(p.descricao.length).toBeLessThanOrEqual(220)
    expect(p.stack.length).toBeGreaterThan(0)
    expect(p.ano).toBeGreaterThanOrEqual(2020)
    for (const url of [p.repo, p.demo]) if (url !== undefined) expect(url).toMatch(/^https:\/\//)
    if (p.privado) expect(p.repo).toBeUndefined()
  })
  test('5 projetos em destaque, na ordem de PROJ-01', () => {
    expect(projetosDestaque.map((p) => p.nome)).toEqual(['Liftech', 'projetoAGX', 'Moni', 'soloTrack', 'ONGFlow'])
  })
  test('nenhum campo de imagem vazio (sem imagem = campo ausente)', () => {
    for (const p of projetos) expect(p.imagem, p.nome).not.toBe('')
  })
})

describe('stack (STACK-01, STACK-03)', () => {
  const todas = [...marquee.map((t) => t.nome), ...matrizStack.flatMap((g) => g.itens)]
  test('inclui o mínimo de STACK-01', () => {
    for (const t of ['Node.js', 'TypeScript', 'MongoDB', 'PHP', 'Laravel', 'MySQL', 'Git', 'Docker']) expect(todas).toContain(t)
  })
  test('matriz tem os 4 grupos do protótipo C', () => {
    expect(matrizStack.map((g) => g.grupo)).toEqual(['Back-end', 'Persistência', 'Infra e qualidade', 'Interface'])
  })
  test('sem tecnologia sem uso comprovado', () => {
    for (const t of ['GIMP', 'Gimp', 'Photoshop', 'Figma', 'Bootstrap', 'SCSS', 'Firebase']) expect(todas).not.toContain(t)
  })
})

describe('texto (COPY-02..05)', () => {
  test('nenhum termo da lista proibida nem "!" em todo o conteúdo', () => {
    expect(proibidosEm(dados)).toEqual([])
  })
  test('a verificação pega "apaixonado" e "vamos conversar"', () => {
    expect(proibidosEm({ a: 'Sou apaixonado por código' })).toHaveLength(1)
    expect(proibidosEm([{ b: 'Vamos conversar' }])).toHaveLength(1)
  })
  test('hero com no máximo 2 frases', () => {
    expect(perfil.hero.length).toBeLessThanOrEqual(2)
    expect(perfil.hero.join(' ').match(/[.?]\s|[.?]$/g)!.length).toBeLessThanOrEqual(2)
  })
  test('histórico: no máximo 3 itens por entrada', () => {
    for (const h of historico) expect(h.itens.length, h.titulo).toBeLessThanOrEqual(3)
  })
  test('títulos de seção de content.md rev. 2', () => {
    const titulo = (id: string) => secoes.find((s) => s.id === id)?.titulo
    expect(titulo('contato')).toBe('Contato')
    expect(secoes.find((s) => s.id === 'contato')?.sub).toBeUndefined()
    expect(secoes.find((s) => s.id === 'projetos')?.sub).toBe('Cinco projetos com API, banco e testes; links para o código.')
    expect(sobre.principios).toHaveLength(3)
  })
})

describe('certificados (CERT-01, CERT-02)', () => {
  test('todos com nome e emissor; credencial e url nunca vazias', () => {
    for (const c of certificados) {
      expect(c.nome.trim()).not.toBe('')
      expect(c.emissor.trim()).not.toBe('')
      expect(c.credencial).not.toBe('')
      expect(c.url).not.toBe('')
      if (c.data) expect(c.data).toMatch(/^\d{4}-\d{2}$/)
    }
  })
  test('certificados MongoDB têm credencial', () => {
    expect(certificados.filter((c) => c.emissor === 'MongoDB').every((c) => c.credencial)).toBe(true)
  })
})

describe('arquivos referenciados existem (T8: STACK-02, PERF-02)', () => {
  const sprite = readFileSync('src/assets/icons/tech.svg', 'utf8')
  test.each(marquee.map((t) => [t.nome, t.icone]))('ícone de %s está no sprite', (_, icone) => {
    expect(sprite).toContain(`<symbol id="i-${icone}"`)
  })
  test('toda imagem de projeto existe em src/assets e é WebP/AVIF', () => {
    for (const p of projetos.filter((p) => p.imagem)) {
      expect(existsSync(`src/assets/${p.imagem}`), p.imagem).toBe(true)
      expect(p.imagem).toMatch(/\.(webp|avif)$/)
    }
  })
  test('foto do hero em AVIF/WebP 600 e 1200 e currículo em public/', () => {
    for (const w of [600, 1200]) for (const ext of ['avif', 'webp']) expect(existsSync(`src/assets/img/foto-perfil-${w}.${ext}`)).toBe(true)
    expect(existsSync(`public/${perfil.curriculo}`)).toBe(true)
  })
})

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import TechMarquee from '@/components/TechMarquee.vue'
import { perfil } from '@/data/portfolio'
import { highlight } from '@/utils/highlight'

const root = document.documentElement

describe('tema (TEMA-01, TEMA-02)', () => {
  // o mesmo script que roda antes do paint no index.html
  const scriptTema = readFileSync('index.html', 'utf8').match(/<script>([\s\S]*?)<\/script>/)![1]
  const carregarPagina = (prefereClaro = false) => {
    window.matchMedia = ((q: string) => ({ matches: prefereClaro && q.includes('light') })) as typeof window.matchMedia
    new Function(scriptTema)()
  }

  beforeEach(() => localStorage.clear())

  test('alternar grava light e dark, e o próximo carregamento restaura os dois', async () => {
    carregarPagina()
    expect(root.dataset.theme).toBe('dark')
    const header = mount(AppHeader)
    const botao = header.get('.theme-toggle')
    expect(botao.attributes('aria-label')).toBe('Alternar para tema claro')

    await botao.trigger('click')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(botao.attributes('aria-label')).toBe('Alternar para tema escuro')
    root.dataset.theme = ''
    carregarPagina()
    expect(root.dataset.theme).toBe('light')

    header.unmount()
    const outro = mount(AppHeader)
    await outro.get('.theme-toggle').trigger('click')
    expect(localStorage.getItem('theme')).toBe('dark')
    root.dataset.theme = ''
    carregarPagina(true)
    expect(root.dataset.theme).toBe('dark')
    outro.unmount()
  })

  test('sem tema salvo usa prefers-color-scheme', () => {
    carregarPagina(true)
    expect(root.dataset.theme).toBe('light')
    carregarPagina(false)
    expect(root.dataset.theme).toBe('dark')
  })
})

describe('header (NAV-01, NAV-02, VIS-08)', () => {
  test('logo sem ".sys", sem barra de progresso, GET / e popover com as rotas', () => {
    const w = mount(AppHeader)
    expect(w.html()).not.toContain('.sys')
    expect(w.find('.navbar-scroll-progress').exists()).toBe(false)
    expect(w.get('.nav__logo-full').text()).toBe('Rômulo Gonçalves')
    expect(w.get('.reqline').text()).toContain('GET')
    expect(w.get('.reqline__route').text()).toBe('/')
    expect(w.get('.reqline').attributes('popovertarget')).toBe('rotas')
    const menu = w.get('#rotas')
    expect(menu.attributes()).toHaveProperty('popover')
    expect(menu.findAll('a').map((a) => a.text())).toEqual(['/', '/sobre', '/historico', '/arquitetura', '/projetos', '/stack', '/contato'])
    w.unmount()
  })
})

describe('ficha SYSTEM_INFO (HERO-02)', () => {
  afterEach(() => { perfil.sysinfo.status = '' })

  test('é um <dl> com DEV, PRIMARY_STACK, SECONDARY, LOCATION e sem STATUS quando vazio', () => {
    const dts = mount(HeroSection).findAll('.sysinfo dl dt').map((d) => d.text())
    expect(dts).toEqual(['DEV', 'PRIMARY_STACK', 'SECONDARY', 'LOCATION'])
  })
  test('STATUS aparece quando preenchido', () => {
    perfil.sysinfo.status = 'teste'
    expect(mount(HeroSection).findAll('.sysinfo dt').map((d) => d.text())).toContain('STATUS')
  })
  test('foto com AVIF/WebP em srcset, width/height e fetchpriority', () => {
    const w = mount(HeroSection)
    expect(w.findAll('source').map((s) => s.attributes('type'))).toEqual(['image/avif', 'image/webp'])
    const img = w.get('.photo img')
    expect(img.attributes()).toMatchObject({ width: '1200', height: '1600', fetchpriority: 'high', alt: perfil.foto.alt })
    expect(w.get('.photo__caption').text()).not.toContain('//')
  })
})

describe('marquee (HOME-01)', () => {
  test('lista duplicada, cópia com aria-hidden', () => {
    const listas = mount(TechMarquee).findAll('ul')
    expect(listas).toHaveLength(2)
    expect(listas[0].attributes('aria-hidden')).toBeUndefined()
    expect(listas[1].attributes('aria-hidden')).toBe('true')
    expect(listas[1].findAll('li')).toHaveLength(listas[0].findAll('li').length)
  })
})

describe('paleta única (VIS-11)', () => {
  const arquivos = (dir: string): string[] =>
    readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? arquivos(join(dir, f)) : [join(dir, f)]))
  const COR = /#[0-9a-f]{3,8}\b(?![-\w])|\brgba?\(|\bhsla?\(/i

  test('nenhum arquivo além de src/theme/palette.css tem cor hex/rgb/hsl', () => {
    const comCor = [...arquivos('src'), 'index.html']
      .filter((f) => /\.(css|vue|ts|html)$/.test(f) && !f.endsWith('palette.css'))
      .filter((f) => COR.test(readFileSync(f, 'utf8')))
    expect(comCor).toEqual([])
  })
  test('palette.css tem Preto frio + Pinho ativos e Carvão/Sálvia comentados', () => {
    const p = readFileSync('src/theme/palette.css', 'utf8')
    const semComentarios = p.replace(/\/\*[\s\S]*?\*\//g, '')
    expect(semComentarios).toContain('--bg-app: #0A0B0D')
    expect(semComentarios).toContain('--accent: #2FA586')
    expect(semComentarios).toContain('--accent: #1A6B55')
    expect(semComentarios).not.toContain('#151513')
    expect(semComentarios).not.toContain('#7FA88B')
    expect(p).toContain('#151513')
    expect(p).toContain('#7FA88B')
  })
})

describe('highlight() (VIS-12)', () => {
  test('classes distintas para keyword, string, número, função, tipo, propriedade e comentário', () => {
    const html = highlight(`// nota\nconst x = Livro.find({ estoque: 1, nome: 'a' })`)
    const classe = (trecho: string) => html.match(new RegExp(`<span class="(\\w)">${trecho}</span>`))?.[1]
    const achadas = {
      comentario: classe('// nota'), keyword: classe('const'), string: classe("'a'"), numero: classe('1'),
      funcao: classe('find'), tipo: classe('Livro'), propriedade: classe('estoque'),
    }
    expect(achadas).toEqual({ comentario: 'c', keyword: 'k', string: 's', numero: 'n', funcao: 'f', tipo: 't', propriedade: 'p' })
    expect(new Set(Object.values(achadas)).size).toBe(7)
  })
  test('escapa HTML', () => {
    expect(highlight('<b>')).not.toContain('<b>')
  })
})

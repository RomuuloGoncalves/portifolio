import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import SobreSection from '@/components/sections/SobreSection.vue'
import HistoricoSection from '@/components/sections/HistoricoSection.vue'
import ProjetosSection from '@/components/sections/ProjetosSection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import CertificadosList from '@/components/sections/CertificadosList.vue'
import ContatoSection from '@/components/sections/ContatoSection.vue'
import { certificados, historico, matrizStack, outrosProjetos, perfil, projetosDestaque, sobre } from '@/data/portfolio'

describe('Sobre', () => {
  test('prosa e princípios de portfolio.ts', () => {
    const w = mount(SobreSection)
    expect(w.get('.prose__lead').text()).toBe(sobre.lead)
    expect(w.findAll('.prose p')).toHaveLength(1 + sobre.paragrafos.length)
    expect(w.findAll('.principles h3').map((h) => h.text())).toEqual(sobre.principios.map((p) => p.titulo))
  })
})

describe('Histórico', () => {
  test('quadrado = trabalho, redondo = estudo; tags só quando existem (COPY-04)', () => {
    const entradas = mount(HistoricoSection).findAll('.entry')
    expect(entradas).toHaveLength(historico.length)
    historico.forEach((h, i) => {
      const e = entradas[i]
      expect(e.classes('entry--edu')).toBe(h.tipo === 'estudo')
      expect(e.get('time').attributes('datetime')).toBe(h.inicio)
      expect(e.get('h3').text()).toContain(h.titulo)
      expect(e.find('.tags').exists()).toBe(h.tags.length > 0)
    })
    expect(entradas[0].get('.pill').classes()).toContain('pill--ok')
  })
})

describe('Projetos (PROJ-01, PROJ-02, PROJ-04)', () => {
  test('5 destaques e outros projetos, com print só quando há imagem', () => {
    const w = mount(ProjetosSection)
    const cards = w.findAll('.project')
    expect(cards.map((c) => c.get('h3').text())).toEqual(projetosDestaque.map((p) => p.nome))
    expect(cards[0].classes()).toContain('project--lead')
    projetosDestaque.forEach((p, i) => {
      expect(cards[i].find('.shot').exists()).toBe(!!p.imagem)
      if (p.imagem) expect(cards[i].get('img').attributes('src')).toBeTruthy()
    })
    expect(w.html()).not.toContain('shot--empty')

    const outros = w.findAll('.others li')
    expect(outros.map((o) => o.get('.others__name').text())).toEqual(outrosProjetos.map((p) => p.nome))
    outrosProjetos.forEach((p, i) => {
      expect(outros[i].find('img').exists()).toBe(!!p.imagem)
      expect(outros[i].classes('others__nothumb')).toBe(!p.imagem)
    })
  })

  test('projeto sem imagem não renderiza img nem miniatura', () => {
    const { imagem } = outrosProjetos[0]
    outrosProjetos[0].imagem = undefined
    try {
      const li = mount(ProjetosSection).findAll('.others li')[0]
      expect(li.find('img').exists()).toBe(false)
      expect(li.classes()).toContain('others__nothumb')
    } finally {
      outrosProjetos[0].imagem = imagem
    }
  })
})

describe('Stack', () => {
  test('matriz por camada, marquee e certificados', () => {
    const w = mount(StackSection)
    expect(w.findAll('.matrix__group h3').map((h) => h.text())).toEqual(matrizStack.map((g) => g.grupo))
    expect(w.findAll('.marquee ul')[1].attributes('aria-hidden')).toBe('true')
    expect(w.findAll('.certs li')).toHaveLength(certificados.length)
  })
})

describe('Certificados (CERT-01, CERT-02)', () => {
  test('nome, emissor e mês/ano; sem credencial não há <code>', () => {
    const itens = mount(CertificadosList).findAll('.certs li')
    certificados.forEach((c, i) => {
      expect(itens[i].get('.certs__name').text()).toBe(c.nome)
      expect(itens[i].get('.certs__by').text()).toContain(c.emissor)
      expect(itens[i].find('code').exists()).toBe(!!c.credencial)
    })
    expect(itens[0].get('time').text()).toBe('mai/2026')
    expect(mount(CertificadosList).html()).not.toMatch(/<code><\/code>/)
  })

  test('lista vazia não renderiza a subseção', () => {
    const copia = certificados.splice(0)
    try {
      expect(mount(CertificadosList).find('.certs').exists()).toBe(false)
      expect(mount(CertificadosList).find('.subhead').exists()).toBe(false)
    } finally {
      certificados.push(...copia)
    }
  })
})

describe('Contato', () => {
  afterEach(() => vi.useRealTimers())

  test('e-mail, GitHub e LinkedIn de perfil', () => {
    const w = mount(ContatoSection)
    expect(w.get('.contact__mail a').attributes('href')).toBe(`mailto:${perfil.email}`)
    expect(w.findAll('.contact__links a').map((a) => a.attributes('href'))).toEqual([perfil.github, perfil.linkedin])
  })

  test('Copiar grava o e-mail, anuncia em role=status e volta depois de 2 s', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    const w = mount(ContatoSection)
    await w.get('.copy').trigger('click')
    await vi.waitFor(() => expect(w.get('[role="status"]').text()).toBe('E-mail copiado'))
    expect(writeText).toHaveBeenCalledWith(perfil.email)
    expect(w.get('.copy').text()).toBe('Copiado')
    vi.advanceTimersByTime(2000)
    await w.vm.$nextTick()
    expect(w.get('.copy').text()).toBe('Copiar')
    expect(w.get('[role="status"]').text()).toBe('')
  })

  test('sem clipboard avisa que selecionou o e-mail', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockRejectedValue(new Error()) }, configurable: true })
    const w = mount(ContatoSection, { attachTo: document.body })
    await w.get('.copy').trigger('click')
    await vi.waitFor(() => expect(w.get('[role="status"]').text()).toContain('E-mail selecionado'))
    expect(w.get('.copy').text()).toBe('Copiar')
    w.unmount()
  })
})

import { readFileSync } from 'node:fs'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PipelineInspector from '@/components/sections/PipelineInspector.vue'
import { pipeline } from '@/data/pipeline'

const montar = (estreito: boolean) => {
  window.matchMedia = ((q: string) => ({ matches: estreito && q.includes('1023px') })) as typeof window.matchMedia
  return mount(PipelineInspector, { attachTo: document.body })
}

describe('Pipeline Inspector (PIPE-01, PIPE-02, PIPE-03)', () => {
  test('seta direita troca de aba, move o foco e aria-selected acompanha', async () => {
    const w = montar(false)
    const abas = () => w.findAll('[role="tab"]')
    expect(abas()).toHaveLength(pipeline.length)
    expect(abas()[0].attributes('aria-selected')).toBe('true')

    await abas()[0].trigger('keydown', { key: 'ArrowRight' })
    expect(abas()[0].attributes('aria-selected')).toBe('false')
    expect(abas()[1].attributes('aria-selected')).toBe('true')
    expect(document.activeElement).toBe(abas()[1].element)
    expect(w.get('[role="tabpanel"]').attributes('aria-labelledby')).toBe(`tab-${pipeline[1].id}`)
    expect(w.findAll('.pipe__nodes li')).toHaveLength(pipeline[1].etapas.length)

    await abas()[1].trigger('keydown', { key: 'ArrowLeft' })
    await abas()[0].trigger('keydown', { key: 'ArrowLeft' })
    expect(abas().at(-1)!.attributes('aria-selected')).toBe('true')
    w.unmount()
  })

  test('no desktop a etapa clicada fica ativa e o detalhe mostra código, descrição e tags', async () => {
    const w = montar(false)
    await w.vm.$nextTick()
    const etapa = pipeline[0].etapas[0]
    await w.findAll('.pipe__nodes button')[0].trigger('click')
    expect(w.get('.pipe__nodes li').classes()).toContain('active')
    expect(w.get('.pipe__nodes button').attributes('aria-pressed')).toBe('true')
    expect(w.get('.pipe__nodes button').attributes('aria-expanded')).toBeUndefined()
    expect(w.get('.pipe > .pipe__detail .code__file').text()).toBe(etapa.file)
    expect(w.get('.pipe__node-title').text()).toBe(etapa.label)
    expect(w.findAll('.pipe__tags li').map((t) => t.text())).toEqual(etapa.tags)
    expect(w.get('code').find('span').exists()).toBe(true)
    w.unmount()
  })

  test('abaixo de 1024 px clicar na etapa alterna aria-expanded e o detalhe abre dentro dela', async () => {
    const w = montar(true)
    await w.vm.$nextTick()
    const botoes = () => w.findAll('.pipe__nodes button')
    const ativa = Math.floor(pipeline[0].etapas.length / 2)
    expect(w.find('.pipe > .pipe__detail').exists()).toBe(false)
    expect(botoes()[ativa].attributes('aria-expanded')).toBe('true')

    await botoes()[0].trigger('click')
    expect(botoes()[0].attributes('aria-expanded')).toBe('true')
    expect(botoes()[ativa].attributes('aria-expanded')).toBe('false')
    expect(w.findAll('.pipe__nodes li')[0].find('.pipe__detail').exists()).toBe(true)

    await botoes()[0].trigger('click')
    expect(botoes()[0].attributes('aria-expanded')).toBe('false')
    expect(w.find('.pipe__detail').exists()).toBe(false)
    w.unmount()
  })
})

describe('fonte dos trechos (PIPE-04)', () => {
  const arch = (id: string) =>
    readFileSync(`.specs/features/refactor-portfolio/research/arch-${id}.md`, 'utf8').replace(/\\([|`])/g, '$1')

  test.each(pipeline)('todo trecho de $id existe no arch-$id.md', ({ id, etapas }) => {
    const texto = arch(id)
    for (const linha of etapas.flatMap((e) => e.code.split('\n'))) expect(texto).toContain(linha.trim())
  })

  test('lauressucrier fica fora (sem back-end rastreável)', () => {
    expect(pipeline.map((c) => c.id)).not.toContain('lauressucrier')
  })
})

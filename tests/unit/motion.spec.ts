import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { startMotion } from '@/composables/useMotion'

const root = document.documentElement

function ambiente({ reduzir, suportaTimeline }: { reduzir: boolean; suportaTimeline: boolean }) {
  window.matchMedia = ((q: string) => ({ matches: reduzir && q.includes('reduce') })) as typeof window.matchMedia
  vi.stubGlobal('CSS', { supports: (q: string) => suportaTimeline && q.includes('animation-timeline') })
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
  return vi.spyOn(window, 'addEventListener')
}

const registrouScroll = (spy: ReturnType<typeof ambiente>) => spy.mock.calls.some(([tipo]) => tipo === 'scroll')

describe('motion (VIS-02, VIS-03, VIS-04)', () => {
  let stop: (() => void) | undefined

  beforeEach(() => {
    document.body.innerHTML = '<div class="layer-grid"></div><span class="section-watermark"></span>'
  })

  afterEach(() => {
    stop?.()
    stop = undefined
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  test('com reduced-motion o fallback não registra listener de scroll', () => {
    const spy = ambiente({ reduzir: true, suportaTimeline: false })
    stop = startMotion()
    expect(registrouScroll(spy)).toBe(false)
    expect(root.classList.contains('js-fallback')).toBe(false)
  })

  test('com suporte a animation-timeline o CSS cuida do parallax', () => {
    const spy = ambiente({ reduzir: false, suportaTimeline: true })
    stop = startMotion()
    expect(registrouScroll(spy)).toBe(false)
  })

  test('sem suporte a animation-timeline o fallback JS ativa e desliga na limpeza', () => {
    const spy = ambiente({ reduzir: false, suportaTimeline: false })
    stop = startMotion()
    expect(registrouScroll(spy)).toBe(true)
    expect(root.classList.contains('js-fallback')).toBe(true)
    expect(document.querySelector<HTMLElement>('.section-watermark')!.style.translate).toMatch(/^0 -?\d/)

    stop!()
    stop = undefined
    expect(root.classList.contains('js-fallback')).toBe(false)
  })
})

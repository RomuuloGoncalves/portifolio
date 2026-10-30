import { onBeforeUnmount, onMounted } from 'vue'
import '@/theme/motion.css'

// Mesmos deslocamentos dos @keyframes px-* de site.css, em função do progresso do elemento na tela (0 a 1)
const parallax: [string, (p: number) => string][] = [
  ['.section-watermark', (p) => `0 ${-40 + 80 * p}px`],
  ['.photo img, .shot--img img', (p) => `0 ${-6 + 6 * p}%`],
]

const progresso = (el: Element) => {
  const r = el.getBoundingClientRect()
  return Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)))
}

export function startMotion(): (() => void) | undefined {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (CSS.supports('animation-timeline: view()')) return

  const root = document.documentElement
  root.classList.add('js-fallback')

  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('in-viewport')
      revealObserver.unobserve(entry.target)
    }
  }, { threshold: 0.15 })
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => revealObserver.observe(el))

  const grid = document.querySelector<HTMLElement>('.layer-grid')
  let frame = 0
  const update = () => {
    frame = 0
    const rolavel = root.scrollHeight - innerHeight
    if (grid) grid.style.translate = `0 ${rolavel > 0 ? (-0.5 * innerHeight * scrollY) / rolavel : 0}px`
    for (const [seletor, translate] of parallax) {
      document.querySelectorAll<HTMLElement>(seletor).forEach((el) => {
        el.style.translate = translate(progresso(el))
      })
    }
  }
  const agendar = () => { frame ||= requestAnimationFrame(update) }

  addEventListener('scroll', agendar, { passive: true })
  addEventListener('resize', agendar)
  update()

  return () => {
    removeEventListener('scroll', agendar)
    removeEventListener('resize', agendar)
    cancelAnimationFrame(frame)
    revealObserver.disconnect()
    root.classList.remove('js-fallback')
  }
}

export function useMotion() {
  let stop: (() => void) | undefined
  onMounted(() => { stop = startMotion() })
  onBeforeUnmount(() => stop?.())
}

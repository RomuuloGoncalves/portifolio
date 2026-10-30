<template>
  <header class="nav">
    <div class="nav__inner">
      <a href="#topo" class="nav__logo" :aria-label="`${perfil.nome}, início`">
        <span class="nav__logo-full">{{ perfil.nome }}</span><span class="nav__logo-short" aria-hidden="true">{{ perfil.sigla }}</span>
      </a>

      <button class="reqline" type="button" popovertarget="rotas">
        <span class="reqline__method">GET</span>
        <span class="reqline__route">{{ rota }}</span>
        <span class="sr-only">, abrir menu de seções</span>
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
      </button>
      <nav id="rotas" ref="menu" popover aria-label="Seções">
        <ul>
          <li v-for="s in secoes" :key="s.id">
            <a :href="`#${s.id}`" :aria-current="atual === s.id ? 'location' : undefined" @click="fecharMenu">{{ s.rota }}</a>
          </li>
        </ul>
      </nav>

      <div class="nav__right">
        <ul class="nav__links">
          <li v-for="l in linksHeader" :key="l.href">
            <a :href="l.href" :aria-current="l.href === `#${atual}` ? 'location' : undefined">{{ l.texto }}</a>
          </li>
        </ul>
        <button class="theme-toggle" type="button" :aria-label="`Alternar para tema ${tema === 'dark' ? 'claro' : 'escuro'}`" @click="alternarTema">
          <svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          <svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { linksHeader, perfil, secoes } from '@/data/portfolio'

const root = document.documentElement

// Tema: o script inline do index.html aplica o salvo (ou o do sistema) antes do paint; aqui só alterna e salva
const tema = ref(root.dataset.theme === 'light' ? 'light' : 'dark')
function alternarTema() {
  tema.value = tema.value === 'dark' ? 'light' : 'dark'
  root.dataset.theme = tema.value
  localStorage.setItem('theme', tema.value)
}

const atual = ref('topo')
const rota = computed(() => secoes.find((s) => s.id === atual.value)?.rota ?? '/')
const menu = ref<HTMLElement>()
const fecharMenu = () => menu.value?.hidePopover?.()

let observer: IntersectionObserver | undefined
onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  observer = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) atual.value = e.target.id
  }, { rootMargin: '-45% 0px -50% 0px' })
  document.querySelectorAll('main > section').forEach((s) => observer!.observe(s))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

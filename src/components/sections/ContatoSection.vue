<template>
  <BaseSection id="contato" variante="tight">
    <div class="container">
      <div class="contact__mail">
        <a ref="link" :href="`mailto:${perfil.email}`">{{ usuario }}<wbr />@{{ dominio }}</a>
        <button class="btn btn--ghost btn--sm copy" :class="{ copied: copiado }" type="button" @click="copiar">{{ copiado ? 'Copiado' : 'Copiar' }}</button>
        <span class="sr-only" role="status" aria-live="polite">{{ status }}</span>
      </div>
      <div class="contact__links">
        <a class="btn btn--ghost" :href="perfil.github" target="_blank" rel="noopener">GitHub<span class="sr-only"> (abre em nova aba)</span></a>
        <a class="btn btn--ghost" :href="perfil.linkedin" target="_blank" rel="noopener">LinkedIn<span class="sr-only"> (abre em nova aba)</span></a>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { perfil } from '@/data/portfolio'
import BaseSection from '../BaseSection.vue'

const [usuario, dominio] = perfil.email.split('@')
const link = ref<HTMLAnchorElement>()
const copiado = ref(false)
const status = ref('')

let timer: ReturnType<typeof setTimeout> | undefined
async function copiar() {
  try {
    await navigator.clipboard.writeText(perfil.email)
    copiado.value = true
    status.value = 'E-mail copiado'
  } catch {
    if (link.value) getSelection()?.selectAllChildren(link.value)
    status.value = 'Não foi possível copiar. E-mail selecionado.'
  }
  clearTimeout(timer)
  timer = setTimeout(() => {
    copiado.value = false
    status.value = ''
  }, 2000)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

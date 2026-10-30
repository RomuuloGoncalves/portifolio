<template>
  <BaseSection id="arquitetura">
    <div class="container">
      <div class="inspector">
        <div class="scenarios" role="tablist" aria-label="Projetos">
          <button
            v-for="(c, i) in pipeline"
            :id="`tab-${c.id}`"
            :key="c.id"
            role="tab"
            type="button"
            aria-controls="pipe"
            :aria-selected="i === cenario"
            :tabindex="i === cenario ? 0 : -1"
            @click="selecionarCenario(i)"
            @keydown="teclaAba"
          >
            {{ c.titulo }}
          </button>
        </div>

        <div id="pipe" class="pipe" role="tabpanel" :aria-labelledby="`tab-${atual.id}`">
          <ol ref="lista" class="pipe__nodes" aria-label="Etapas da requisição" :style="{ '--etapas': atual.etapas.length }">
            <li v-for="(e, i) in atual.etapas" :key="`${atual.id}-${i}`" :class="{ active: i === ativa, done: i < ativa }">
              <button
                type="button"
                :aria-pressed="empilhado ? undefined : i === ativa"
                :aria-expanded="empilhado ? i === ativa && aberta : undefined"
                @click="selecionarEtapa(i)"
              >
                {{ e.label }}
              </button>
              <PipelineDetalhe v-if="empilhado && aberta && i === ativa" :key="`${atual.id}-${i}`" :etapa="e" />
            </li>
          </ol>
          <PipelineDetalhe v-if="!empilhado" :key="`${atual.id}-${ativa}`" :etapa="atual.etapas[ativa]" />
        </div>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { pipeline } from '@/data/pipeline'
import '@/theme/pipeline.css'
import BaseSection from '../BaseSection.vue'
import PipelineDetalhe from './PipelineDetalhe.vue'

const lista = ref<HTMLOListElement>()
const cenario = ref(0)
const atual = computed(() => pipeline[cenario.value])
// Começa no meio do fluxo, como no protótipo, para as etapas anteriores aparecerem como concluídas.
const meio = () => Math.floor(atual.value.etapas.length / 2)
const ativa = ref(meio())
const aberta = ref(true)
const empilhado = ref(false)

function selecionarCenario(i: number) {
  cenario.value = i
  ativa.value = meio()
  aberta.value = true
}

function teclaAba(e: KeyboardEvent) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  const n = pipeline.length
  const prox = (cenario.value + (e.key === 'ArrowRight' ? 1 : n - 1)) % n
  const abas = (e.currentTarget as HTMLElement).parentElement!.children
  selecionarCenario(prox)
  ;(abas[prox] as HTMLElement).focus()
}

async function selecionarEtapa(i: number) {
  if (empilhado.value && i === ativa.value) {
    aberta.value = !aberta.value
    return
  }
  ativa.value = i
  aberta.value = true
  if (!empilhado.value) return
  await nextTick()
  lista.value?.children[i].scrollIntoView?.({ block: 'nearest' })
}

let mq: MediaQueryList | undefined
const atualizar = () => (empilhado.value = !!mq?.matches)
onMounted(() => {
  mq = matchMedia('(max-width: 1023px)')
  atualizar()
  mq.addEventListener?.('change', atualizar)
})
onBeforeUnmount(() => mq?.removeEventListener?.('change', atualizar))
</script>

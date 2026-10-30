<template>
  <section :id="secao.id" class="section" :class="variante && `section--${variante}`" :data-route="secao.rota" :aria-labelledby="`${secao.id}-t`">
    <span class="section-watermark" aria-hidden="true">{{ secao.marca }}</span>
    <div class="container">
      <h2 :id="`${secao.id}-t`" class="section__title">{{ secao.titulo }}</h2>
      <p v-if="secao.sub" class="section__sub">{{ secao.sub }}</p>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { secoes, type Secao } from '@/data/portfolio'

const props = defineProps<{ id: string; variante?: 'tight' | 'wide' }>()
const secao: Secao = secoes.find((s) => s.id === props.id)!
</script>

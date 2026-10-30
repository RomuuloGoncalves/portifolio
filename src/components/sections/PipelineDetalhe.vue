<template>
  <div class="pipe__detail swap" aria-live="polite">
    <div class="code">
      <div class="code__bar"><span class="code__file">{{ etapa.file }}</span></div>
      <pre><code v-html="highlight(etapa.code)"></code></pre>
    </div>
    <div class="pipe__notes">
      <h3 class="pipe__node-title">{{ etapa.label }}</h3>
      <p class="pipe__desc">{{ etapa.desc }}</p>
      <ul class="tags pipe__tags">
        <li v-for="t in etapa.tags" :key="t">{{ t }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EtapaPipeline } from '@/data/portfolio'
import { highlight } from '@/utils/highlight'

defineProps<{ etapa: EtapaPipeline }>()
</script>

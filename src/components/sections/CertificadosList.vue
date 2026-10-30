<template>
  <template v-if="certificados.length">
    <h3 id="certificados" class="subhead">Certificados e reconhecimento</h3>
    <ul class="certs">
      <li v-for="c in certificados" :key="c.nome" class="reveal-on-scroll">
        <span class="certs__name">{{ c.nome }}</span>
        <span class="certs__by">{{ c.emissor }}<template v-if="c.data">, <time :datetime="c.data">{{ mesAno(c.data) }}</time></template></span>
        <a v-if="c.url" :href="c.url" target="_blank" rel="noopener"><code>{{ c.credencial ?? 'Credencial' }}</code><span class="sr-only"> (abre em nova aba)</span></a>
        <code v-else-if="c.credencial">{{ c.credencial }}</code>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { certificados } from '@/data/portfolio'

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
const mesAno = (data: string) => `${MESES[Number(data.slice(5, 7)) - 1]}/${data.slice(0, 4)}`
</script>

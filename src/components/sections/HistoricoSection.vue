<template>
  <BaseSection id="historico">
    <div class="container">
      <ol class="changelog">
        <li v-for="h in historico" :key="h.inicio" class="entry reveal-on-scroll" :class="{ 'entry--edu': h.tipo === 'estudo' }">
          <div class="entry__meta">
            <time :datetime="h.inicio">{{ h.periodo }}</time>
            <span v-if="h.selo" class="pill" :class="{ 'pill--ok': h.selo === 'Atual' }">{{ h.selo }}</span>
          </div>
          <div class="entry__body">
            <h3>{{ h.titulo }} <span class="at">{{ h.local }}</span></h3>
            <p v-for="i in h.itens" :key="i">{{ i }}</p>
            <ul v-if="h.tags.length" class="tags"><li v-for="t in h.tags" :key="t">{{ t }}</li></ul>
          </div>
        </li>
      </ol>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { historico } from '@/data/portfolio'
import BaseSection from '../BaseSection.vue'
</script>

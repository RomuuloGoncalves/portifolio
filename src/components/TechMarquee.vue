<template>
  <div class="marquee" aria-label="Tecnologias">
    <div class="marquee__track">
      <ul v-for="copia in [false, true]" :key="String(copia)" :aria-hidden="copia || undefined">
        <li v-for="t in marquee" :key="t.icone">
          <svg aria-hidden="true"><use :href="`${sprite}#i-${t.icone}`" /></svg>{{ t.nome }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marquee } from '@/data/portfolio'
import sprite from '@/assets/icons/tech.svg'
</script>

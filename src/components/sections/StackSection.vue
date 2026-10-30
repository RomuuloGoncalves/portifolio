<template>
  <BaseSection id="stack">
    <TechMarquee />
    <div class="container">
      <div class="matrix">
        <div v-for="g in matrizStack" :key="g.grupo" class="matrix__group reveal-on-scroll">
          <h3>{{ g.grupo }}</h3>
          <p>{{ g.itens.join(', ') }}</p>
        </div>
      </div>
      <CertificadosList />
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { matrizStack } from '@/data/portfolio'
import BaseSection from '../BaseSection.vue'
import TechMarquee from '../TechMarquee.vue'
import CertificadosList from './CertificadosList.vue'
</script>

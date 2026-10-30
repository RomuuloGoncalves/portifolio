<template>
  <BaseSection id="sobre" variante="tight">
    <div class="container">
      <div class="about">
        <div class="prose">
          <p class="prose__lead">{{ sobre.lead }}</p>
          <p v-for="p in sobre.paragrafos" :key="p">{{ p }}</p>
        </div>
        <ul class="principles">
          <li v-for="p in sobre.principios" :key="p.titulo">
            <h3>{{ p.titulo }}</h3>
            <p>{{ p.texto }}</p>
          </li>
        </ul>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { sobre } from '@/data/portfolio'
import BaseSection from '../BaseSection.vue'
</script>

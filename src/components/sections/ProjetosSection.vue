<template>
  <BaseSection id="projetos" variante="wide">
    <div class="container">
      <div class="projects">
        <article v-for="(p, i) in projetosDestaque" :key="p.nome" class="project reveal-on-scroll" :class="{ 'project--lead': i === 0 }">
          <figure v-if="p.imagem" class="shot shot--img">
            <img :src="imagem(p.imagem)" :alt="p.alt ?? ''" width="1440" height="900" loading="lazy" />
          </figure>
          <div class="project__body">
            <h3>{{ p.nome }}</h3>
            <p class="project__sub">{{ p.descricao }}</p>
            <ul class="tags"><li v-for="t in p.stack" :key="t">{{ t }}</li></ul>
            <p class="links">
              <a v-if="p.repo" :href="p.repo" target="_blank" rel="noopener">Repositório <span aria-hidden="true">↗</span><span class="sr-only"> do {{ p.nome }} (abre em nova aba)</span></a>
              <a v-if="p.demo" :href="p.demo" target="_blank" rel="noopener">Demo <span aria-hidden="true">↗</span><span class="sr-only"> do {{ p.nome }} (abre em nova aba)</span></a>
            </p>
          </div>
        </article>
      </div>

      <h3 class="subhead">Outros projetos</h3>
      <ul class="others">
        <li v-for="p in outrosProjetos" :key="p.nome" class="reveal-on-scroll" :class="{ others__nothumb: !p.imagem }">
          <img v-if="p.imagem" class="others__thumb" :src="imagem(p.imagem)" alt="" loading="lazy" />
          <div>
            <p class="others__name">{{ p.nome }}</p>
            <p class="others__desc">{{ p.descricao }}</p>
          </div>
          <a v-if="p.repo ?? p.demo" :href="p.repo ?? p.demo" target="_blank" rel="noopener">{{ p.repo ? 'GitHub' : 'Demo' }} <span aria-hidden="true">↗</span><span class="sr-only"> do {{ p.nome }} (abre em nova aba)</span></a>
          <span v-else class="others__muted">Privado</span>
        </li>
      </ul>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { outrosProjetos, projetosDestaque } from '@/data/portfolio'
import BaseSection from '../BaseSection.vue'

const imagens = import.meta.glob<string>('@/assets/projetos/**/*.webp', { eager: true, import: 'default' })
const imagem = (caminho: string) => imagens[`/src/assets/${caminho}`]
</script>

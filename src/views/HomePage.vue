<template>
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>
  <div class="layer-grid" aria-hidden="true"></div>

  <AppHeader />

  <main id="conteudo">
    <HeroSection />
    <SobreSection />
    <HistoricoSection />
    <PipelineInspector />
    <ProjetosSection />
    <StackSection />
    <ContatoSection />
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <span>© {{ ano }} {{ perfil.nome }}</span>
      <a :href="perfil.codigoSite" target="_blank" rel="noopener">Código deste site<span class="sr-only"> (abre em nova aba)</span></a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { perfil } from '@/data/portfolio'
import { useMotion } from '@/composables/useMotion'
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import SobreSection from '@/components/sections/SobreSection.vue'
import HistoricoSection from '@/components/sections/HistoricoSection.vue'
import PipelineInspector from '@/components/sections/PipelineInspector.vue'
import ProjetosSection from '@/components/sections/ProjetosSection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import ContatoSection from '@/components/sections/ContatoSection.vue'

const ano = new Date().getFullYear()
useMotion()
</script>

<template>
  <section class="hero" id="topo" data-route="/">
    <div class="container hero__grid">
      <div class="hero__text">
        <h1 class="hero__title">
          <span class="hero__name">{{ perfil.nome }}</span>
          <span class="hero__role">{{ perfil.cargo }}</span>
        </h1>
        <p class="hero__lead">{{ perfil.hero.join(' ') }}</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="#projetos">Ver projetos</a>
          <a class="btn btn--ghost" :href="curriculo" download="curriculo-romulo-goncalves.pdf">Baixar currículo</a>
        </div>
      </div>

      <div class="hero__card">
        <figure class="photo">
          <div class="photo__frame">
            <picture>
              <source type="image/avif" :srcset="`${foto600avif} 600w, ${foto1200avif} 1200w`" :sizes="sizes" />
              <source type="image/webp" :srcset="`${foto600webp} 600w, ${foto1200webp} 1200w`" :sizes="sizes" />
              <img :src="foto1200jpg" :alt="perfil.foto.alt" width="1200" height="1600" fetchpriority="high" />
            </picture>
          </div>
          <figcaption class="photo__caption">{{ perfil.foto.legenda }}</figcaption>
        </figure>
        <div class="sysinfo">
          <p id="sysinfo-t" class="sysinfo__head">SYSTEM_INFO</p>
          <dl aria-labelledby="sysinfo-t">
            <div v-for="[dt, dd] in ficha" :key="dt"><dt>{{ dt }}</dt><dd>{{ dd }}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { perfil } from '@/data/portfolio'
import foto600avif from '@/assets/img/foto-perfil-600.avif'
import foto1200avif from '@/assets/img/foto-perfil-1200.avif'
import foto600webp from '@/assets/img/foto-perfil-600.webp'
import foto1200webp from '@/assets/img/foto-perfil-1200.webp'
import foto1200jpg from '@/assets/img/foto-perfil-1200.jpg'

const sizes = '(min-width: 768px) 420px, 100vw'
const curriculo = import.meta.env.BASE_URL + perfil.curriculo

const { dev, primaryStack, secondary, location, status } = perfil.sysinfo
// STATUS só entra com texto aprovado (D-12)
const ficha = [
  ['DEV', dev],
  ['PRIMARY_STACK', primaryStack],
  ['SECONDARY', secondary],
  ['LOCATION', location],
  ...(status ? [['STATUS', status]] : []),
]
</script>

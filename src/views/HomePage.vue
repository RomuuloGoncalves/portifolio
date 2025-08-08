<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar>
        <ion-title class="titulo-cabecalho">Rômulo Gonçalves</ion-title>
        <ion-buttons slot="end">
          <ion-button :href="linksContato.github" target="_blank" aria-label="GitHub">
            <ion-icon slot="icon-only" :icon="logoGithub"></ion-icon>
          </ion-button>
          <ion-button :href="linksContato.linkedin" target="_blank" aria-label="LinkedIn">
            <ion-icon slot="icon-only" :icon="logoLinkedin"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="container-conteudo">

        <section id="hero" class="ion-text-center">
          <img :src="buscarImagemUrl('assets/img/foto-perfil.jpeg')" alt="Foto de Rômulo Gonçalves" class="foto-perfil animated-item">
          <h1 class="titulo-principal animated-item">Olá, eu sou o Rômulo</h1>
          <h2 class="subtitulo-principal animated-item">Desenvolvedor e Programador</h2>
          <ion-button size="large" @click="rolarParaSecao('projetos')" class="animated-item">
            Ver Projetos
            <ion-icon slot="end" :icon="arrowDown"></ion-icon>
          </ion-button>
        </section>

        <section id="sobre" class="animated-section">
          <h3 class="titulo-secao">Sobre Mim</h3>
          <div class="conteudo-sobre">
            <div class="texto-sobre">
              <p>
                Olá! Sou Rômulo, um entusiasta da programação cursando Engenharia da Computação e com formação técnica
                em Desenvolvimento de Sistemas. Minha jornada na área de tecnologia começou com a busca pelo
                entendimento das linguagens de programação e arquiteturas de sistemas.
              </p>
              <p>
                Possuo expertise em diversas tecnologias como Javascript, PHP, Angular, Ionic e MySql. Além disso, tenho
                familiaridade com metodologias ágeis, o que me permite colaborar de forma eficaz em equipes
                multidisciplinares.
              </p>
              <p>
                Minha experiência atual como estagiário envolve a manutenção e desenvolvimento de um sistema de gestão
                escolar, onde sou responsável pela análise técnica, correção de bugs e implementação de novas
                funcionalidades. Busco uma posição de desenvolvedor júnior para continuar aprendendo, contribuir com
                projetos desafiadores e construir tecnologias que fazem a diferença.
              </p>
              <ion-button expand="block" href="curriculo.pdf" download="curriculo-romulo-goncalves.pdf" color="primary"
                fill="outline">
                Baixar Currículo
                <ion-icon slot="end" :icon="downloadOutline"></ion-icon>
              </ion-button>
            </div>
          </div>
        </section>

        <section id="projetos" class="animated-section">
          <h3 class="titulo-secao">Projetos</h3>
          <ion-grid>
            <ion-row>
              <ion-col size="12" size-md="6" size-lg="4" v-for="projeto in projetos" :key="projeto.nome">
                <ion-card class="cartao-projeto">
                  <a :href="projeto.link" target="_blank" class="link-cartao">
                    <img :alt="projeto.nome" :src="buscarImagemUrl(projeto.imagem)" />
                    <ion-card-header>
                      <ion-card-title>{{ projeto.nome }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <p>{{ projeto.descricao }}</p>
                    </ion-card-content>
                  </a>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </section>

        <section id="habilidades" class="animated-section">
          <h3 class="titulo-secao">Habilidades</h3>
          <div class="grade-habilidades">
            <div class="item-habilidade" v-for="habilidade in habilidades" :key="habilidade.nome">
              <img :src="buscarImagemUrl(habilidade.imagem)" :alt="habilidade.nome" class="icone-habilidade" />
              <span>{{ habilidade.nome }}</span>
            </div>
          </div>
        </section>

        <section id="contato" class="ion-text-center animated-section">
          <h3 class="titulo-secao">Contato</h3>
          <p>Sinta-se à vontade para entrar em contato ou me seguir nas redes sociais!</p>
          <div class="botoes-contato">
            <ion-button :href="linksContato.linkedin" target="_blank">
              <ion-icon slot="start" :icon="logoLinkedin"></ion-icon>
              LinkedIn
            </ion-button>
            <ion-button :href="linksContato.github" target="_blank" color="dark">
              <ion-icon slot="start" :icon="logoGithub"></ion-icon>
              GitHub
            </ion-button>
            <ion-button :href="linksContato.email" color="tertiary">
              <ion-icon slot="start" :icon="mailOutline"></ion-icon>
              E-mail
            </ion-button>
            <ion-button :href="linksContato.instagram" color="danger">
              <ion-icon slot="start" :icon="logoInstagram"></ion-icon>
              Instagram
            </ion-button>
          </div>
        </section>

      </div>
      <ion-footer class="ion-no-border">
        <ion-toolbar class="ion-text-center">
          <ion-label>Desenvolvido por: Rômulo da Silva Gonçalves</ion-label>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton,
  IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonFooter, IonLabel
} from '@ionic/vue';
import {
  logoGithub, logoLinkedin, arrowDown, downloadOutline, mailOutline,
  logoInstagram
} from 'ionicons/icons';
import { onMounted } from 'vue';

const rolarParaSecao = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const buscarImagemUrl = (caminho: string) => {
  return new URL(`../${caminho}`, import.meta.url).href;
};

// Lógica para animações de scroll
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15 // A animação começa quando 15% do item está visível
  });

  // Aplica o observador a todas as seções e itens marcados para animar
  document.querySelectorAll('.animated-section, .animated-item').forEach(el => {
    observer.observe(el);
  });
});


const linksContato = {
  linkedin: 'https://www.linkedin.com/in/romuulogoncalves/',
  github: 'https://github.com/RomuuloGoncalves',
  email: 'mailto:romulogoncalves13@gmail.com',
  instagram: 'https://www.instagram.com/romuulogoncalves/',
};

const projetos = [
  { nome: 'APP - Delivery', descricao: 'Aplicativo de delivery para um TCC, com funcionalidades para clientes e gerenciamento para a loja.', imagem: 'assets/img/delivery.png', link: 'https://github.com/RomuuloGoncalves/TCC-Delivery' },
  { nome: 'ATOMOX', descricao: 'Sistema de monitoramento de qualidade do ar com ESP32 e interface responsiva.', imagem: 'assets/img/atomox.png', link: 'https://github.com/RomuuloGoncalves/Projeto-Integrador-ATOMOX' },
  { nome: 'GEOLAB', descricao: 'Aplicativo educacional com salas virtuais e visualização de objetos 3D em realidade aumentada.', imagem: 'assets/img/geolab.png', link: 'https://github.com/RomuuloGoncalves/GeoLab' },
  { nome: 'TO DO', descricao: 'App para criar e planejar tarefas.', imagem: 'assets/img/todo.jpg', link: 'https://romuulogoncalves.github.io/todo-app/' },
  { nome: 'Clone do site do Discord', descricao: 'Clone do site do Discord usando Tailwind.', imagem: 'assets/img/discord_clone.png', link: 'https://github.com/RomuuloGoncalves/discord_clone' },
  { nome: 'Calculadora', descricao: 'Uma calculadora funcional.', imagem: 'assets/img/calculadora.png', link: 'https://romuulogoncalves.github.io/calculator/' },
  { nome: 'Países', descricao: 'Aplicação que consome API para exibir informações detalhadas sobre países.', imagem: 'assets/img/rest-api.png', link: 'https://github.com/RomuuloGoncalves/countries_api' },
  { nome: 'Gerador de senha', descricao: 'Sistema para gerar senhas aleatórias com diferentes critérios.', imagem: 'assets/img/gerador_senha.png', link: 'https://romuulogoncalves.github.io/password-generator/' },
  { nome: 'Jogo da velha', descricao: 'Versão digital interativa do clássico jogo da velha.', imagem: 'assets/img/velha.png', link: 'https://romuulogoncalves.github.io/tic-tac-toe/' },
  { nome: 'Pedra, papel ou tesoura', descricao: 'Jogo interativo: Pedra, papel ou tesoura.', imagem: 'assets/img/pedra-papel-tesoura.png', link: 'https://romuulogoncalves.github.io/rock-paper-scissors/' }
];


const habilidades = [
  { nome: 'HTML', imagem: 'assets/img/habilidades/html.svg' }, { nome: 'CSS', imagem: 'assets/img/habilidades/css.svg' },
  { nome: 'SCSS', imagem: 'assets/img/habilidades/scss.svg' }, { nome: 'Javascript', imagem: 'assets/img/habilidades/js.svg' },
  { nome: 'Angular', imagem: 'assets/img/habilidades/angular.svg' }, { nome: 'Ionic', imagem: 'assets/img/habilidades/ionic.svg' },
  { nome: 'PHP', imagem: 'assets/img/habilidades/php.svg' }, { nome: 'Laravel', imagem: 'assets/img/habilidades/laravel.svg' },
  { nome: 'MySql', imagem: 'assets/img/habilidades/mysql.svg' }, { nome: 'Firebase', imagem: 'assets/img/habilidades/firebase.svg' },
  { nome: 'Git', imagem: 'assets/img/habilidades/git.svg' }, { nome: 'Linux', imagem: 'assets/img/habilidades/linux.svg' },
  { nome: 'Figma', imagem: 'assets/img/habilidades/figma.svg' }, { nome: 'Photoshop', imagem: 'assets/img/habilidades/photoshop.svg' },
  { nome: 'Vue.js', imagem: 'assets/img/habilidades/vuejs.svg' }, { nome: 'Arduino', imagem: 'assets/img/habilidades/arduino.svg' },
  { nome: 'Bootstrap', imagem: 'assets/img/habilidades/bootstrap.svg' },{ nome: 'React.js', imagem: 'assets/img/habilidades/react.svg' },
  { nome: 'Python', imagem: 'assets/img/habilidades/python.svg' },
];
</script>

<style scoped>
/* =========== ANIMAÇÕES DE SCROLL (ADICIONADO) =========== */
.animated-section,
.animated-item {
  opacity: 0;
  transform: translateY(25px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animated-section.visible,
.animated-item.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Atraso para os itens da seção Hero aparecerem em sequência */
#hero .animated-item:nth-child(1) { transition-delay: 0.1s; }
#hero .animated-item:nth-child(2) { transition-delay: 0.2s; }
#hero .animated-item:nth-child(3) { transition-delay: 0.3s; }
#hero .animated-item:nth-child(4) { transition-delay: 0.4s; }


/* =========== TEMA CLARO (SEU CSS ORIGINAL) =========== */
ion-content {
  --background: #f4f5f8;
  --color: #333333;
}

.titulo-cabecalho {
  font-weight: 600;
  color: #1e1e1e;
}

.container-conteudo {
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
}

section {
  padding-top: 48px;
  padding-bottom: 48px;
}

.titulo-secao {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  border-bottom: 4px solid var(--ion-color-primary);
  display: inline-block;
  padding-bottom: 8px;
  color: #1e1e1e;
}

/* =========== SEÇÃO DE APRESENTAÇÃO =========== */
#hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.foto-perfil {
  height: 420px;
  width: 420px;
  border-radius: 50%;
  border: 6px solid var(--ion-color-primary);
  margin-bottom: 24px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.titulo-principal {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  margin: 0;
  color: #1e1e1e;
}

* {
  font-family: Arial, Helvetica, sans-serif;
}

.subtitulo-principal {
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 400;
  color: #555;
  margin-top: 8px;
  margin-bottom: 32px;
}

/* =========== OUTRAS SEÇÕES =========== */
.conteudo-sobre {
  display: flex;
  align-items: center;
  gap: 32px;
  justify-content: center;
}

.texto-sobre {
  max-width: 650px;
  text-align: center;
}

.texto-sobre p {
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: justify;
}

.cartao-projeto {
  --background: #ffffff;
  --color: #333;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.cartao-projeto:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.link-cartao {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
}

.cartao-projeto img {
  aspect-ratio: 16/9;
  object-fit: cover;
}

.cartao-projeto ion-card-header {
  padding-bottom: 8px;
}

.cartao-projeto ion-card-title {
  font-weight: 600;
  color: var(--ion-color-primary);
}

.cartao-projeto ion-card-content {
  flex-grow: 1;
}

.cartao-projeto p {
  line-height: 1.6;
}

.grade-habilidades {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 24px;
  text-align: center;
}

.item-habilidade {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-out;
}

.item-habilidade:hover {
  transform: scale(1.05);
}

.icone-habilidade {
  width: 48px;
  height: 48px;
}

.botoes-contato {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

ion-footer ion-label {
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 850px) {
  .foto-perfil {
    height: 300px;
    width: 300px;
  }

}
</style>
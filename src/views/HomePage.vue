<template>
  <ion-page :class="{ 'dark-theme': isDark }">
    <!-- NAVBAR -->
    <ion-header :translucent="true" class="ion-no-border navbar-custom">
      <ion-toolbar>
        <ion-title class="nav-logo">
          <span class="logo-accent">&lt;</span>RG<span class="logo-accent"> /&gt;</span>
        </ion-title>
        <ion-buttons slot="end">
          <button class="nav-link" @click="rolarParaSecao('sobre')">Sobre</button>
          <button class="nav-link" @click="rolarParaSecao('experiencia')">Experiência</button>
          <button class="nav-link" @click="rolarParaSecao('projetos')">Projetos</button>
          <button class="nav-link" @click="rolarParaSecao('habilidades')">Skills</button>
          <button class="nav-link" @click="rolarParaSecao('contato')">Contato</button>
          <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'">
            <ion-icon :icon="isDark ? sunnyOutline : moonOutline"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Animated Background -->
      <div class="bg-animated">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>

      <div class="container-conteudo">

        <!-- HERO -->
        <section id="hero" class="hero-section">
          <div class="hero-content">
            <div class="hero-text">
              <p class="hero-greeting animated-item">Olá, eu sou o</p>
              <h1 class="hero-name animated-item">
                Rômulo<br /><span class="gradient-text">Gonçalves</span>
              </h1>
              <h2 class="hero-role animated-item">Desenvolvedor Full Stack</h2>
              <p class="hero-description animated-item">
                Estudante de Engenharia da Computação, apaixonado por criar soluções 
                que transformam o dia a dia de pessoas e empresas por meio do código.
              </p>
              <div class="hero-actions animated-item">
                <ion-button class="btn-primary" @click="rolarParaSecao('projetos')">
                  Ver Projetos
                  <ion-icon slot="end" :icon="arrowDown"></ion-icon>
                </ion-button>
                <ion-button class="btn-outline" fill="outline" :href="linksContato.linkedin" target="_blank">
                  LinkedIn
                  <ion-icon slot="end" :icon="logoLinkedin"></ion-icon>
                </ion-button>
              </div>
            </div>
            <div class="hero-visual animated-item">
              <div class="profile-ring">
                <img :src="buscarImagemUrl('assets/img/foto-perfil.jpeg')" alt="Foto de Rômulo Gonçalves" class="foto-perfil" />
              </div>
              <div class="status-badge">
                <span class="status-dot"></span>
                Disponível para oportunidades
              </div>
            </div>
          </div>

          <!-- Scroll Indicator -->
          <div class="scroll-indicator animated-item">
            <div class="mouse">
              <div class="wheel"></div>
            </div>
            <span>Scroll para explorar</span>
          </div>
        </section>

        <!-- SOBRE -->
        <section id="sobre" class="animated-section">
          <div class="section-header">
            <span class="section-tag">// sobre mim</span>
            <h3 class="section-title">Quem sou eu<span class="dot">.</span></h3>
          </div>
          <div class="sobre-grid">
            <div class="sobre-text">
              <p>
                Sou Desenvolvedor Full Stack com experiência prática na criação e 
                manutenção de <strong>sistemas complexos</strong>. Minha jornada na tecnologia 
                começou com um curso Técnico em Desenvolvimento de Sistemas, que me deu 
                a base sólida para explorar, construir e escalar soluções inovadoras de 
                ponta a ponta.
              </p>
              <p>
                Atualmente cursando <strong>Engenharia da Computação</strong> na Uniso, busco constantemente 
                colaborar com equipes dinâmicas, aprender novas tecnologias e contribuir 
                para a construção de <strong>produtos de alto impacto</strong>.
              </p>
              <div class="sobre-stats">
                <div class="stat-item">
                  <span class="stat-number">2+</span>
                  <span class="stat-label">Anos de experiência</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">10+</span>
                  <span class="stat-label">Projetos realizados</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">15+</span>
                  <span class="stat-label">Tecnologias</span>
                </div>
              </div>
            </div>
            <div class="sobre-card glass-card">
              <div class="code-block">
                <div class="code-header">
                  <span class="code-dot red"></span>
                  <span class="code-dot yellow"></span>
                  <span class="code-dot green"></span>
                  <span class="code-filename">sobre-mim.ts</span>
                </div>
                <pre><code><span class="kw">const</span> <span class="fn">romulo</span> = {
  <span class="prop">nome</span>: <span class="str">"Rômulo Gonçalves"</span>,
  <span class="prop">formação</span>: <span class="str">"Eng. Computação"</span>,
  <span class="prop">cargo</span>: <span class="str">"Full Stack Developer"</span>,
  <span class="prop">paixão</span>: <span class="str">"Resolver problemas reais"</span>,
  <span class="prop">foco</span>: [
    <span class="str">"Sistemas web"</span>,
    <span class="str">"ERP de Gestão Escolar"</span>,
    <span class="str">"Produtos de impacto"</span>,
  ],
};</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- EXPERIÊNCIA -->
        <section id="experiencia" class="animated-section">
          <div class="section-header">
            <span class="section-tag">// trajetória</span>
            <h3 class="section-title">Experiência<span class="dot">.</span></h3>
          </div>
          <div class="timeline">
            <!-- Desenvolvedor Full Stack -->
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="timeline-dot active-dot"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-content glass-card">
                <div class="timeline-header">
                  <div>
                    <h4 class="timeline-role">Desenvolvedor Full Stack</h4>
                    <p class="timeline-company">Education One — Sorocaba / SP</p>
                  </div>
                  <span class="timeline-badge">Atual</span>
                </div>
                <p class="timeline-period">11/2025 — Presente</p>
                <p class="timeline-desc">
                  Análise técnica dos tickets criados pela equipe de suporte técnico. 
                  Correção de erros e manutenção do sistema de ERP de Gestão Escolar. 
                  Implantação de melhorias nas plataformas, customização de sistemas, 
                  criação de querys SQL, desenvolvimento de funcionalidades e telas, 
                  auxílio para a equipe de suporte, criação de documentação e refatoração de código.
                </p>
                <div class="timeline-tags">
                  <span class="tag">HTML/CSS</span>
                  <span class="tag">JavaScript</span>
                  <span class="tag">SQL</span>
                  <span class="tag">Git</span>
                  <span class="tag">PHP</span>
                  <span class="tag">Laravel</span>
                  <span class="tag">MySQL</span>
                  <span class="tag">SQL</span>
                </div>
              </div>
            </div>
            <!-- Estágio -->
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-content glass-card">
                <div class="timeline-header">
                  <div>
                    <h4 class="timeline-role">Estágio em Desenvolvimento de Sistemas</h4>
                    <p class="timeline-company">Education One — Sorocaba</p>
                  </div>
                </div>
                <p class="timeline-period">10/2024 — 11/2025</p>
                <p class="timeline-desc">
                  Análise técnica dos tickets. Correção de bugs. 
                  Implantação de melhorias nas plataformas. Customização de sistemas.
                </p>
                <div class="timeline-tags">
                  <span class="tag">HTML/CSS</span>
                  <span class="tag">JavaScript</span>
                  <span class="tag">SQL</span>
                  <span class="tag">Git</span>
                  <span class="tag">PHP</span>
                  <span class="tag">Laravel</span>
                  <span class="tag">MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- EDUCAÇÃO -->
        <section id="educacao" class="animated-section">
          <div class="section-header">
            <span class="section-tag">// formação</span>
            <h3 class="section-title">Educação<span class="dot">.</span></h3>
          </div>
          <div class="timeline">
            <!-- Engenharia da Computação -->
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="timeline-dot active-dot"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-content glass-card">
                <div class="timeline-header">
                  <div>
                    <h4 class="timeline-role">Engenharia da Computação</h4>
                    <p class="timeline-company">Uniso — Sorocaba / SP</p>
                  </div>
                  <span class="timeline-badge">Cursando</span>
                </div>
                <p class="timeline-period">02/2024 — Presente</p>
                <p class="timeline-desc">
                  Graduação em andamento com foco em algoritmos, arquitetura de computadores, 
                  engenharia de software e desenvolvimento de sistemas de alta performance.
                </p>
              </div>
            </div>
            <!-- Técnico -->
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="timeline-dot"></div>
              </div>
              <div class="timeline-content glass-card">
                <div class="timeline-header">
                  <div>
                    <h4 class="timeline-role">Desenvolvimento de Sistemas</h4>
                    <p class="timeline-company">Etec Sales Gomes — Tatuí / SP</p>
                  </div>
                  <span class="timeline-badge-done">Concluído</span>
                </div>
                <p class="timeline-period">02/2021 — 12/2023</p>
                <p class="timeline-desc">
                  Curso técnico integrado ao ensino médio com formação completa em lógica de programação, 
                  estrutura de dados, banco de dados e desenvolvimento web. Base sólida que 
                  permitiu explorar e construir soluções inovadoras desde o início da trajetória.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- PROJETOS -->
        <section id="projetos" class="animated-section">
          <div class="section-header">
            <span class="section-tag">// meus projetos</span>
            <h3 class="section-title">Projetos em destaque<span class="dot">.</span></h3>
          </div>

          <!-- Featured Projects -->
          <div class="projetos-featured">
            <a v-for="(projeto, i) in projetosDestaque" :key="projeto.nome" :href="projeto.link" target="_blank" 
               class="projeto-featured-card glass-card" :class="'featured-' + i">
              <div class="projeto-img-wrapper">
                <img :alt="projeto.nome" :src="buscarImagemUrl(projeto.imagem)" />
                <div class="projeto-overlay">
                  <ion-icon :icon="openOutline" class="overlay-icon"></ion-icon>
                </div>
              </div>
              <div class="projeto-info">
                <h4>{{ projeto.nome }}</h4>
                <p>{{ projeto.descricao }}</p>
                <div class="projeto-techs">
                  <span v-for="tech in projeto.techs" :key="tech" class="tag">{{ tech }}</span>
                </div>
              </div>
            </a>
          </div>

          <!-- Other Projects -->
          <h4 class="outros-titulo">Outros projetos</h4>
          <div class="projetos-grid">
            <a v-for="projeto in outrosProjetos" :key="projeto.nome" :href="projeto.link" target="_blank" 
               class="projeto-card glass-card">
              <div class="projeto-card-header">
                <ion-icon :icon="folderOpenOutline" class="folder-icon"></ion-icon>
                <ion-icon :icon="openOutline" class="external-icon"></ion-icon>
              </div>
              <h4>{{ projeto.nome }}</h4>
              <p>{{ projeto.descricao }}</p>
              <div class="projeto-techs">
                <span v-for="tech in projeto.techs" :key="tech" class="tag-sm">{{ tech }}</span>
              </div>
            </a>
          </div>
        </section>

        <!-- HABILIDADES -->
        <section id="habilidades" class="animated-section">
          <div class="section-header">
            <span class="section-tag">// tecnologias</span>
            <h3 class="section-title">Habilidades<span class="dot">.</span></h3>
          </div>
          <div class="skills-container">
            <div class="skill-category" v-for="categoria in categorias" :key="categoria.titulo">
              <h4 class="skill-cat-title">
                <span class="skill-cat-icon">{{ categoria.icone }}</span>
                {{ categoria.titulo }}
              </h4>
              <div class="skills-list">
                <div class="skill-item glass-card" v-for="hab in categoria.habilidades" :key="hab.nome">
                  <img :src="buscarImagemUrl(hab.imagem)" :alt="hab.nome" class="skill-icon" />
                  <span class="skill-name">{{ hab.nome }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CONTATO -->
        <section id="contato" class="animated-section">
          <div class="contato-wrapper glass-card">
            <div class="section-header">
              <span class="section-tag">// vamos conversar</span>
              <h3 class="section-title">Entre em contato<span class="dot">.</span></h3>
            </div>
            <p class="contato-desc">
              Sou apaixonado por resolver problemas reais por meio do código. Se você tem 
              um projeto interessante ou uma oportunidade, ficarei feliz em conversar!
            </p>
            <a :href="linksContato.email" class="contato-email">romulogoncalves13@gmail.com</a>
            <div class="contato-social">
              <a :href="linksContato.linkedin" target="_blank" class="social-link" aria-label="LinkedIn">
                <ion-icon :icon="logoLinkedin"></ion-icon>
              </a>
              <a :href="linksContato.github" target="_blank" class="social-link" aria-label="GitHub">
                <ion-icon :icon="logoGithub"></ion-icon>
              </a>
              <a :href="linksContato.instagram" target="_blank" class="social-link" aria-label="Instagram">
                <ion-icon :icon="logoInstagram"></ion-icon>
              </a>
            </div>
          </div>
        </section>

      </div>

      <!-- FOOTER -->
      <footer class="footer-custom">
        <p>Desenvolvido com <span class="heart">♥</span> por Rômulo Gonçalves</p>
        <p class="footer-year">© 2025</p>
      </footer>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton,
  IonIcon
} from '@ionic/vue';
import {
  logoGithub, logoLinkedin, arrowDown, openOutline, mailOutline,
  logoInstagram, folderOpenOutline, moonOutline, sunnyOutline
} from 'ionicons/icons';
import { onMounted, ref } from 'vue';

const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const rolarParaSecao = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const buscarImagemUrl = (caminho: string) => {
  return new URL(`../${caminho}`, import.meta.url).href;
};

onMounted(() => {
  // Check saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

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

const projetosDestaque = [
  {
    nome: 'OngFlow',
    descricao: 'Plataforma criada para conectar voluntários a ONGs, facilitando o engajamento e a gestão de ações sociais.',
    imagem: 'assets/img/ongflow.png',
    link: 'https://github.com/RomuuloGoncalves/ONGFlow',
    techs: ['Vue.js', 'Firebase', 'SCSS']
  },
  {
    nome: 'APP Delivery',
    descricao: 'Aplicativo de delivery completo para TCC, com funcionalidades para clientes e painel de gerenciamento para a loja.',
    imagem: 'assets/img/delivery.png',
    link: 'https://github.com/RomuuloGoncalves/TCC-Delivery',
    techs: ['Angular', 'Ionic', 'Firebase']
  },
  {
    nome: 'Mini Interpretador Matemático',
    descricao: 'Projeto acadêmico de compiladores que implementa um analisador léxico e sintático com PLY. Possui tabela de símbolos, regras de precedência, avaliação de expressões, verificação de overflow (-1023 a 1023) e tratamento de erros léxicos, sintáticos e semânticos.',
    imagem: 'assets/img/calculadoraLexica.png',
    link: 'https://github.com/RomuuloGoncalves/calculadora_compiladores',
    techs: ['Python', 'PLY', 'Análise Sintática']
  },
  {
    nome: 'ATOMOX',
    descricao: 'Sistema de monitoramento de qualidade do ar utilizando ESP32 com interface web responsiva e em tempo real.',
    imagem: 'assets/img/atomox.png',
    link: 'https://github.com/RomuuloGoncalves/Projeto-Integrador-ATOMOX',
    techs: ['IoT', 'ESP32', 'JavaScript']
  },
  {
    nome: 'TO DO App',
    descricao: 'Aplicação para criar e planejar tarefas com interface intuitiva.',
    imagem: 'assets/img/todo.jpg',
    link: 'https://romuulogoncalves.github.io/todo-app/',
    techs: ['JavaScript', 'CSS']
  },
];

const outrosProjetos = [
  {
    nome: 'GeoLab',
    descricao: 'Aplicativo educacional com salas virtuais e visualização de objetos 3D em realidade aumentada.',
    link: 'https://github.com/RomuuloGoncalves/GeoLab',
    techs: ['Angular', 'AR.js', 'Three.js']
  },
  {
    nome: 'Clone Discord',
    descricao: 'Reprodução fiel da landing page do Discord.',
    link: 'https://github.com/RomuuloGoncalves/discord_clone',
    techs: ['HTML', 'Tailwind']
  },
  {
    nome: 'Calculadora',
    descricao: 'Calculadora funcional com design moderno.',
    link: 'https://romuulogoncalves.github.io/calculator/',
    techs: ['JavaScript', 'CSS']
  },
  {
    nome: 'API Países',
    descricao: 'Aplicação que consome API para exibir informações detalhadas sobre países.',
    link: 'https://github.com/RomuuloGoncalves/countries_api',
    techs: ['Angular', 'REST API']
  },
  {
    nome: 'Gerador de Senha',
    descricao: 'Gerador de senhas seguras com diferentes critérios configuráveis.',
    link: 'https://romuulogoncalves.github.io/password-generator/',
    techs: ['JavaScript', 'CSS']
  },
  {
    nome: 'Jogo da Velha',
    descricao: 'Versão digital interativa do clássico jogo da velha.',
    link: 'https://romuulogoncalves.github.io/tic-tac-toe/',
    techs: ['JavaScript', 'CSS']
  },
  {
    nome: 'Pedra, Papel, Tesoura',
    descricao: 'Jogo interativo contra o computador com placar.',
    link: 'https://romuulogoncalves.github.io/rock-paper-scissors/',
    techs: ['JavaScript', 'CSS']
  }
];

const categorias = [
  {
    titulo: 'Back-End',
    icone: '⚙️',
    habilidades: [
      { nome: 'PHP', imagem: 'assets/img/habilidades/php.svg' },
      { nome: 'Laravel', imagem: 'assets/img/habilidades/laravel.svg' },
      { nome: 'Python', imagem: 'assets/img/habilidades/python.svg' },
      { nome: 'MySQL', imagem: 'assets/img/habilidades/mysql.svg' },
      { nome: 'Firebase', imagem: 'assets/img/habilidades/firebase.svg' },
    ]
  },
  {
    titulo: 'Front-End',
    icone: '🌐',
    habilidades: [
      { nome: 'Angular', imagem: 'assets/img/habilidades/angular.svg' },
      { nome: 'React', imagem: 'assets/img/habilidades/react.svg' },
      { nome: 'Vue.js', imagem: 'assets/img/habilidades/vuejs.svg' },
      { nome: 'Ionic', imagem: 'assets/img/habilidades/ionic.svg' },
      { nome: 'TypeScript', imagem: 'assets/img/habilidades/ts.svg' },
      { nome: 'JavaScript', imagem: 'assets/img/habilidades/js.svg' },
      { nome: 'SCSS', imagem: 'assets/img/habilidades/scss.svg' },
      { nome: 'HTML', imagem: 'assets/img/habilidades/html.svg' },
      { nome: 'CSS', imagem: 'assets/img/habilidades/css.svg' },
      { nome: 'Bootstrap', imagem: 'assets/img/habilidades/bootstrap.svg' },
      { nome: 'Tailwind', imagem: 'assets/img/habilidades/tailwind.svg' },
    ]
  },
  {
    titulo: 'Ferramentas',
    icone: '🛠️',
    habilidades: [
      { nome: 'Git', imagem: 'assets/img/habilidades/git.svg' },
      { nome: 'Linux', imagem: 'assets/img/habilidades/linux.svg' },
      { nome: 'Figma', imagem: 'assets/img/habilidades/figma.svg' },
      { nome: 'Photoshop', imagem: 'assets/img/habilidades/photoshop.svg' },
      { nome: 'Gimp', imagem: 'assets/img/habilidades/gimp.svg' },
      { nome: 'GitHub', imagem: 'assets/img/habilidades/github.svg' },
      { nome: 'Docker', imagem: 'assets/img/habilidades/docker.svg' },

    ]
  },
];
</script>

<style scoped>
/* =========================================
   GLOBAL / BASE
   ========================================= */
* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  box-sizing: border-box;
}

ion-page {
  transition: background-color 0.4s ease, color 0.4s ease;
}

ion-content {
  --background: var(--bg-primary);
  --color: var(--text-primary);
  transition: --background 0.4s ease;
}

ion-toolbar {
  --background: transparent;
  --border-width: 0 !important;
}

/* =========================================
   THEME TOGGLE BUTTON
   ========================================= */
.theme-toggle {
  background: var(--bg-glass);
  border: 1px solid var(--bg-glass-border);
  border-radius: 12px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  margin-left: 8px;
}

.theme-toggle:hover {
  background: var(--accent-primary);
  color: #fff;
  border-color: var(--accent-primary);
  transform: rotate(20deg);
  box-shadow: 0 4px 16px var(--accent-glow);
}

/* =========================================
   ANIMATED BACKGROUND
   ========================================= */
.bg-animated {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
  animation: float 20s ease-in-out infinite;
  transition: opacity 0.5s ease;
}

.dark-theme .orb {
  opacity: 0.15;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: var(--accent-primary);
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: #74b9ff;
  bottom: -100px;
  left: -100px;
  animation-delay: -7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: #a29bfe;
  top: 50%;
  left: 50%;
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

/* =========================================
   CONTAINER
   ========================================= */
.container-conteudo {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

/* =========================================
   NAVBAR
   ========================================= */
.navbar-custom {
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-custom ion-toolbar {
  --padding-start: 24px;
  --padding-end: 24px;
}

.nav-logo {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.5px;
  color: var(--text-primary);
}

.logo-accent {
  color: var(--accent-primary);
}

.nav-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px;
  height: 2px;
  background: var(--accent-primary);
  transition: transform 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

/* =========================================
   GLASS CARD (UTILITY)
   ========================================= */
.glass-card {
  background: var(--bg-glass);
  border: 1px solid var(--bg-glass-border);
  border-radius: var(--border-radius);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}

/* =========================================
   SECTION HEADERS
   ========================================= */
section {
  padding: 80px 0;
}

.section-header {
  margin-bottom: 48px;
}

.section-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: var(--accent-primary);
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -1px;
  transition: color 0.4s ease;
}

.dot {
  color: var(--accent-primary);
}

/* =========================================
   HERO SECTION
   ========================================= */
.hero-section {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 40px;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

.hero-text {
  flex: 1;
  max-width: 600px;
}

.hero-greeting {
  font-size: 1.1rem;
  color: var(--accent-primary);
  font-weight: 500;
  margin: 0 0 8px 0;
  font-family: 'JetBrains Mono', monospace;
}

.hero-name {
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  margin: 0 0 16px 0;
  color: var(--text-primary);
  letter-spacing: -2px;
  transition: color 0.4s ease;
}

.gradient-text {
  background: var(--accent-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-role {
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0 0 20px 0;
  transition: color 0.4s ease;
}

.hero-description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0 0 32px 0;
  max-width: 500px;
  transition: color 0.4s ease;
}

.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn-primary {
  --background: var(--accent-primary);
  --border-radius: 12px;
  --padding-start: 28px;
  --padding-end: 28px;
  --box-shadow: 0 4px 24px var(--accent-glow);
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.95rem;
  height: 48px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  --box-shadow: 0 8px 32px var(--accent-glow);
}

.btn-outline {
  --border-color: var(--bg-glass-border);
  --color: var(--text-secondary);
  --border-radius: 12px;
  --padding-start: 28px;
  --padding-end: 28px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.95rem;
  height: 48px;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  --border-color: var(--accent-primary);
  --color: var(--accent-primary);
}

/* Hero Visual */
.hero-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-ring {
  position: relative;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  padding: 4px;
  background: var(--accent-gradient);
  box-shadow: var(--shadow-glow);
  transition: box-shadow 0.4s ease;
}

.foto-perfil {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bg-primary);
  transition: border-color 0.4s ease;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 8px 20px;
  background: var(--bg-glass);
  border: 1px solid var(--bg-glass-border);
  border-radius: 24px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0, 184, 148, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 8px rgba(0, 184, 148, 0); }
}

/* Scroll Indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
  color: var(--text-muted);
  font-size: 0.8rem;
  transition: color 0.4s ease;
}

.mouse {
  width: 24px;
  height: 38px;
  border: 2px solid var(--text-muted);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
  transition: border-color 0.4s ease;
}

.wheel {
  width: 3px;
  height: 8px;
  border-radius: 3px;
  background: var(--accent-primary);
  animation: scroll-anim 2s ease-in-out infinite;
}

@keyframes scroll-anim {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(10px); opacity: 0; }
}

/* =========================================
   SOBRE SECTION
   ========================================= */
.sobre-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.sobre-text p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 20px;
  transition: color 0.4s ease;
}

.sobre-text strong {
  color: var(--text-primary);
  transition: color 0.4s ease;
}

.sobre-stats {
  display: flex;
  gap: 32px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid var(--bg-glass-border);
  transition: border-color 0.4s ease;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  background: var(--accent-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 4px;
  transition: color 0.4s ease;
}

/* Code Block */
.sobre-card {
  padding: 0;
  overflow: hidden;
}

.code-block {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.8;
  background: var(--code-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid var(--code-border);
}

.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.code-dot.red { background: #ff5f57; }
.code-dot.yellow { background: #febc2e; }
.code-dot.green { background: #28c840; }

.code-filename {
  margin-left: auto;
  color: #6b6b80;
  font-size: 0.8rem;
}

.code-block pre {
  margin: 0;
  padding: 24px;
  overflow-x: auto;
}

.code-block code {
  color: #a0a0b8;
}

.kw { color: #c792ea; }
.fn { color: #82aaff; }
.prop { color: #f07178; }
.str { color: #c3e88d; }

/* =========================================
   EXPERIÊNCIA / TIMELINE
   ========================================= */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.timeline-item {
  display: flex;
  gap: 24px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--text-muted);
  flex-shrink: 0;
  transition: all 0.4s ease;
}

.timeline-dot.active-dot {
  border-color: var(--accent-primary);
  background: var(--accent-primary);
  box-shadow: 0 0 16px var(--accent-glow);
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, var(--bg-glass-border), transparent);
  margin-top: 8px;
}

.timeline-content {
  padding: 28px;
  flex: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.4s ease;
}

.timeline-content:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-glow);
}

.timeline-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
}

.timeline-role {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.4s ease;
}

.timeline-company {
  color: var(--accent-primary);
  font-weight: 500;
  margin: 4px 0 0 0;
}

.timeline-badge {
  background: var(--accent-gradient);
  color: #fff;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
}

.timeline-badge-done {
  background: transparent;
  border: 1px solid var(--bg-glass-border);
  color: var(--text-muted);
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  transition: all 0.4s ease;
}

.timeline-period {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 0 12px 0;
  transition: color 0.4s ease;
}

.timeline-desc {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 16px 0;
  transition: color 0.4s ease;
}

.timeline-tags,
.projeto-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: rgba(108, 92, 231, 0.1);
  border: 1px solid rgba(108, 92, 231, 0.25);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--accent-primary);
  font-weight: 500;
  transition: all 0.4s ease;
}

.dark-theme .tag {
  background: rgba(108, 92, 231, 0.15);
  border-color: rgba(108, 92, 231, 0.3);
  color: var(--accent-secondary);
}

.tag-sm {
  padding: 2px 8px;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.4s ease;
}

/* =========================================
   PROJETOS SECTION
   ========================================= */
.projetos-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 48px;
}

.projeto-featured-card {
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.4s ease;
  display: flex;
  flex-direction: column;
}

.projeto-featured-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-glow);
}

.projeto-img-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.projeto-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.projeto-featured-card:hover .projeto-img-wrapper img {
  transform: scale(1.05);
}

.projeto-overlay {
  position: absolute;
  inset: 0;
  background: rgba(108, 92, 231, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.projeto-featured-card:hover .projeto-overlay {
  opacity: 1;
}

.overlay-icon {
  font-size: 2rem;
  color: #fff;
}

.projeto-info {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.projeto-info h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  transition: color 0.4s ease;
}

.projeto-info p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 16px 0;
  flex: 1;
  transition: color 0.4s ease;
}

/* Other projects */
.outros-titulo {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 24px;
  text-align: center;
  transition: color 0.4s ease;
}

.projetos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.projeto-card {
  padding: 28px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  min-height: 200px;
}

.projeto-card:hover {
  transform: translateY(-5px);
  background: var(--bg-card-hover);
  box-shadow: var(--shadow-glow);
}

.projeto-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.folder-icon {
  font-size: 2rem;
  color: var(--accent-primary);
}

.external-icon {
  font-size: 1.2rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.projeto-card:hover .external-icon {
  color: var(--accent-primary);
}

.projeto-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  transition: color 0.4s ease;
}

.projeto-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 auto 0;
  padding-bottom: 16px;
  transition: color 0.4s ease;
}

/* =========================================
   HABILIDADES SECTION
   ========================================= */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.skill-cat-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color 0.4s ease;
}

.skill-cat-icon {
  font-size: 1.3rem;
}

.skills-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 16px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  text-align: center;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-5px) scale(1.02);
  background: var(--bg-card-hover);
  box-shadow: var(--shadow-glow);
}

.skill-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(108, 92, 231, 0.15));
  transition: filter 0.4s ease;
}

.dark-theme .skill-icon {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.skill-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.4s ease;
}

/* =========================================
   CONTATO SECTION
   ========================================= */
.contato-wrapper {
  padding: 64px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.contato-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background: var(--accent-primary);
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.1;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.dark-theme .contato-wrapper::before {
  opacity: 0.15;
}

.contato-wrapper .section-header {
  text-align: center;
}

.contato-wrapper .section-tag,
.contato-wrapper .section-title {
  text-align: center;
}

.contato-desc {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 550px;
  margin: 0 auto 32px auto;
  transition: color 0.4s ease;
}

.contato-email {
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  background: var(--accent-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  margin-bottom: 32px;
  transition: opacity 0.3s ease;
}

.contato-email:hover {
  opacity: 0.8;
}

.contato-social {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-link {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--bg-glass);
  border: 1px solid var(--bg-glass-border);
  color: var(--text-secondary);
  font-size: 1.3rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--accent-primary);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px var(--accent-glow);
  border-color: var(--accent-primary);
}

/* =========================================
   FOOTER
   ========================================= */
.footer-custom {
  text-align: center;
  padding: 32px 24px;
  border-top: 1px solid var(--bg-glass-border);
  margin-top: 40px;
  transition: border-color 0.4s ease;
}

.footer-custom p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
  transition: color 0.4s ease;
}

.footer-custom .heart {
  color: #ff6b6b;
  display: inline-block;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.footer-year {
  margin-top: 4px !important;
  font-size: 0.8rem !important;
}

/* =========================================
   ANIMATIONS (SCROLL REVEAL)
   ========================================= */
.animated-section,
.animated-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.animated-section.visible,
.animated-item.visible {
  opacity: 1;
  transform: translateY(0);
}

#hero .animated-item:nth-child(1) { transition-delay: 0.1s; }
#hero .animated-item:nth-child(2) { transition-delay: 0.2s; }
#hero .animated-item:nth-child(3) { transition-delay: 0.3s; }
#hero .animated-item:nth-child(4) { transition-delay: 0.4s; }
#hero .animated-item:nth-child(5) { transition-delay: 0.5s; }

.hero-text .animated-item:nth-child(1) { transition-delay: 0.1s; }
.hero-text .animated-item:nth-child(2) { transition-delay: 0.2s; }
.hero-text .animated-item:nth-child(3) { transition-delay: 0.3s; }
.hero-text .animated-item:nth-child(4) { transition-delay: 0.4s; }
.hero-text .animated-item:nth-child(5) { transition-delay: 0.5s; }

/* =========================================
   RESPONSIVE
   ========================================= */
@media (max-width: 968px) {
  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
    gap: 40px;
  }

  .hero-text {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-description {
    text-align: center;
  }

  .profile-ring {
    width: 260px;
    height: 260px;
  }

  .sobre-grid {
    grid-template-columns: 1fr;
  }

  .projetos-featured {
    grid-template-columns: 1fr;
  }

  .sobre-stats {
    justify-content: center;
  }

  .nav-link {
    display: none;
  }

  .contato-wrapper {
    padding: 40px 24px;
  }

  .contato-email {
    font-size: 1.1rem;
  }
}

@media (max-width: 600px) {
  .container-conteudo {
    padding: 0 16px;
  }

  section {
    padding: 48px 0;
  }

  .hero-name {
    font-size: 2.5rem;
    letter-spacing: -1px;
  }

  .profile-ring {
    width: 200px;
    height: 200px;
  }

  .sobre-stats {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary, .btn-outline {
    width: 100%;
  }

  .projetos-grid {
    grid-template-columns: 1fr;
  }

  .skills-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .scroll-indicator {
    display: none;
  }

  .timeline-item {
    gap: 16px;
  }

  .timeline-content {
    padding: 20px;
  }
}
</style>
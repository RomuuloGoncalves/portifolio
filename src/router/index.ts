import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

// Página única: as seções são âncoras nativas (#sobre, #projetos...), não rotas
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

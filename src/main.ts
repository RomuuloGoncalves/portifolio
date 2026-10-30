import { createApp } from 'vue'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './theme/palette.css'
import './theme/site.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

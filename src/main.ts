import { createApp } from 'vue'

import '@/style/index.less'
import 'normalize.css'

import App from './App.vue'
import router from '@/router/index'

import pinia from '@/store'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

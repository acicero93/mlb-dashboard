import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

import AppLayout from '@/layouts/AppLayout'
import Spinner from '@/components/Spinner'

const app = createApp(App)

app.use(router)
app.component('AppLayout', AppLayout)
app.component('Spinner', Spinner)
app.mount('#app')

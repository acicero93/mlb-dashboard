import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

import AppLayout from './layouts/AppLayout'

const app = createApp(App)

app.use(router)

app.component('AppLayout', AppLayout).mount('#app')

// https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:silo:current.png/r_max/w_180,q_auto:best/v1/people/${player.person.id}/headshot/silo/current

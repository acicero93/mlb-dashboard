import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

import AppLayout from './layouts/AppLayout';

const app = createApp(App);

app.use(router);

app.component('AppLayout', AppLayout).mount('#app');

// https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_100,q_auto:best/v1/people/656529/headshot/67/current

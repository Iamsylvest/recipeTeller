import './assets/main.css';
import Vue3Lottie from 'vue3-lottie';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Lottie); // registers <Vue3Lottie> component globally
app.mount('#app');

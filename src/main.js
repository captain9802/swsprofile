import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const vuetify = createVuetify({
    theme: { dark: false },
});

const app = createApp(App);
app.use(vuetify);
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
});
app.mount('#app');


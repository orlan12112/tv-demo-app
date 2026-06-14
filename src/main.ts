import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './app/providers/router';

// Стили
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import { useUserStore } from '@/entities/user/model/userStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Инициализация пользователей
const userStore = useUserStore();
userStore.initFromStorage();

app.mount('#app');


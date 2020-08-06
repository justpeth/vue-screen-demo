import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

createApp(App).use(router).use(store).use(ElementUI).use.mount('#app')

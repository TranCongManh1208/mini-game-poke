import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from "vuex";
import router from "./router/index";
import storeConfigs from "./store/index";
import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";


const store = createStore(storeConfigs)

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

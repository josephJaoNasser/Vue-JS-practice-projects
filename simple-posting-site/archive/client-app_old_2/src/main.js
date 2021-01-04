import Vue, { createApp } from 'vue';
import App from './App'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.prototype.$http = axios;

//get the token from local storage
const token = localStorage.getItem('token');

//id there is any token, append default axios authorization headers
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

createApp(App).use(router).use(store).mount('#app')

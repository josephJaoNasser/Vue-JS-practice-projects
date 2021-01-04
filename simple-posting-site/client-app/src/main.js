import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import { BootstrapVue } from 'bootstrap-vue'
import axios from 'axios'

// Install BootstrapVue
// Vue.use(BootstrapVue)

Vue.config.productionTip = false


Vue.prototype.$http = axios;

//get the token from local storage
const token = localStorage.getItem('token');

//id there is any token, append default axios authorization headers
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

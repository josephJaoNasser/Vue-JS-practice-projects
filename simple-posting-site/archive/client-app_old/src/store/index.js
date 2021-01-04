import Vuex from 'vuex';
import Vue from 'vue';
import posts from './modules/posts'
import users from './modules/users'
import createPersistedState from "vuex-persistedstate";

//Load vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({  
   modules:{
      posts,
      users
   },
   plugins: [createPersistedState()],
})

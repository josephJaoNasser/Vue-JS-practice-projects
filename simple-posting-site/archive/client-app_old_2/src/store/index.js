import Vuex from 'vuex';
import posts from './modules/posts'
import users from './modules/users'
import createPersistedState from "vuex-persistedstate";

//Create store
export default Vuex.createStore({  
   modules:{
      posts,
      users
   },
   plugins: [createPersistedState()],
});

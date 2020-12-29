import axios from 'axios'

const url = "/api/users/";

const state = {
   loadingStates: {
      registeringUser: false,
      msg: ''
   }, 
   errors: ""
}

const getters = {
   userLoadingStates: (state) => state.loadingStates,
}

const actions = {
   async registerUser({ commit }, newUser){
      state.loadingStates.registeringUser = true
      const res = await axios.post(url, newUser) 
      commit('regUser',res.data);
   }
}

const mutations = {
   regUser: (state) => {
      state.loadingStates.registeringUser = false
   }
}

export default {
   state,
   getters,
   actions,
   mutations
}
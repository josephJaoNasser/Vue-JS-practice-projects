import axios from 'axios'

const url = "/api/users/";

const state = {
   
   loadingStates: {
      registeringUser: false,
      loggingIn: false,
      msg: ''
   }, 
   token: localStorage.getItem('token') || '',
   user: {},
   status: '',
   registrationError: ''
}

const getters = {
   userLoadingStates: (state) => state.loadingStates,
   isLoggedIn: (state) => !!state.token,
   authState: (state) => state.status,
   currentUser: (state) => state.user,
   userErrors: (state) => state.registrationError,
}

const actions = {

   //register user
   async registerUser({ commit }, newUser){
      commit('registration_request');

      const res = await axios.post(url+'register', newUser).catch((err) => {
         commit('registration_err',err.response.data);
      });

      if(res.data.success){
         commit('registration_success')
      }

      return res;
   },

   //login
   async login({ commit }, user){      
      commit('login_request');
      const res = await axios.post(url+'login', user).catch((err)=>{         
         //display the error if an error is caught
         commit('login_failed',err.response.data);
      })

      if(res.data.success){
         //store the token into local storage
         localStorage.setItem('token', res.data.token);
         //set the axios default headers
         axios.defaults.headers.common['Authorization'] = res.data.token;
         
         commit('login_success',res);           
      }       
      return res;
           
   },

   //logut
   async logout({commit}){     
      await localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      commit('logout');
      return;      
   }
}

const mutations = {

   registration_request: (state) => state.loadingStates.registeringUser = true,
 
   registration_success: (state) => state.loadingStates.registeringUser = false,

   registration_err: (state, err) => {
      state.errors = {
         error_type: 'Registration error', 
         msg: err.msg
      }
      console.log(state.errors.msg)
      state.loadingStates.registeringUser = false
   },

   login_failed: (state, err) => {
      state.errors = {
         error_type: 'Login error', 
         msg: err.msg
      }
      console.log(state.errors.msg)
      state.loadingStates.loggingIn = false
   },

   login_request: (state) => state.loadingStates.loggingIn = true, 

   login_success: (state, res) => {
      state.token = res.data.token;
      state.user = res.data.user;
      state.loadingStates.loggingIn = false;
   },

   logout: (state) => {
      state.token = '',
      state.user = ''
   }
}

export default {
   state,
   getters,
   actions,
   mutations
}
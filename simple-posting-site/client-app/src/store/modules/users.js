import axios from 'axios'
const url = "/api/users/";

const state = {
   
   loadingStates: {
      registeringUser: false,
      loggingIn: false,
      uploadingImage: false,
   }, 
   token: localStorage.getItem('token') || '',
   user: {},
   status: '',
   userErrors: {}
}

const getters = {
   userLoadingStates: (state) => state.loadingStates,
   isLoggedIn: (state) => !!state.token,
   authState: (state) => state.status,
   currentUser: (state) => state.user,
   userErrors: (state) => state.userErrors,
}

const actions = {

   //register user
   async registerUser({ commit }, newUser){
      commit('registration_request');      

      commit('upload_profile_img_request')
      if(!newUser.profileImage){
         commit('upload_profile_img_failed',{msg: 'Please upload a .jpg or .png file'})
         return 
      }

      const formData = new FormData()
      formData.append('profile-image', newUser.profileImage)

      const uploaded = await axios.post(url+'upload/profile-image',formData).catch((err)=> {
         commit('upload_profile_img_failed',err)
      })
      newUser.profileImage = uploaded.data.filename
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
   },

   //clear states (because of vuex persistedstate)
   clearUserStates({commit}){
      commit('clr_user_states')
   }
}

const mutations = {

   registration_request: (state) => state.loadingStates.registeringUser = true,
 
   registration_success: (state) => state.loadingStates.registeringUser = false,

   registration_err: (state, err) => {
      state.userErrors = {
         error_type: 'Registration error', 
         field: err.field,
         msg: err.msg
      }
      state.loadingStates.registeringUser = false
   },

   upload_profile_img_request: (state) => state.loadingStates.uploadingImage = true,

   upload_profile_img_failed: (state,err) => {
      state.userErrors = {
         field: 'profileImage', 
         msg: err.msg
      }
      state.loadingStates.uploadingImage = false
      state.loadingStates.registeringUser = false
   },

   upload_profile_img_success: (state) => {
      state.userErrors = {}
      state.loadingStates.uploadingImage = false
   },

   login_failed: (state, err) => {
      state.userErrors = {
         error_type: 'Login error', 
         msg: err.msg
      }
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
   },

   clr_user_states: (state) => {
      state.loadingStates = {
         registeringUser: false,
         loggingIn: false,
         msg: ''
      };

      state.userErrors = {}
   }
}

export default {
   state,
   getters,
   actions,
   mutations
}
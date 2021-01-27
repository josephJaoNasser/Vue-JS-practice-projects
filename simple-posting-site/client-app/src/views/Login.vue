<template>
   <div class="login-main-container">
      <transition name="fade" >
          <div 
            class="loading-animation"
            v-if="this.userLoadingStates.loggingIn
            && !this.userErrors" 
          >
            <div class="hollow-dots-spinner">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div> 
          </div>   
      </transition>  
      <div class="login-box absolute-center" v-bind:class="{'transparent': this.userLoadingStates.loggingIn}">
         
         <input type="text" placeholder="Username" v-model="username">
         <br>
         <input type="password" placeholder="Password" v-model="password"> 

         <transition name="slide">
            <div class="error error-box" v-if="this.userErrors.msg">
               {{this.userErrors.msg}}
            </div>
         </transition>

         <br>
         <input type="submit" class="login-btn green" value="Login" @click="login">
         <br>
         <router-link to="/register">Create an account!</router-link>
      </div>      
   </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {   
   computed: mapGetters(['userLoadingStates', 'userErrors']),
   data() {
      return {
         username: '',
         password: ''
      }
   },
   methods: {
      login(){
         let user = {
            username: this.username,
            password: this.password
         }

         this.$store.dispatch('login',user).then(res => {
            if(res.data.success){
               this.$router.push('/')
            }
         })
      }
   },
   created() {
      this.$store.dispatch('clearUserStates')
   },
}
</script>

<style>
   @import '../assets/styles/styles.css';

   .login-main-container{     
      width: 30%;
   }

   .login-main-container .loading-animation{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }


   .login-box > a{
      color: #42b983
   }

   .login-btn{
     margin-bottom: 1em;
   } 
</style>
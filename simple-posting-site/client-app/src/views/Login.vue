<template>
   <div class="login-main">
      <div class="login-box absolute-center">
         <input type="text" placeholder="Username" v-model="username">
         <br>
         <input type="password" placeholder="Password" v-model="password"> 
         <br>
         <button class="login-btn green">Login</button>
         <br>
         <router-link to="/register">Create an account!</router-link>
      </div>      
   </div>
</template>

<script>
export default {
   data() {
      return {
         username: '',
         password: ''
      }
   },
   methods: {
      login(){
         
      }
   },
}
</script>

<style>
   @import '../assets/styles/styles.css';

   .login-main{     
      width: 30%;
   }

   .login-box > a{
      color: #42b983
   }

   .login-btn{
     margin-bottom: 1em;
   } 
</style>
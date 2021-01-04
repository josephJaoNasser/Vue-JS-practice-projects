<template>
   <div class="reg-main-container">
      <transition name="fade" >
          <div 
            class="loading-animation"
            v-if="this.userLoadingStates.registeringUser
            && !this.errors" 
          >
            <div class="hollow-dots-spinner">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div> 
          </div>   
      </transition>  
      <div class="registration-container absolute-center" 
         v-bind:class="{'transparent' : this.userLoadingStates.registeringUser}"
      >
         <h1 class="green-text">Create an account</h1>
         <h5>Username</h5>
         <input type="text" v-model="username" maxlength="16"/><br>
         <h5>Display Name</h5>
         <input type="text" v-model="displayName" maxlength="16"/><br>
         <h5>Password</h5>
         <input type="password" v-model="password"/><br>
         <h5>Confirm Password</h5>
         <input type="password" v-model="confirm_password"/><br>
         <h5>E-mail</h5>
         <input type="email" v-model="email"/><br>
         <h5>Bio</h5>
         <textarea v-model="bio"></textarea><br>

         <button class="green" @click="registerUser()">Submit</button>
      </div>
     
      
   </div>   
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   data() {
      return{
         username: '',
         displayName: '',
         password: '',
         confirm_password: '',
         email: '',
         bio: '',
         errors: '',
      }
   },
   computed: mapGetters(['userLoadingStates']),
   methods: {
      registerUser(){
         let newUser = {
            username: this.username,
            displayName: this.displayName,
            password: this.password,
            confirm_password: this.confirm_password,
            email: this.email,
            bio: this.bio,
         }

         try{
            
            this.$store.dispatch('registerUser',newUser).then(res => {
               if(res.data.success){
                  this.$router.push('/login')
               }
            })
         }
         catch(err){
            console.log(err)
         }      
      }
   }
}
</script>

<style>
@import '../assets/styles/styles.css';

.reg-main-container .loading-animation{
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}

.registration-container{
   width: 50%;
   text-align: left;
}

.registration-container > input{
   width: 100%;
}

.registration-container > button{
   margin-left: 50%;
   transform: translateX(-50%);
}



</style>
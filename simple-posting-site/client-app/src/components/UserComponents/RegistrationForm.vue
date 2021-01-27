<template>
  <div class="registration-container " 
      v-bind:class="{'transparent' : this.userLoadingStates.registeringUser}"
   >      
      <!-- Username  -->
      <h5>Username</h5>
      <input 
         type="text" 
         v-model="username" 
         maxlength="15"
         v-bind:class="{'input-error': (this.userErrors.field=='username')}"
      />
      <div v-if="(this.userErrors.field == 'username')">
         <p class="error">{{this.userErrors.msg}}</p>
      </div>

       <!-- Display Name -->
      <h5>Display Name</h5>
      <input 
         type="text" 
         v-model="displayName" 
         maxlength="50"
         v-bind:class="{'input-error': (this.userErrors.field=='displayName')}"
      />
      <div v-if="(this.userErrors.field == 'displayName')">
         <p class="error">{{this.userErrors.msg}}</p>
      </div>

      <!-- Passwords  -->
      <h5>Password</h5>
      <input 
         type="password" 
         v-model="password"
         v-bind:class="{'input-error': (this.userErrors.field=='password')}"
      />         
      <h5>Confirm Password</h5>
      <input 
         type="password" 
         v-model="confirm_password"
         v-bind:class="{'input-error': (this.userErrors.field=='password')}"
      />
      <div v-if="(this.userErrors.field == 'password')">
         <p class="error">{{this.userErrors.msg}}</p>
      </div>                  
      
      <!-- Email  -->
      <h5>E-mail</h5>
      <input 
         type="email" 
         v-model="email"
         v-bind:class="{'input-error': (this.userErrors.field=='email')}"
      />      
      <div v-if="(this.userErrors.field == 'email')">
         <p class="error">{{this.userErrors.msg}}</p>
      </div>         
      
      <!-- Bio  -->
      <h5>Bio</h5>
      <textarea v-model="bio"></textarea><br>

      <button class="green" @click="registerUser()">Submit</button>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
   computed: mapGetters(['userLoadingStates', 'userErrors']),
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
                  this.$router.push('/registration-success')
               }
            })
         }
         catch(err){
            console.log(err)
         }      
      }
   },
}
</script>

<style>

</style>
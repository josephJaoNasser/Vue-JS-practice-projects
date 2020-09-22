<template>
   <div class="registration-main-div">
      Username:<input type="text" v-model="username" /><br>
      Display Name: <input type="text" v-model="displayName"/><br>
      Password: <input type="password" v-model="password"/><br>
      E-mail: <input type="email" v-model="email"/><br>
      Bio: <textarea v-model="bio"></textarea><br>

      <button @click="registerUser()">Submit</button>
      
   </div>   
</template>

<script>
import UserManagementService from '../UserManagementService.js'

export default {
   data() {
      return{
         username: '',
         displayName: '',
         password: '',
         email: '',
         bio: '',
      }
   },
   methods: {
      async registerUser(){
         await UserManagementService.registerUser(this.username,this.displayName,this.password,this.email,this.bio);         
      }
   }
}
</script>

<style scoped>

</style>
<template>
  <div class="mobile-user-bar-main-div">
        <a class="avatar" href="/profile">
            <!-- avatar here -->
         </a>
          <button @click="logout" style="float:right">Logout</button>
     </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
   name: 'MobileUserBar',
   computed: mapGetters(['currentUser']),
   methods: {
      logout(){
         this.$store.dispatch('logout').then(()=>{
            this.$router.push('/login')
         })      
      },
   }
}
</script>

<style>
.mobile-user-bar-main-div{
  height: 65px;
  border-bottom:1px solid #ddd;
  margin-top: 15px;
  padding: 0 10px;
} 

.mobile-user-bar-main-div .avatar{
   height: 50px;
   min-width:50px;
   background-color: aquamarine;
   border-radius: 50%;
   float: left;
}


</style>
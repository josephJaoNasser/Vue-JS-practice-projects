<template>
  <div class="mobile-user-bar-main-div">
        <a class="avatar small" :href="`/${this.currentUser.username}`">
            <!-- avatar here -->
            <img :src="`./api/users/${this.currentUser._id}/profile-images/${this.currentUser.profile_image}?size=small`" />
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
   float: left;
   overflow: hidden;
}

.mobile-user-bar-main-div .avatar img{
   max-width: 50px;
   object-fit: cover;
}
</style>
<template>
  <div class="user-actions-main-div">
     <div class="user-card">
        <div class="user-info">
           <div class="avatar">
            <!-- avatar here -->
            </div>
            <div id="user-card-text" class="text-left">
                  
                  <h5 class="mb-0 font-weight-bold">{{this.currentUser.displayName}}</h5>
                  <p>
                     <i>{{this.currentUser.username}}</i>
                  </p>
            </div>   
        </div>
         
         <button @click="logout">Logout</button>
     </div>

     <div class="mobile-user-bar">
        <div class="avatar">
            <!-- avatar here -->
         </div>
          <button @click="logout" style="float:right">Logout</button>
     </div>
     
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
   name: 'UserCard',   
   computed: mapGetters(['currentUser']),
   methods: {
      logout(){
      this.$store.dispatch('logout').then(()=>{
         this.$router.push('/login')
      });
    }
   },
}
</script>

<style>
   .user-card{
      width: 20%;
      padding: 1.2em ;
      border-radius: 20px;
      background-color: white;
      position: fixed;
      top:30px;
      left:3%;
      -webkit-box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
      -moz-box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
      box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
   }

   .user-card .user-info{
      display: flex;
      justify-content: flex-start;
   }

   .user-actions-main-div .avatar{
      height: 50px;
      width:50px;
      background-color: aquamarine;
      border-radius: 50%;
      float: left;
      margin-right: 20px;
   }

   .mobile-user-bar{
      height: 65px;
      border-bottom:1px solid #ddd;
      margin-top: 15px;
      display: none;
   }

   @media screen and (max-width: 1280px){
      .user-card{
         display: none;
      }

      .mobile-user-bar{
         display: block;
      }

   }
</style>
<template>
   <div class="user-card-main-div">
      <a href="/profile" class="user-info">
         <div class="avatar" >
         <!-- avatar here -->
         </div>
         <div id="user-card-text" class="text-left ml-3">
               
               <h5 class="mb-0 font-weight-bold">{{truncate(this.currentUser.displayName)}}</h5>
               <p>
                  <i>{{this.currentUser.username}}</i>
               </p>
         </div>   
      </a>
      
      <button @click="logout">Logout</button>
   </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
   name: 'UserCard',   
   computed: mapGetters(['currentUser']),
   data(){
      return{
         currentWidth: 0
      }
   },
   methods: {
      logout(){
         this.$store.dispatch('logout').then(()=>{
            this.$router.push('/login')
         })      
      },

      truncate(input){
         let limit = Math.trunc(this.currentWidth / 88)
         if(this.currentWidth > 3000){
            limit = 50
         }
         if (input.length > limit) {
            return input.substring(0, limit) + '...';
         }
         return input;
      }
   },
   created(){
      this.currentWidth = window.innerWidth
      window.addEventListener('resize', () => {
         this.currentWidth = window.innerWidth
      })
      
   }
}
</script>

<style>
   .user-card-main-div{
      width: 20%;
      padding: 1.2em ;
      border-radius: 20px;
      background-color: white;
      top:30px;
      left:3%;
      -webkit-box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
      -moz-box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
      box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
   }

   .user-card-main-div .user-info{
      display: flex;
      justify-content: flex-start;
   }

   .user-card-main-div .avatar{
      height: 50px;
      min-width:50px;
      background-color: aquamarine;
      border-radius: 50%;
      float: left;
   }

  

   @media screen and (max-width: 1280px){
      .user-card{
         display: none;
      }
/* 
      .mobile-user-bar{
         display: block;
      } */

   }
</style>
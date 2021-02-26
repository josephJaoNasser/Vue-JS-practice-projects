<template>
   <div style="padding:1em;" class="absolute-center">
      <div>
         <i class="far fa-sad-tear fa-10x"></i>
         <h1 class="display-1">Oops!</h1>
         <h4>We can't find what you're looking for :(</h4>
         <p>Taking you back to the homepage in {{this.timeLeft}}</p>
      </div>
    
   </div>
  
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
   data() {
      return {
         timeLeft: 5
      }
   },
   created(){
      setInterval(()=> {   
         if(this.timeLeft <= 0){
            this.$router.push('/login')
         }  
         this.timeLeft --;       
      },1000)
   }
}
</script>

<style>

</style>
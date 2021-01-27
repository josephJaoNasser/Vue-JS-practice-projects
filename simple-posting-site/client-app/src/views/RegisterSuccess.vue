<template>
   <div style="padding:1em;" class="absolute-center">
      <div>
         <i class="fas fa-check-circle fa-9x green-text mb-4"></i>
         <h1 class="green-text">Successfully registered!</h1>
         <p>Please wait as we take you back to the login page...</p>
         <div 
         class="loading-animation mt-4"
          >
            <div class="hollow-dots-spinner">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div> 
         </div>   
      </div>
    
   </div>
  
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
   created(){
      setTimeout(()=> this.$router.push('/login'),3000)
   }
}
</script>

<style>

</style>
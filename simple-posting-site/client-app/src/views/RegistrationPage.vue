<template>
   <div class="reg-main-container">
      <div class="registration-page-header">
         <h1>Create an account</h1>
      </div>
      <transition name="fade" >
          <div 
            class="loading-animation"
            v-if="this.userLoadingStates.registeringUser
            && !this.userErrors.msg" 
          >
            <div class="hollow-dots-spinner">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div> 
          </div>   
      </transition>

      <RegistrationForm />
      
   </div>   
</template>

<script>
import LoadingComponent from '@/components/LoadingComponents/LoadingComponent.vue'
import ErrorComponent from '@/components/ErrorComponents/ErrorComponent.vue'
import {mapGetters} from 'vuex'

const RegistrationForm = () => ({
  component: import(/* webpackChunkName: "registration-form-component" */'@/components/UserComponents/RegistrationForm.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  timeout: 300000
});

export default {  
   components: {
      RegistrationForm
   },   
   computed: mapGetters(['userLoadingStates', 'userErrors']),
   created() {
      this.$store.dispatch('clearUserStates');
   },
}
</script>

<style>
@import '../assets/styles/styles.css';

.registration-page-header{
   flex-direction: column;
   text-align: left;  
   background-color: #42b983;
   padding: 3em 2em 10px ;
   margin-bottom: 1em;
}

.registration-page-header > h1{
   color: white;
}

.reg-main-container .loading-animation{
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}

.registration-container{
   width: 50%;
   margin: 1.5em auto;
   text-align: left;
}

.registration-container > input{
   width: 100%;
}

.registration-container > button{
   margin-left: 50%;
   transform: translateX(-50%);
}

@media screen and (max-width: 1024px){
   .registration-container{
      width: 90%;
      margin: 1.5em auto;
      text-align: left;
   }
}

</style>
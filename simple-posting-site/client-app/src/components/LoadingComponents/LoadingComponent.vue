<template>
  <div class="loading-component-main-div ">
     <transition name="fade" >
        <div class="loading-animation">
          <div class="hollow-dots-spinner">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
          </div> 
        </div>   
      </transition>  
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loading-component-main-div{
    padding: 2em;
    border-radius: 50px;
    height: 100%;
    margin-bottom: 2em;
  }
</style>
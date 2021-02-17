<template>
  <div class="lightbox-main-container" >
    <transition name="fade" >
      <div 
        class="loading-animation absolute-center"
        v-if="!this.isLoaded" 
      >
        <div class="hollow-dots-spinner">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div> 
      </div>   
    </transition>
    <i class="fa fa-times lightbox-nav" @click="$emit('lightbox-closed')"></i>

    <div 
      v-for="(item, index) in this.images"      
      v-bind:index="index"
      v-bind:key="index"
      v-show="currentIndex==index"
    >
      <img 
        class="absolute-center" 
        :src="`${item}`"           
        @load="isLoaded = true"
      >
    </div>
    
    
    <i 
      v-if="this.images.length > 1 && this.currentIndex > 0" 
      class="fas fa-arrow-left lightbox-nav-arrows"
      @click="prev"
    >
    </i>
    
    <i 
      v-if="this.images.length > 1 && this.currentIndex < this.images.length -1" 
      class="fas fa-arrow-right lightbox-nav-arrows"
      @click="next"
    >
    </i>   
  </div>
</template>

<script>
export default {
  name: 'lightbox',
  props: ['images','clickedImageIndex'],
  data() {
    return {
      isLoaded: false,
      currentIndex: -1
    }
  }, 
  methods: {
    next(){
      if(this.currentIndex < this.images.length-1)
        this.currentIndex++
    },
    prev(){
      if(this.currentIndex > 0)
        this.currentIndex--
    }
  },
  created() {
    if(this.clickedImageIndex != -1)
      this.currentIndex = this.clickedImageIndex
  },
}
</script>

<style>
.lightbox-main-container{
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.8);
}

.lightbox-main-container img{
    max-width: 80%;
    max-height: 100%;
  }

.lightbox-nav,
.lightbox-nav-arrows{
  color: white;
  font-size: 1.5em;
  padding: 10px;
  position: absolute;
  height: 40px;
  width: 40px;
  top: 50%;
  cursor: pointer;
  z-index: 9999;
}


.lightbox-nav-arrows.fa-arrow-right{
  right: 20px;
}

.lightbox-nav-arrows.fa-arrow-left{
  left: 20px;
}

.lightbox-nav.fa-times{
  top: 10px;
  left: 10px;
}

@media screen and (max-width: 600px) {
  .lightbox-main-container img{
    max-width: 100%;
    height: auto;
  }
  .lightbox-nav-arrows{
    bottom: 0;
  }

  .lightbox-nav-arrows{
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 1.5em;
    padding: 10px;
    position: absolute;
    top: 50%;
    cursor: pointer;
    z-index: 999999;
  }

  .lightbox-nav-arrows.fa-arrow-right{
    right: 0;
    border-radius: 20px 0 0 20px;
  }

  .lightbox-nav-arrows.fa-arrow-left{
    left: 0;
    border-radius: 0 20px 20px 0;
  }

}
</style>
<template>
  <div class="lightbox-main-container" >
    <i class="fa fa-times lightbox-nav" @click="$emit('lightbox-closed')"></i>
    <img 
      class="absolute-center" 
      :src="'./api/posts/post-media/'+this.url"
      style="width:80%"
    >
    <i class="fas fa-arrow-left lightbox-nav-arrows" @click="$emit('lightbox-prev')"></i>
    <i class="fas fa-arrow-right lightbox-nav-arrows" @click="$emit('lightbox-next')"></i>   
  </div>
</template>

<script>
export default {
  name: 'lightbox',
  props: ['url'],
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
  background-color: rgba(0, 0, 0, 0.5);
}

.lightbox-nav,
.lightbox-nav-arrows{
  color: white;
  font-size: 1.5em;
  padding: 10px;
  position: absolute;
  top: 50%;
  cursor: pointer;
  z-index: 999999;
}

.lightbox-nav-arrows.fa-arrow-right{
  right: 20px;
}

.lightbox-nav-arrows.fa-arrow-left{
  left: 20px;
}

.lightbox-nav.fa-times{
  top: 10px;
  left: 20px;
}

@media screen and (max-width: 600px) {
  .lightbox-main-container img{
    width: 100%!important;
  }
  .lightbox-nav-arrows{
    bottom: 0;
  }
}
</style>
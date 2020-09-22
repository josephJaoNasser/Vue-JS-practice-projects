<template>
  <div class="main-container">    
    <transition name="fade">      
      <PostUpdateComponent 
        v-on:update-modal-closed="post = []" 
        v-if="this.post.id" 
        v-bind:post="this.post"/>
    </transition>
    <PostComponent />
    <PostList v-on:updating-post="setPost"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import PostList from '@/components/PostList.vue'
import PostComponent from '@/components/PostComponent.vue'
import PostUpdateComponent from '@/components/PostUpdateComponent.vue'

export default {
  name: 'Home',
  components: {
    PostComponent,
    PostUpdateComponent,
    PostList
  },
  data(){
    return {
      post: []
    }
  },
  methods: {
    setPost(post){
      this.post = post
    }
  }
}
</script>

<style scoped>


.main-container{
  width: 50vw;
  margin: 0 auto;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}



@media screen and (max-width: 992px){
  .main-container{
    width: 80vw;
  }

}

</style>
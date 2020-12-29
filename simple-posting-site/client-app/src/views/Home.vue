<template>
  <div class="home-main-container">  
    <router-link to="/home">Home</router-link> |  
    <transition name="fade">      
      <PostUpdateComponent 
        v-on:update-modal-closed="post = []" 
        v-if="this.post._id" 
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
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: mapGetters(['loadingStates']),
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

<style>
@import '../assets/styles/styles.css';

.home-main-container{
  width: 50vw;
  margin: 0 auto;
}


@media screen and (max-width: 992px){
  .main-container{
    width: 80vw;
  }

}

</style>
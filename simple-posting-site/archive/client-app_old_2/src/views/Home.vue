<template>
  <div class="home-main-container"> 
    
    <UserCard />
    
    <h1 class="text-left font-weight-bold mb-0 mt-3">Home</h1>
    
    <transition name="fade">                  
      <PostUpdateComponent 
        v-on:update-modal-closed="updatePost = []" 
        v-if="this.updatePost._id" 
        v-bind:post="this.updatePost"/>      
    </transition>

    <transition name="fade">            
      <ConfirmDeleteModal 
        v-bind:post="this.deletePost"
        v-if="this.deletePost._id" 
        v-on:delete-modal-closed="deletePost = []" 
      />    
    </transition>

    
    <PostComponent />    
    
    <PostList 
      v-on:updating-post="setUpdatePost"
      v-on:deleting-post="setDeletePost"
    />
      
  </div>
</template>

<script>
// @ is an alias to /src
import PostList from '@/components/PostList.vue'
import PostComponent from '@/components/PostComponent.vue'
import PostUpdateComponent from '@/components/PostUpdateComponent.vue'
import UserCard from '@/components/UserCard.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: mapGetters(['loadingStates','currentUser']),
  components: {
    PostComponent,
    PostUpdateComponent,
    PostList,
    UserCard,
    ConfirmDeleteModal
  },
  data(){
    return {
      updatePost: [],
      deletePost: []
    }
  },
  methods: {    
    setUpdatePost(post){
      this.updatePost = post
    },

    setDeletePost(post){
      this.deletePost = post
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
  .home-main-container{
    width: 90vw;
  }

}

</style>
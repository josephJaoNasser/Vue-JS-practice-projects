<template>
   <div class="profile-main-container">
      <button 
         class="green" 
         style="position:relative; left: -43%"
         @click="$router.push('/')"
      >
         <i class="fas fa-arrow-left"></i>
      </button>
      <div class="avatar large">
         <img :src="'./api/users/profile-images/'+this.currentUser._id+'/'+this.currentUser.profile_image" />
         <!-- avatar here -->
      </div>
      <div class="p-3">
         <h2>{{this.currentUser.displayName}}</h2>
         <h4 style="opacity: 0.7">{{this.currentUser.username}}</h4>
      </div>
      
      <hr>
      
      <h4 class="posts-header font-weight-bold text-left">Your posts</h4>
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
     <PostList 
         v-bind:id="this.currentUser._id"
         v-on:updating-post="setUpdatePost"
         v-on:deleting-post="setDeletePost"
      /> 
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingComponent from '@/components/LoadingComponents/LoadingComponent.vue'
import ErrorComponent from '@/components/ErrorComponents/ErrorComponent.vue'

const PostList = () => ({
  component: import(/* webpackChunkName: "post-component" */'@/components/PostComponents/PostList.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  timeout: 300000
});

export default {
   data() {
      return {
         updatePost: [],
         deletePost: [],
      }
   },
   components: {
      PostList,
      ConfirmDeleteModal: ()=> import(/* webpackChunkName: "confirm-delete-modal-component" */'@/components/PostComponents/ConfirmDeleteModal.vue'),
      PostUpdateComponent: ()=> import(/* webpackChunkName: "post-update-component" */'@/components/PostComponents/PostUpdateComponent.vue'),
   },
   computed: mapGetters(['currentUser']),
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
.profile-main-container{
   width: 50vw;
   margin: 2em auto;
}

.profile-main-container .avatar.large{
   margin: 0px auto;
}

@media screen and (max-width: 992px){
  .profile-main-container{
    width: 90vw;
  }

}

@media screen and (max-width: 600px){
   .profile-main-container{
    width: 100vw;
  }

   .posts-header{
    margin-left: 1em;
  }
}


</style>
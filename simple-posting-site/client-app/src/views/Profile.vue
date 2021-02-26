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
         <img v-if="this.user._id" :src="`./api/users/${this.user._id}/profile-images/${this.user.profile_image}?size=medium`" />
         <!-- avatar here -->
      </div>
      <div class="p-3">
         <h2>{{this.user.displayName}}</h2>
         <h4 style="opacity: 0.7">{{this.user.username}}</h4>
         
      </div>
      <p style="opacity: 0.7">{{this.user.bio}}</p>
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
         v-bind:username="this.$route.params.username"
         v-on:updating-post="setUpdatePost"
         v-on:deleting-post="setDeletePost"
      /> 
   </div>
</template>

<script>
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
         user: {}
      }
   },
   components: {
      PostList,
      ConfirmDeleteModal: ()=> import(/* webpackChunkName: "confirm-delete-modal-component" */'@/components/PostComponents/ConfirmDeleteModal.vue'),
      PostUpdateComponent: ()=> import(/* webpackChunkName: "post-update-component" */'@/components/PostComponents/PostUpdateComponent.vue'),
   },
   
   methods: {     

      setUpdatePost(post){
         this.updatePost = post
      },

      setDeletePost(post){
         this.deletePost = post
      }
   },
   created() {
      this.$store.dispatch('getUserInfo',this.$route.params.username).then( user => {         
         this.user = user  
      }).catch(err => {
         if(err){
            this.$router.push('/errors/404')
         }
      })
   },
   
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
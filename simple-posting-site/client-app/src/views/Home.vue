<template>
  <div class="home-main-container"> 
    <MobileUserBar 
      v-if="this.currentWidth < 1280"
    />

    <div class="component-container">
      <UserCard 
        style="position: fixed"
        v-if="this.currentWidth > 1280"
        />
    </div>
    
    
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
    
    <div class="component-container">
      <PostComponent />   
    </div>
     
    <div class="post-list-container component-container">
      <PostList 
        v-on:updating-post="setUpdatePost"
        v-on:deleting-post="setDeletePost"
      />
    </div>
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingComponent from '@/components/LoadingComponents/LoadingComponent.vue'
import ErrorComponent from '@/components/ErrorComponents/ErrorComponent.vue'

/* pre-define components */
const PostComponent = () => ({
  component: import(/* webpackChunkName: "post-component" */'@/components/PostComponents/PostComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  timeout: 300000
});

const PostList = () => ({
  component: import(/* webpackChunkName: "post-component" */'@/components/PostComponents/PostList.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  timeout: 300000
});

const UserCard = () => ({
  component: import(/* webpackChunkName: "user-card-component" */'@/components/UserComponents/UserCard.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  timeout: 300000
})

export default {
  name: 'Home',
  computed: mapGetters(['postLoadingStates','currentUser']),
  components: {
    PostComponent,    
    PostList,
    UserCard,
    ConfirmDeleteModal: ()=> import(/* webpackChunkName: "confirm-delete-modal-component" */'@/components/PostComponents/ConfirmDeleteModal.vue'),
    PostUpdateComponent: ()=> import(/* webpackChunkName: "post-update-component" */'@/components/PostComponents/PostUpdateComponent.vue'),
    MobileUserBar: () => import(/* webpackChunkName: "mobile-user-bar" */'@/components/UserComponents/MobileUserBar.vue')
  },
  data(){
    return {
      updatePost: [],
      deletePost: [],
      currentWidth: 0
    }
  },
  methods: {    
    setUpdatePost(post){
      this.updatePost = post
    },

    setDeletePost(post){
      this.deletePost = post
    }
  },
  created(){
      this.currentWidth = window.innerWidth
      window.addEventListener('resize', () => {
         this.currentWidth = window.innerWidth
      })
      
   }
}
</script>

<style>
.home-main-container{
  width: 50vw;
  margin: 0 auto;
}

.post-list-container::before{
  content: "";
  display: block;
  width: 100%;
  height: 5px;
  margin-top: 1em;
  background-color: #42b983;
}


@media screen and (max-width: 992px){
  .home-main-container{
    width: 90vw;
  }

}

</style>
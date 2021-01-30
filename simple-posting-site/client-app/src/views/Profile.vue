<template>
   <div class="profile-main-container">
      <div class="avatar">
         <!-- avatar here -->
      </div>
      <div class="p-3">
         <h2>{{this.currentUser.displayName}}</h2>
         <h4 style="opacity: 0.7">{{this.currentUser.username}}</h4>
      </div>

      <hr>
      
      <h4 class="font-weight-bold text-left">Your posts</h4>
      
     <PostList v-bind:id="this.currentUser._id"/> 
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
   components: {
      PostList
   },
   computed: mapGetters(['currentUser']),
   methods: {
      
   },
   created() {
      
   },
   
}
</script>

<style>
.profile-main-container{
   width: 50vw;
   margin: 2em auto;
}
</style>
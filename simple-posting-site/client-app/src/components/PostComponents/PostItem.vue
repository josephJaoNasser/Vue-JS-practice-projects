<template>
  <div class="post-item-main-container">
    
    <a class="post-avatar avatar small" href="/profile">
      <!-- avatar here -->
      <img :src="'./api/users/profile-images/'+this.post.user._id+'/'+this.post.user.profile_image" />
    </a>
    <div class="post-body">
      <p class="post-author">
        <strong>{{truncate(this.post.user.displayName, 18)}}</strong>
      </p>
      <p class="post-text">
        {{this.post.text}}
      </p>

      <p class="post-date">
        <small v-if="!this.post.updatedAt">
          <i>Posted {{getDateAndTime(this.post.createdAt)}}</i>
        </small>
        <small v-if="this.post.updatedAt">
          <i>Updated {{`${getDateAndTime(new Date(this.post.updatedAt))}`}}</i>
        </small>
      </p>        
    </div>
    <b-dropdown id="dropdown-right" right no-caret variant="light" class="m-2 float-right">
      <template #button-content>
        <i class="fa fa-ellipsis-v"></i>       
      </template>
      <div id="post-actions-container" v-if="this.post.user._id == currentUserId">
        
        <b-dropdown-item-button 
          variant="warning" 
          button-class="btn-update py-3" 
          @click="$emit('updating-post')"           
        >
          <i class="far fa-edit"></i> Edit 
        </b-dropdown-item-button>

        <b-dropdown-item-button 
          variant="danger" 
          active-class="danger" 
          button-class="btn-delete py-3" 
          @click="$emit('deleting-post')"
        >
          <i class="far fa-trash-alt"></i> Delete
        </b-dropdown-item-button>

      </div>

      <div v-else style="padding: 1rem 1rem">
        <i class="transparent">You can't do anything to this post since it's not yours</i>
      </div>
      
    </b-dropdown>     
  </div>
</template>

<script>
import moment from 'moment/src/moment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'PostItem',
  props: ['post'],
  data(){
    return {
      currentUserId: this.$store.getters.currentUser._id  
    }
  },
  methods: {
    getDateAndTime(value){
        return moment(value).fromNow()
      },

    getSinglePost(postID,postText){
          const thePost = {
              id: postID,
              text: postText
          }

          return thePost
    },
    truncate(input,limit){        
        if (input.length > limit) {
          return input.substring(0, limit) + '...';
        }
        return input;
      }
  }
}
</script>

<style>
.post-item-main-container{
  display: flex;
}

.post-item-main-container .b-dropdown{
  align-self: flex-start;
  margin:0!important;
}

.post-avatar{
  float: left;
  overflow: hidden;
}

.post-body{
  margin-left: 15px;
  flex-shrink: 17;
  flex-grow: 1;
}
</style>
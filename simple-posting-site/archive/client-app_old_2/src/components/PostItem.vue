<template>
  <div class="post-item-main-container">
    <b-dropdown id="dropdown-right" right no-caret html="<i class='fas fa-ellipsis-v'></i>" variant="light" class="m-2 float-right">
              
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
  
    <p class="post-author">
      <strong>{{this.post.user.displayName}}</strong>
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
</template>

<script>
import moment from 'moment'
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
  }
}
</script>
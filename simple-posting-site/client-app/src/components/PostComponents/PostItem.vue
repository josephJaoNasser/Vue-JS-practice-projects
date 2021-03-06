<template>
  <div class="post-item-main-container">
    <transition name="fade">
      <Lightbox 
        :images="imageData"
        :clickedImageIndex="this.clickedImageIndex"
        v-if="imageData.length"
        v-on:lightbox-closed="imageData = []"
      />
    </transition>
    <a class="post-avatar avatar small" :href="`/${this.post.user.username}`">
      <!-- avatar here -->
      <img :src="`./api/users/${this.post.user._id}/profile-images/${this.post.user.profile_image}?size=tiny`" />
    </a>

    <div class="post-body mb-3">

      <p class="post-author mb-0">
        <a :href="`${this.post.user.username}`" style="color: #303030;">
          <strong>{{truncate(this.post.user.displayName, 18)}}</strong>
        </a>
      </p>

      <p class="post-date">
        <small v-if="!this.post.updatedAt">
          <i>Posted {{getDateAndTime(this.post.createdAt)}}</i>
        </small>
        <small v-if="this.post.updatedAt">
          <i>Updated {{`${getDateAndTime(new Date(this.post.updatedAt))}`}}</i>
        </small>
      </p>

      <p class="post-text" v-if="this.post.text.length">
        {{this.post.text}}
      </p>
      
      <div 
        class="post-media-container"
        ref="media" 
        v-if="this.post.media.length"
        v-bind:class="{
          'single-image':(this.post.media.length == 1),
          'image-grid':(this.post.media.length > 1),
          'double-image':(this.post.media.length == 2),
          'odd-images':(this.post.media.length == 3)
          }"
        >
        <div 
          class="post-media-preview"          
          v-for="(item, index) in this.post.media"
          v-bind:item="item"
          v-bind:index="index"
          v-bind:key="index.filename" 
        >
          <img 
            :src="`./api/posts/${post._id}/media/${item}?size=small`"
            @click="openLightbox(post,index)"
          >          
        </div>
      </div>  
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
import LoadingComponent from '@/components/LoadingComponents/LoadingComponent.vue'
import ErrorComponent from '@/components/ErrorComponents/ErrorComponent.vue'

const Lightbox = () => ({
  component: import(/* webpackChunkName: "lightbox-component" */'@/components/PostComponents/Lightbox.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  timeout: 300000
});

export default {
  name: 'PostItem',
  props: ['post'],
  components: {
    Lightbox
  },
  data(){
    return {
      currentUserId: this.$store.getters.currentUser._id,
      imageData: [],
      clickedImageIndex: -1
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
    },

    openLightbox(post, clickedImageIndex){
      post.media.forEach(item => {
        this.imageData.push(`./api/posts/${post._id}/media/${item}?size=large`)
        this.clickedImageIndex = clickedImageIndex
      });
    }
  },
  created() {
    //console.log()
  },

}
</script>

<style>
.post-media-container{    
  overflow: hidden;  
}

.image-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.double-image > .post-media-preview,
.single-image > .post-media-preview{
  max-height: 400px;
}

.odd-images > .post-media-preview:nth-child(1){
  grid-row: 1 / span 2;
  /* grid-column: 2; */
  max-height: 400px;
}

.post-media-preview{
  max-height: 200px;
  min-height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.post-media-preview img{  
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-color: #ddd;
  cursor: pointer;
}

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
  margin-left: 10px;
  flex-shrink: 17;
  flex-grow: 1;
  max-width: 90%;
}

.post-date, .post-text{
  margin-bottom: 5px;
}

@media screen and (max-width: 600px){
  .single-image > .post-media-preview{
    max-height: 100%;
  }

  .post-media-preview{
    max-height: 100px;
    min-height: 100px;
    border-radius: 6px;
  }

}

</style>
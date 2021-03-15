<template>
  <div class="post-component-main">
    <textarea type="text" id="create-post" v-model="text" placeholder="Say something..."></textarea>    
    
    <AttatchmentsPreview 
      v-bind:url="this.url"
      v-bind:attatchments="this.attatchments"
      v-if="this.url.length && this.attatchments.length"
    />   

    <div class="post-actions">
      <AttatchImageButton 
        v-on:images-attatched="setAttatchments($event)"
        v-on:image-attatchment-error="errorMsg = $event"
      />

      <button :disabled="posting || (!text && !this.url.length)" class="btn-post green" v-on:click="createPost">
        <i v-if="this.postLoadingStates.sendingPost" class="fas fa-circle pulse"></i>
        <span v-else>Post</span>  
      </button>
    </div>    

    <p class="error">{{errorMsg}}</p>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import AttatchmentsPreview from './AttatchmentsPreview.vue'
import AttatchImageButton from './AttatchImageButton.vue'

export default {
  name: 'PostComponent',
  components: {
    AttatchmentsPreview,
    AttatchImageButton
  },
  computed: mapGetters(['postLoadingStates','currentUser']),
  data(){
    return{
      text: '',
      posting: false,
      errorMsg: '',      
      attatchments: [],
      url: []
    }
  },
  methods: {
    createPost(){
      if(!this.postLoadingStates.sendingPost){
        this.$store.dispatch('createPost', {text: this.text, user: this.currentUser, media:this.attatchments})
        this.text = this.errorMsg = ''
        this.attatchments = this.url = []
      }     
    },
    setAttatchments(payload){
      if((this.url.length + payload.url.length) && (this.attatchments.length + payload.attatchments.length) <= 4){  
        this.url = this.url.concat(payload.url)
        this.attatchments = this.attatchments.concat(payload.attatchments)
      }
      else{
        this.errorMsg =  'Only up to 4 images are allowed'    
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


.post-actions{
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 600px){
  .post-component-main{
   padding: 0 10px;
 }
}


</style>

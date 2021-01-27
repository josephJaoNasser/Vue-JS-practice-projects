<template>
  <div class="post-component-main">
    <div class="posting-area">
      <br>
      <textarea type="text" id="create-post" style="margin-right: 15px" v-model="text" placeholder="Say something..."></textarea>
      <button :disabled="posting || !text" class="btn-post green" v-on:click="createPost">
        <i v-if="this.postLoadingStates.sendingPost" class="fas fa-circle pulse"></i>
        <span v-else>Post</span>  
      </button>

        <p class="error">{{errorMsg}}</p>
    </div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PostComponent',
  computed: mapGetters(['postLoadingStates','currentUser']),
  data(){
    return{
      text: '',
      posting: false,
      errorMsg: ''
    }
  },
  methods: {
    createPost(){
      this.$store.dispatch('createPost', {text: this.text, user: this.currentUser})
      this.text = ''
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

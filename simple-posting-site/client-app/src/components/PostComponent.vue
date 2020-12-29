<template>
  <div class="post-component-main">
    <div class="posting-area">
      <br>
      <textarea type="text" id="create-post" style="margin-right: 15px" v-model="text" placeholder="Say something..."></textarea>
      <button :disabled="posting || !text" class="btn-post green" v-on:click="createPost">
        <b-icon v-if="this.loadingStates.sendingPost" icon="circle-fill" animation="throb" font-scale="1"></b-icon>        
        <span v-else>Post</span>  
      </button>

        <p class="error">{{errorMsg}}</p>
    </div>  
  </div>
</template>

<script>
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import { mapGetters } from 'vuex'

export default {
  name: 'PostComponent',
  computed: mapGetters(['loadingStates']),
  data(){
    return{
      text: '',
      posting: false,
      errorMsg: ''
    }
  },
  methods: {
    createPost(){
      this.$store.dispatch('createPost', {text: this.text, createdBy: 'Jay'})
      this.text = ''
    }
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 @import '../assets/styles/styles.css';

.posting-area::after{
  content: "";
  display: block;
  width: 100%;
  height: 5px;
  margin-top: 1em;
  background-color: #42b983;
}

</style>

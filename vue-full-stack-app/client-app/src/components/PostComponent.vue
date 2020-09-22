<template>
  <div class="post-component-main">
    <div class="posting-area">
      <br>
      <textarea type="text" id="create-post" style="margin-right: 15px" v-model="text" placeholder="Say something..."></textarea>
      <button :disabled="posting" class="btn-post" v-on:click="createPost">
        <b-icon v-if="posting" icon="circle-fill" animation="throb" font-scale="1"></b-icon>        
        <span v-else>Post</span>  
      </button>
        <p class="error">{{errorMsg}}</p>
    </div>  
  </div>
</template>

<script>
import PostService from '../PostService'
import { EventBus } from '../event-bus.js';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

export default {
  name: 'PostComponent',
  data(){
    return{
      text: '',
      posting: false,
      errorMsg: ''
    }
  },
  methods: {
    async createPost(){      
      if(this.text.length > 0){
        this.errorMsg = ''
        this.posting = true
        EventBus.$emit('posting')
        await PostService.insertPost(this.text);
        this.text = ''
        EventBus.$emit('post-complete')
        this.posting = false      
      }
      else{
        this.errorMsg = 'Please type something...'
      }

      
                  
    },       
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button:focus{
  outline: none;
}

button:disabled{
  opacity: .5;
}

button:hover{
  cursor: pointer;
}

.posting-area::after{
  content: "";
  display: block;
  width: 100%;
  height: 5px;
  margin-top: 1em;
  background-color: #42b983;
}

.posting-area textarea{
  padding: 1em;
  border: none;
  border-radius: 1em;
  background: #efefef;
  margin-bottom: 10px;
  font-size: 16px;
  width: 100%;
  height: 100px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  resize: none;
}

.btn-post{
  color: white;
  font-weight: bold;
  padding: 1em 3em;
  font-size: 1em;
  border-radius: 4em;
  border: none;
  background-color: #42b983;
}

.posting-area textarea:focus{
  outline: none;
}

.error{
  border-radius: 10px;
  color: rgb(175, 0, 0);
  font-style: italic;
  padding-top: 15px;
}

</style>

<template>
  <div class="post-component-main">
    <div class="posting-area">
      <label for="create-post" style="margin-right: 15px">Create a post </label>
      <input type="text" id="create-post" style="margin-right: 15px" v-model="text" placeholder="Say something...">
      <button v-on:click="createPost">Post</button>
    </div>
    <hr>
    <div class="post-container">         

      <div class="hollow-dots-spinner" v-if="fetching && !error">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>      
      
      <transition name="fade" >
        <p class="error" v-if="error">{{error}}</p>
      </transition>
      
      <transition-group name="fade">
        <div class="post" 
          v-for="(post,index) in posts.slice().reverse()"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
        >      
          
        <p class="post-text">
          {{post.text}}
        </p>        

        <p class="post-date">
          <small>
            <i>{{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}</i>
          </small>
        </p>

        <button class="btn-delete" v-on:click="deletePost(post._id)">X</button>

        </div>        
      </transition-group>
      <transition name="fade" >
        <p class="status" v-if="!posts.length && !error" >{{statusMessage}}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService'

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      statusMessage: 'Loading...',
      fetching: true
      
    }
  },
  async created(){
    try{
      this.posts = await PostService.getPost();
      if(!this.posts.length){
          this.statusMessage = "There's nothing here..."
        }
      this.fetching = false;
    }catch(ex){
      this.error = ex.message;
    }
  },
  methods: {
    async createPost(){
      
      this.fetching = true;
      await PostService.insertPost(this.text);      

      try{

        this.posts = await PostService.getPost();

        if(!this.posts.length){
          this.statusMessage = "There's nothing here..."
        }

        this.text = '';

      }catch(ex){
        this.error = ex.message;
      }

      this.fetching = false;
    },

    async deletePost(id){
      this.fetching = true;
      await PostService.deletePost(id); 

      try{
        this.posts = await PostService.getPost();
        if(!this.posts.length){
          this.statusMessage = "There's nothing here..."
        }
        this.text = '';
      }catch(ex){
        this.error = ex.message;
      }

      this.fetching = false;
      
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.post-container
{
  margin-top: 1em;
}

.status{
  padding: 1em;
  font-style: italic;
  opacity: .5;
}

.post{
  background-color: #303030;
  color: white;
  padding: 10px;
  margin: 1em;
  border-radius: 5px;
}

.posting-area input[type=text]{
  padding: 1em;
  font-size: 14px;
  width: auto;
}

.error{
  background-color: rgb(255, 171, 162);
  padding: 1rem;
  border-radius: 10px;
  color: rgb(145, 0, 0);
}

.post-date{
  opacity: .3;
}

.btn-delete{
  position: relative;
  float: right;
  border: none;
  background-color: rgb(145, 0, 0);
  color: white;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  margin-top: -60px;
  margin-right: 10px;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}

.hollow-dots-spinner, .hollow-dots-spinner * {
      box-sizing: border-box;
    }

    .hollow-dots-spinner {
      height: 15px;
      width: calc(30px * 3);
      margin: 0px auto;
    }

    .hollow-dots-spinner .dot {
      width: 15px;
      height: 15px;
      margin: 0 calc(15px / 2);
      border: calc(15px / 5) solid #303030;
      background-color: #303030;
      border-radius: 50%;
      float: left;
      transform: scale(0);
      animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
    }

    .hollow-dots-spinner .dot:nth-child(1) {
      animation-delay: calc(300ms * 1);
    }

    .hollow-dots-spinner .dot:nth-child(2) {
      animation-delay: calc(300ms * 2);
    }

    .hollow-dots-spinner .dot:nth-child(3) {
      animation-delay: calc(300ms * 3);

    }

    @keyframes hollow-dots-spinner-animation {
      50% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

</style>

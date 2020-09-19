<template>
  <div class="post-component-main">
    <div class="posting-area">
      <br>
      <textarea type="text" id="create-post" style="margin-right: 15px" v-model="text" placeholder="Say something..."></textarea>
      <button class="btn-post" v-on:click="createPost">Post</button>
    </div>
    
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

        <button class="btn-delete" v-on:click="deletePost(post._id)">Delete</button>

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

.posting-area::after{
  content: "";
  display: block;
  width: 100%;
  height: 5px;
  margin-top: 1em;
  background-color: #42b983;
}

.status{
  padding: 1em;
  font-style: italic;
  opacity: .5;
}

.post{
  color: black;
  padding: 10px;
  margin: 1em;
  border-bottom: 1px solid #ddd;
  text-align: left;
  line-height: 1.4em;
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

.posting-area textarea:focus{
  outline: none;
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
  color: rgb(200, 0, 0);
  background-color: white;
  border-radius: 1em;
  padding: 1em 2em;
  margin-top: -40px;
  margin-right: 10px;
}

.btn-delete:hover{
  cursor: pointer;
  color: white;
  background-color: rgb(200, 0, 0);
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

.btn-post:focus{
  outline: none;
}

.btn-post:hover{
  cursor: pointer;
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

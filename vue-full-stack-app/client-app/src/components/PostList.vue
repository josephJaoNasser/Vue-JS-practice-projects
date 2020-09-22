<template>
    <div class="post-list">         
        <transition name="fade" >
            <div class="hollow-dots-spinner" v-if="fetching && !error">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>    
        </transition>  
       <transition name="fade" >
        <p class="status" v-if="(!posts.length && !error) || fetching" >{{statusMessage}}</p>
      </transition>
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
          <b-dropdown id="dropdown-right" right no-caret html="<i class='fas fa-ellipsis-v'></i>" variant="light" class="m-2 float-right">
            <b-dropdown-item-button variant="warning" button-class="btn-update py-3" @click="$emit('updating-post',getSinglePost(post._id,post.text))">
              <i class="far fa-edit"></i> Edit 
            </b-dropdown-item-button>
            <b-dropdown-item-button variant="danger" active-class="danger" button-class="btn-delete py-3" @click="deletePost(post._id)">
              <i class="far fa-trash-alt"></i> Delete
            </b-dropdown-item-button>
          </b-dropdown>
        
          <transition name="fade">
              <p class="post-text">
              {{post.text}}
              </p>
          </transition>        

          <p class="post-date">
            <small v-if="!post.updatedAt">
              <i>Posted on {{getDateAndTime(post.createdAt)}}</i>
            </small>
            <small v-if="post.updatedAt">
              <i>Updated on {{`${getDateAndTime(new Date(post.updatedAt))}`}}</i>
            </small>
          </p>        
        
        </div>        
      </transition-group>
     
    </div>
</template>

<script>
import PostService from '../PostService'
import { EventBus } from '../event-bus.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'PostList',
     data() {
        return {
        posts: [],
        error: '',        
        statusMessage: 'Loading...',
        fetching: false,
        isDeleting: false,
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]
        
        }
    },
    async created(){
        this.fetching = true
        this.loadPosts();

        EventBus.$on('posting',() => {
          this.fetching=true
          this.statusMessage = 'Sending post to the network...'
        });

        EventBus.$on('post-complete',() => {
            this.statusMessage = 'Post has been sent! Now retrieving current posts...'
            this.loadPosts();            
        });

        EventBus.$on('post-updated',() => {
            this.statusMessage = 'Post has been updated! Now retrieving current posts...'
            this.loadPosts();            
        });

        
    },
    methods: {
        async loadPosts(){

            if(!this.fetching)
                this.fetching = true
            try{
                this.posts = await PostService.getPost();
                if(!this.posts.length){
                this.statusMessage = "There's nothing here..."
                }
                this.text = '';
            }catch(ex){
                this.error = ex.message;
            }
            this.fetching = false            
        },

        async deletePost(id){
            this.isDeleting = true
            this.fetching = true;
            this.statusMessage = 'Deleting post...'           
            await PostService.deletePost(id); 
            this.statusMessage = 'Post deleted! Now retrieving all posts'
            this.loadPosts()
            this.isDeleting = false
        },

        getDateAndTime(value){
            return `${this.monthNames[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()} at ${this.formatAMPM(value)}`
        },

         getSinglePost(postID,postText){
            const thePost = {
                id: postID,
                text: postText
            }

            return thePost
        },

         formatAMPM(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
    }
}
</script>

<style scoped>

button:focus{
  outline: none;
}

button:hover{
  cursor: pointer;
}

.post-list
{
  margin-top: 1em;
}

.post-date{
  opacity: .3;
}

.dropdown-toggle{
  float:right
}

.btn-delete:hover,
.btn-update:hover{  
  cursor: pointer;
}


.error{
  background-color: rgb(255, 171, 162);
  padding: 1rem;
  border-radius: 10px;
  color: rgb(145, 0, 0);
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
  white-space: pre-wrap; 
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
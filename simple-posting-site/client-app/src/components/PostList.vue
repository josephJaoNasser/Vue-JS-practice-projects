<template>
    <div class="post-list">         
        <transition name="fade" >
          <div 
            class="loading-animation"
            v-if="this.loadingStates.fetchingPost || this.loadingStates.sendingPost ||
            this.loadingStates.updatingPost || this.loadingStates.deletingPost
            && !this.errors" 
          >
            <div class="hollow-dots-spinner">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div> 
          </div>   
        </transition>  
      <transition name="fade" >
        <p class="error" v-if="this.errors">{{this.errors}}</p>
      </transition>
      
      
      <transition-group name="list-complete">
        <div class="post list-complete-item" 
          v-for="(post,index) in allPosts.slice().reverse()"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
          v-bind:class="{'transparent' : (loadingStates.fetchingPost || loadingStates.sendingPost ||
            loadingStates.updatingPost || loadingStates.deletingPost)}"
        >   
            <b-dropdown id="dropdown-right" right no-caret html="<i class='fas fa-ellipsis-v'></i>" variant="light" class="m-2 float-right">
              <b-dropdown-item-button variant="warning" button-class="btn-update py-3" @click="$emit('updating-post',post)">
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
import { mapGetters, mapActions } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'PostList',
    computed:{ 
      ...mapGetters({
        allPosts: 'allPosts',
        loadingStates: 'loadingStates',
        errors: 'errors'})
    } ,
    data() {
      return {
      posts: [],       
      monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ]
      
      }
    },
    async created(){   
      this.loadPosts().then(() =>{  
        setInterval( () => {
            this.loadPosts(); 
        }, 30000);
      });
              
    },
    methods: {

      ...mapActions(['loadPosts','deletePost']),

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

<style>
 @import '../assets/styles/styles.css';

.post-list
{
  margin-top: 1em;
}

.post-list .loading-animation
{
  position: absolute;
  background-color: white;
  z-index: 999;
  border-radius: 20px;
  padding: 1em;
  left: 50%;
  transform: translateX(-50%);
  -webkit-box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
  box-shadow: -1px 3px 11px -5px rgba(0,0,0,0.75);
}

.post-date{
  opacity: .3;
}

.dropdown-toggle{
  float:right
}

.post-list > .error{
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

</style>
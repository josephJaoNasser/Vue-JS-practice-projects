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
      
      <p class="error" v-if="this.errors">{{this.errors}}</p>
      <p v-if="!this.allPosts.length"><i>There are no posts to show...</i></p>
    
      <transition-group name="list-complete">
        <div class="post list-complete-item" 
          v-for="(post,index) in allPosts.slice().reverse()"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
          v-bind:class="{'transparent' : (loadingStates.fetchingPost || loadingStates.sendingPost ||
            loadingStates.updatingPost || loadingStates.deletingPost)}"
        >   
            <PostItem 
              v-bind:post="post" 
              v-on:updating-post="$emit('updating-post',post)"
              v-on:deleting-post="$emit('deleting-post',post)"
            />

        </div>      
      </transition-group>
    
    </div>
</template>

<script>
import PostItem from './PostItem'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'PostList',
    props: ['id'],
    components: {
      PostItem
    },
    computed:{ 
      ...mapGetters({
        allPosts: 'allPosts',
        loadingStates: 'postLoadingStates',
        errors: 'postErrors'
      }),  
    } ,
    data() {
      return {
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
      }
      
    },   
    methods: {

      ...mapActions(['loadPosts']),

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
    },
     async created(){                    
      this.loadPosts(this.id).then(() =>{
        if(this.$route.name == 'Home'){
          setInterval( () => {
              this.loadPosts(this.id); 
          }, 30000);
        }
        
      });   
    }
}
</script>

<style>
.post-list
{
  margin-top: 1em;
}

.post-list .loading-animation
{
  position: absolute;
  background-color: white;
  z-index: 998;
  border-radius: 20px;
  padding: 1em;
  left: 50%;
  transform: translateX(-50%);
  
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
  background-color: white;
  padding: 10px;
  margin: 1em 0;
  border-bottom: 1px solid #ddd;
  text-align: left;
  line-height: 1.4em;
  white-space: pre-wrap; 
}

@media screen and (max-width: 600px){
  .post{
    padding: 0 1.2em;
  }
}
</style>
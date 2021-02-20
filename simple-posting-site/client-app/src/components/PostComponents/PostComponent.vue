<template>
  <div class="post-component-main">
    <textarea type="text" id="create-post" v-model="text" placeholder="Say something..."></textarea>
    <div class="post-attatchments-preview" v-if="this.url.length">
      <div 
        class="image-attatchments-preview"
        v-for="(item, index) in this.url"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="index"
      > 
        <i @click="removeSelectedAttatchments(index)" class="fas fa-times"></i>       
        <img v-bind:src="item"><br>
        
      </div>
      
    </div>
    <div class="post-actions">
      <div class="post-attatchments-actions">
        <label class="media-input-container">
          <h5><i class="far fa-images"></i></h5>
          <input 
            type="file" 
            id="media-input" 
            ref="mediaupload" 
            @change="setImage" 
            accept="image/gif,image/jpeg,image/webp,image/png,video/mp4,video/quicktime,video/webm"
            multiple
          >
        </label>
      </div>     
      
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

export default {
  name: 'PostComponent',
  computed: mapGetters(['postLoadingStates','currentUser']),
  data(){
    return{
      text: '',
      posting: false,
      errorMsg: '',
      url: [],
      attatchments: null
    }
  },
  methods: {
    createPost(){
      this.$store.dispatch('createPost', {text: this.text, user: this.currentUser, media:this.attatchments})
      this.text = ''
      this.url = []
      this.attatchments=[]
    },
    
    setImage(){          
      const _validFileExtensions = ["gif","jpg", "webp", "jpeg", "png","mp4","mov"];    
      const file = this.$refs.mediaupload.files;  
      
      if((file.length + this.url.length) <= 4){
        file.forEach((item) => {
          var ext =  item.name.split('.').pop();         
          if(_validFileExtensions.includes(ext.toLowerCase())){
            this.url.push(URL.createObjectURL(item));                   
          }
          else{
            this.errorMsg = 'The file you uploaded is not supported...'
            this.$refs.mediaupload.value=null
          }     
        });
        this.errorMsg = ''
        this.attatchments = file
      }
      else if((file.length + this.url.length) > 4){
        this.errorMsg = 'Only up to 4 images are allowed'     
      }        
    },

    removeSelectedAttatchments(index){
      this.url.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.post-attatchments-preview{
  display: flex;
  justify-content: flex-start;
}
.post-attatchments-preview img{
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid #ddd;
  object-fit: cover;
  margin: 0 12px 12px 0;
}

.image-attatchments-preview > i{
    color: white;
    float: left;
    background-color: #303030;
    padding: 5px;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    opacity: 1;
    cursor: pointer;
    position: absolute;
}

.post-actions{
  display: flex;
  justify-content: space-between;
}

.media-input-container{
  height: 40px;
  width: 40px;
  border: 2px solid #42b983;
  color: #42b983;
  border-radius: 50%;
  padding-top: 8px;
  cursor: pointer;
}

#media-input{
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
@media screen and (max-width: 600px){
  .post-component-main{
   padding: 0 10px;
 }
}

@media screen and (max-width: 560px){ 

  .post-attatchments-preview{
    overflow-x: scroll;
  }

 .post-attatchments-preview img{
   margin: -1em 12px 12px 0;
 }

 .image-attatchments-preview > i{
   position: relative;
 }
}
</style>

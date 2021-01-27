<template>
    <div class="post-update-comp">
       <div class="component-card">   
           <div class="element-wrapper">        
                <h1>Update Post</h1>           
                <textarea type="text" id="create-post" v-model="newText"></textarea>
                <div class="action-container">
                    <button :disabled="loadingStates.updatingPost || !newText || (newText == this.post.text)" class="btn-update" @click="editPost">
                        <i class="fa fa-spinner fa-spin" v-if="loadingStates.updatingPost"></i>
                        {{btnUpdateText}}
                        </button>
                    <button :disabled="loadingStates.updatingPost" class="btn-cancel" @click="$emit('update-modal-closed')">Cancel</button>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
// import PostService from '../services/PostService'
// import { EventBus } from '../event-bus.js';
import { mapActions, mapGetters } from 'vuex'

export default {
    props: ['post'],
    computed: mapGetters(['loadingStates']),
    data(){
        return{
            newText: '',
            btnUpdateText: 'Update',
        }
    },
    methods: {
        ...mapActions(['updatePost']),

        editPost(){
          
          const updatedPost = {
            id: this.post._id,
            text: this.newText
          }

          this.updatePost(updatedPost);          
          this.$emit('update-modal-closed');
        }
    },
    created(){
        this.newText = this.post.text
    }
}
</script>

<style scoped>
 @import '../../assets/styles/styles.css';

h1{
    font-weight: bold;
}

.post-update-comp{
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.component-card{
    position: absolute;
    z-index: 9999;
    border-radius: 1em;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 300px;
    width: 50vw;    
    background-color: white;
    padding: 1em;
}

.element-wrapper{
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
}

textarea{
  width: 90%;
}

.btn-update{
  color: white;
  background-color: #42b983;
}


@media screen and (max-width: 992px){
  .component-card{
    width: 80%;
  }
}

@media screen and (max-width: 440px){
  
  h1{
      font-size: 2.1em;
  }

  .component-card{
    height: 350px;
  }

  textarea{
      height: 130px;
      width: 80%;
  }
}
</style>
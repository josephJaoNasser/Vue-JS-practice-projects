<template>
    <div class="post-update-comp">
       <div class="component-card">   
           <div class="element-wrapper">        
                <h1>Update Post</h1>           
                <textarea type="text" id="create-post" v-model="newText"></textarea>
                <div class="action-container">
                    <button :disabled="updating" class="btn-update" @click="updatePost">
                        <i class="fa fa-spinner fa-spin" v-if="updating"></i>
                        {{btnUpdateText}}
                        </button>
                    <button :disabled="updating" class="btn-cancel" @click="$emit('update-modal-closed')">Cancel</button>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
import PostService from '../PostService'
import { EventBus } from '../event-bus.js';

export default {
    props: ['post'],
    data(){
        return{
            newText: '',
            btnUpdateText: 'Update',
            updating: false
        }
    },
    methods: {
        async updatePost(){
            if(this.newText != this.post.text){
                try{
                this.updating =true
                this.btnUpdateText = 'Updating...'
                await PostService.updatePost(this.newText, this.post.id)
                this.$emit('update-modal-closed')
                this.$emit('post-updated')
                EventBus.$emit('post-updated')
                
                }catch(err){
                    console.log(err)
                }
            }
            else{
                this.$emit('update-modal-closed')
            }
            
        }
    },
    created(){
        this.newText = this.post.text
    }
}
</script>

<style scoped>

h1{
    font-weight: bold;
}

button:disabled{
  opacity: .5!important;
}

.post-update-comp{
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
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
  padding: 1em;
  border: none;
  border-radius: 1em;
  background: #efefef;
  margin: 10px auto;
  font-size: 16px;
  width: 90%;
  height: 100px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  resize: none;
}

textarea:focus{
  outline: none;
}

button{
    font-weight: bold;
    font-size: 1em;
    padding: 1em 3em;
    border: none;
    border-radius: 4em;
    margin: 0 8px ;
}

button:focus{
    outline: none;
}

button:hover{
    cursor: pointer;
    opacity: 0.8;
}

.btn-update{
  color: white;
  background-color: #42b983;
}

.btn-cancel{
    background-color: transparent;
    color: #444;
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
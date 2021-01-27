<template>
   <div class="delete-modal-main-div">
     <div class="component-card absolute-center">
        <h5 class="font-weight-bold">Delete post?</h5>
        <p>
           Are you sure you want to delete this post? You can't undo this action.
        </p>
        <button class="red" @click="deletePost">Delete</button>
        <button class="btn-cancel" @click="$emit('delete-modal-closed')">Cancel</button>
     </div>
   </div>
</template>

<script>
export default {
  props:['post'],
  methods: {
      deletePost(){
        this.$store.dispatch('deletePost',this.post._id).then(this.$emit('delete-modal-closed'))
      }
   },
}
</script>

<style scoped>
 @import '../../assets/styles/styles.css';

.delete-modal-main-div{
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.component-card{
    z-index: 9999;
    border-radius: 1em;    
    width: 25vw;    
    background-color: white;
    padding: 1em 1.5em;
}

@media screen and (max-width: 992px){
  .component-card{
    width: 70%;
  }
}
</style>
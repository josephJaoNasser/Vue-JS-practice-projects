<template>
  <div class="post-attatchments-preview">
    <div 
      class="image-attatchments-preview"
      v-for="(item, index) in this.url"
      v-bind:item="item"
      v-bind:index="index"
      v-bind:key="index"
    > 
      <i @click="removeSelectedAttatchments(index)" class="fas fa-times"></i>       
      <img v-bind:src="item">
      
    </div>      
  </div>
    
</template>

<script>
export default {
  props: {
    url: Array,
    attatchments: Array
  },
  methods: {   
    removeSelectedAttatchments(index){
      this.url.splice(index, 1)
      this.attatchments.splice(index,1) 
    }
  },
}
</script>

<style>
.post-attatchments-preview{
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
}

.post-attatchments-preview img{
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid #ddd;
  object-fit: cover;
  margin: 0 12px 12px 0;
}

.image-attatchments-preview{
  display: inline-flex;
  flex-direction: column;
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

@media screen and (max-width: 560px){ 

 .post-attatchments-preview img{
   margin: -1em 12px 12px 0;
 }

 .image-attatchments-preview > i{
   position: relative;
 }
}

</style>
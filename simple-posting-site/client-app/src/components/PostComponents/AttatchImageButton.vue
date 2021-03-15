<template>
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
</template>

<script>
export default {
  methods: {
    setImage(){         
      let attatchments = []
      let url = []   
      let errorMsg = ''   
      const _validFileExtensions = ["gif","jpg", "webp", "jpeg", "png"];    
      const file = this.$refs.mediaupload.files;  
      
      if((file.length + url.length) <= 4){
        file.forEach((item) => {
          var ext =  item.name.split('.').pop();         
          if(_validFileExtensions.includes(ext.toLowerCase())){
            url.push(URL.createObjectURL(item));    
          }
          else{
            url = []
            this.$refs.mediaupload.value=null
            errorMsg = 'The file you uploaded is not supported...'
            this.$emit('img-attatchment-error', errorMsg) 
          }     
        });

        if(!errorMsg){
          errorMsg = ''
          attatchments = attatchments.concat(Array.from(file)) 
          this.$emit('images-attatched', {url: url, attatchments: attatchments})
        }
        
      }
      else if((file.length + url.length) > 4){
        errorMsg = 'Only up to 4 images are allowed'    
        this.$emit('image-attatchment-error', errorMsg) 
      }                      
    },
  },
}
</script>

<style>
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
</style>
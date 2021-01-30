<template>
  <div class="profile-image-uploader">
      <div class="profile-image-preview" v-bind:style="{ 'background-image': 'url(' + url + ')' }"></div>
      <div class="profile-image-input">
         <input 
            type="file" 
            ref="imageupload" 
            name="profile-image" 
            @change="setImage" 
            accept="image/x-png  ,image/jpeg"
            v-bind:class="{'input-error': this.error}" 
         />
         <div v-if="(this.error)" style="margin-top: 8px">
            <p class="error">{{this.error}}</p>
         </div>
         <button class="green" @click="uploadImage">Upload</button>    
      </div>  
          
   </div>
</template>

<script>
export default {
   data() {
      return {
         url: null,
         profileImage: null,
         error: null
      }
   },
   methods: {
      uploadImage(){
         if(this.profileImage){
            this.error = null
            const formData = new FormData()
            formData.append('profile-image', this.profileImage)
            this.$store.dispatch('uploadProfileImage',formData)
         }
         else{
            this.error = 'Please upload jpeg/jpg or png file!'
         }     
      },
      setImage(){  
         const _validFileExtensions = ["jpg", "jpeg", "png"];    
         const file = this.$refs.imageupload.files[0];         
         if(file){  
            var ext =  file.name.split('.').pop();         
            if(_validFileExtensions.includes(ext)){
               this.error = null
               this.url = URL.createObjectURL(file);
               this.profileImage = file;
            }
            else{
               this.error = 'Please upload jpeg/jpg or png file!'
               this.$refs.imageupload.value=null
            }            
         }
         else{
            this.url = null
         }
         
      }
   },
}
</script>

<style>
.profile-image-uploader{
   margin-bottom: 1em;
   display: flex;
}

.profile-image-preview{
   height: 200px;
   width: 200px;
   border: 2px dashed #ccc;
   border-radius: 50%;
   margin: 1.2em 0;
   background-size: cover;
   background-repeat: no-repeat;
   background-position: center;
}

.profile-image-input{
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin-left: 1.2em;
   outline: none!important;;
   float:left
}

.profile-image-input > input{
   border-radius: 50px;
   padding: 1em;
   outline: none;
}

@media screen and (max-width: 600px) {
   .profile-image-preview{
      height: 150px;
      width: 150px;
      margin: 1em auto;
   }
   .profile-image-uploader{
      display: flex;
      flex-direction: column;
      /* padding: 1em;
      border: 2px dashed #ccc;
      border-radius: 50px; */
   }
}
</style>
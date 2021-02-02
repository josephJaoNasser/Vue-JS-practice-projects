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
            v-bind:class="{'input-error': (this.userErrors.field=='profileImage')}" 
         />
         <div v-if="(this.userErrors.field=='profileImage')" style="margin-top: 8px">
            <p class="error">{{this.userErrors.msg}}</p>
         </div>
      </div>  
          
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {   
   data() {
      return {
         url: null
      }
   },
   computed: mapGetters(['userErrors']),
   methods: {
      setImage(){          
         //console.log(this.$store.state.userErrors)
         const _validFileExtensions = ["jpg", "jpeg", "png"];    
         const file = this.$refs.imageupload.files[0];         
         if(file){  
            var ext =  file.name.split('.').pop();         
            if(_validFileExtensions.includes(ext.toLowerCase())){
               this.url = URL.createObjectURL(file);               
               this.$emit('profile-image-updated',file)
            }
            else{
               this.userErrors = {
                  field: 'profileImage',
               }
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

@media screen and (max-width: 620px) {
   .profile-image-preview{
      height: 150px;
      width: 150px;
      margin: 1em auto;
   }
   .profile-image-uploader{
      display: flex;
      flex-direction: column;
   }
}
</style>
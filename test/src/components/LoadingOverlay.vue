<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading"
        :loader="'bars'"
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"
        :transition="'fade'"></loading>
        
    </div>
</template>
 
<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    
    export default {
        name: 'LoadingOverlay',
        data() {
            return {
                isLoading: false,
                fullPage: true
            }
        },
        components: {
            Loading
        },
        methods: {
            doAjax() {
                this.isLoading = true;
                // simulate AJAX
                setTimeout(() => {
                  this.isLoading = false
                },5000)
            },
            onCancel() {
              console.log('User cancelled the loader.')
            },
            cancel(){
                this.isLoading = false;
            }
        }
    }
</script> 
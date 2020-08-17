<template>
    <v-app class="interact-main-container">
        <VisibilityEx />
          
    </v-app>
</template>

<script>
import VisibilityEx from './Visibility'
export default {
    name: "InteractionContainer",
    components:{
        VisibilityEx
    }
}
</script>

<style scoped>
    .interact-main-container{
        background-color: #ddd;
        padding: 1em;
        border-radius: 5px;
    }

</style>
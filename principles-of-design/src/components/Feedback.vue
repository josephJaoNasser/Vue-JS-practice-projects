<template>
    <div class="feedback-interactions" >
        <v-btn class="mb-5" @click="isHidden=!isHidden">Push my buttons baby</v-btn>
        <br>
        <transition name="scale-transition">
            <span v-if="!isHidden"> Yamete kudastop </span>
        </transition>
    </div>
    
    
</template>

<script>

export default {
    name: "Feedback",
    data(){
        return{
            isHidden: true
        }
    }
}
</script>

<style scoped>
.feedback-interactions{
    background-color: rgba(0, 0, 0, .3);
    color: white;
    padding: 2em;
    border-radius: 10px;
    top: 50%;
}
</style>
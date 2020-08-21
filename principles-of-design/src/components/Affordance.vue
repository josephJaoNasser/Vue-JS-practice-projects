<template>
    <div class="affordance-interactions">
        <h2 class="mb-2">What does this thing do?</h2>
        <v-text-field
            label="What is my purpose in life..."
            outlined
            :dark="true"
        ></v-text-field>
    </div>
    
    
</template>

<script>

export default {
    name: "Affordance",
}
</script>

<style scoped>
.affordance-interactions{
    background-color: rgba(0, 0, 0, .3);
    color: white;
    padding: 2em;
    border-radius: 10px;
    top: 50%;
}
</style>
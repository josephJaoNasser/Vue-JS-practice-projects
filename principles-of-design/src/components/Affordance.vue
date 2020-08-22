<template>
    <div class="affordance-interactions">
        <v-card class="py-4 px-5">
            <v-card-title class="px-1">What does this thing do?</v-card-title>
            <v-text-field
                label="What is my purpose in life..."
            ></v-text-field>
        </v-card>
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
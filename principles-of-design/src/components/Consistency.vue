<template>
    <div class="consistency-interactions">
        <v-card class="pa-5">
            <v-card-title class="blue--text">Stuff you can interact with:</v-card-title>
           
            <v-text-field
            label="You know what i do..."
            ></v-text-field>
            <v-container layout>
                <v-switch class="mx-6"
                label="I am a switch"
                ></v-switch>

                <v-checkbox class="mx-5"
                label="I am a checkbox"></v-checkbox>
            </v-container>

            <v-card-title>BAD EXAMPLES</v-card-title>
            <v-container layout>
                <v-btn class="mx-2" color="red" dark>SUBMIT</v-btn>
                <v-btn  class="mx-2" color="green" dark>SUBMIT</v-btn>
                <v-btn  class="mx-2" color="blue" dark >SUBMIT</v-btn>
                <v-btn  class="mx-2" color="green" dark >CANCEL</v-btn>
            </v-container>
            

            <v-card-title class="blue--text">Signs and symbols:</v-card-title>
            <v-container>
                <v-icon class="mx-1">far fa-times-circle</v-icon>
                <v-icon class="mx-1">fas fa-bars</v-icon>
                <v-icon class="mx-1">fas fa-download</v-icon>
                <v-icon class="mx-1">far fa-heart</v-icon>
                <v-icon class="mx-1 red--text text--lighten-1">fas fa-heart</v-icon>
                <v-icon class="mx-1">far fa-thumbs-up</v-icon>
                and many more!
            </v-container>
        </v-card>
    </div>
    
    
</template>

<script>

export default {
    name: "Consistency",
}
</script>

<style scoped>
.consistency-interactions{
    background-color: rgba(0, 0, 0, .3);
    color: white;
    padding: 2em;
    border-radius: 10px;
    top: 50%;
}
</style>
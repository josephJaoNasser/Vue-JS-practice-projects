<template>
    <v-app class="info-main-container">
        <v-card  class="info-card" >
            <v-carousel 
            :light="true"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            :continuous="false">
                <v-carousel-item class="info-carousel-item" v-bind:key="p.id" v-for="p in thePrinciples"> 
                    <v-icon class="mb-5 principle-icon">{{p.icon}}</v-icon>
                    <v-card-title class="principle">
                        <b>{{p.principle}}</b>
                    </v-card-title>
                    <v-card-text class="principle-desc text-left regular-text">
                        {{p.description}}
                    </v-card-text>
                    <br>
                    <v-btn v-if="p.id % 1==0" color="success" @click="showEx(p.id)">Show Example</v-btn>
                </v-carousel-item>
            </v-carousel>
        </v-card>
    </v-app>
</template>

<script>

import Principles from '../assets/principles.json'
import { EventBus } from '../event-bus.js';

export default {
    name: "InformationContainer",
    
    data(){
        return{
            thePrinciples: Principles
        }
    },

    methods: {
        showEx(principleKey){
            EventBus.$emit('exampleTrigger',principleKey);
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Alata&family=Frank+Ruhl+Libre:wght@900&display=swap');
    .info-carousel-item{
        padding: 2em
    }

    .info-main-container{
        background-color: #ddd;
        border-radius: 5px;
    }
    .regular-text{
        font-family: 'Alata', sans-serif;
        line-height: 1.2em;
        font-size: 1.3em;
        color:#333
    }

    .principle{
        font-family: 'Frank Ruhl Libre', serif;
        font-size: 3em;
        color:#015fa9;
        width: 90%;
        margin: 0 auto;
    }

    .principle-icon{
        font-size: 7em!important;
    }

    .principle-desc{
        max-height: 200px;
        overflow-y: auto;
        width: 90%;
        margin: 0 auto;
    }

    /* width */
    .principle-desc::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    .principle-desc::-webkit-scrollbar-track {
    background: rgb(182, 182, 182);
    border-radius: 30px;
    }

    /* Handle */
    .principle-desc::-webkit-scrollbar-thumb {
    background: #015fa9;
    border-radius: 30px;
    }

    /* Handle on hover */
    .principle-desc::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

</style>
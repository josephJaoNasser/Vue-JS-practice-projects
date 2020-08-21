<template>
    <v-app class="interact-main-container">
        <h1>Example:</h1>
        <transition-group name="slide-x-transition" >
            <Visibility  v-if="exampleShown == 1" :key="1"/>
            <Feedback  v-if="exampleShown == 2" :key="2"/>
            <Affordance  v-if="exampleShown == 3" :key="3"/>
            <Mapping  v-if="exampleShown == 4" :key="4"/>
            <Constraints  v-if="exampleShown == 5" :key="5"/>
            <Consistency  v-if="exampleShown == 6" :key="6"/>
        </transition-group>
          
    </v-app>
</template>

<script>
import { EventBus } from '../event-bus.js';
import Visibility from './Visibility';
import Feedback from './Feedback';
import Affordance from './Affordance';
import Mapping from './Mapping';
import Constraints from './Constraints';
import Consistency from './Consistency';

export default {
    name: "InteractionContainer",
    components:{
        Visibility,
        Feedback,
        Affordance,
        Mapping,
        Constraints,
        Consistency
    },
    data(){
        return{
            exampleShown: 0
        }
    },
    created(){
        EventBus.$on('exampleTrigger',principleKey => {
                this.exampleShown = principleKey
            });
    }
    
}


</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Alata&family=Frank+Ruhl+Libre:wght@900&display=swap');

    .interact-main-container{
        background-color: #ddd;
        padding: 1em;
        border-radius: 5px;
    }

    h1{
        font-family: 'Frank Ruhl Libre', serif;
        color: white;
        
    }

</style>
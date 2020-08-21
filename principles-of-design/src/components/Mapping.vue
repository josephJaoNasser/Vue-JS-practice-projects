<template>
    <div class="mapping-interactions">
        <v-card class="my-3 pa-5" :dark="!switchA">
            <v-switch
            v-model="switchA"
            :label="labelSwitch(switchA)"
            ></v-switch>
        </v-card>
        <v-card class="my-3 pa-5" :dark="!switchB">
            <v-switch
            v-model="switchB"
            :label="labelSwitch(switchB)"
            ></v-switch>
        </v-card>
    </div>
    
    
</template>

<script>

export default {
    name: "Mapping",
    data(){
        return{
            switchA: false,
            switchB: false
        }
    },
    methods: {
        labelSwitch(sw){
            var label;
            if(sw){
                label = 'I am so turned on right now';
            }
            else{
                label = 'Turn me on';
            }
            return label;
        }
    }
}
</script>

<style scoped>
.mapping-interactions{
    background-color: rgba(0, 0, 0, .3);
    color: white;
    padding: 2em;
    border-radius: 10px;
    top: 50%;
}
</style>
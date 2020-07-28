<template>
    <div class="todos-main-div">
        <div v-bind:key="t.id" v-for="t in todos_main">

            <!-- this is a for loop. don't forget that "todos_main" is now called "t" -->
            <Item v-bind:listItem="t" v-on:item-deleted="$emit('item-deleted',t.id)"/>

        </div>
    </div>
    
</template>

<script>
import Item from './Item';

export default {
    name:"Todos",
    props: ["todos_main"], /*
                            NOTES:

                            This is used so that other files can call this component.
                            Make sure this and the v-bind from the file calling this component has the same name
                        */
    components:{
        Item
    }
}
</script>

<style scoped>
    .todos-main-div{
        width: 960px;
        margin: 0px auto;
    }
</style>
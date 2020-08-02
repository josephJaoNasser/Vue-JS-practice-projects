<template>
    <div class="todo-item" v-bind:class="{'is-complete':listItem.completed}">
        <!--
             NOTES:
             
             v-bind:class

             USAGE:
             Conditionally adds a class
             v-bind can also be bound to any html attribute such as "checked" for checkboxes

             SYNTAX:            
            v-bind:class = "{'CLASS TO BE ADDED': the condition, ...}"       
        -->

        
        <div>            
            <h1>{{listItem.title}}</h1>
            <div class="checkbox-div">
                 <!--
                    NOTES:                  
                    
                    Events 
                    
                    USAGE:
                    - logs an action.
                    - can contain data (sugh as IDs) as payload

                    SYNTAX:
                    $emit('event-name',payload)
                    
                -->
                <div>
                    Completed:<input type="checkbox" v-on:change="markComplete" v-bind:checked="listItem.complete" @click="$emit('marked-complete',listItem.id)"> 
                </div>                               
            </div>
        </div>
        <button @click="$emit('item-deleted',listItem.id)" class="delete-button">X</button>
    </div>
</template>




<script>
export default 
{
    name:"Item",
    props: ["listItem"],
    methods:
    {       
        
        markComplete()
        {
            this.listItem.completed = !this.listItem.completed;    
            
        }
    }
}
</script>




<style scoped>
    .todo-item{
        color:white;
        background-color: #202020;
        padding:2em;
        margin: 2em;
        border-radius: 10px;
    }

    .is-pending{
        background-color: wheat;
        color: #222;
    }

    .is-complete{
        background-color: green;
    }

    .checkbox-div div{
        margin: 10px 0 10px
    }

    .delete-button{        
        float: right;
        border: none;
        height: 50px;
        width: 50px;
        border-radius: 100%;
        padding: 1.5em;
        background-color: maroon;
        color: white;
        cursor: pointer;
    }

    .delete-button:focus{
        outline: none;
    }

</style>
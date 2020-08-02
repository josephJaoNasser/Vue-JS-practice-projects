<template>
    <div class="add-item-container">
        <h1>Add Todo</h1>
        <form @submit="addTodo">
             <!-- 
            NOTES:

                v-model
            -->
            <input type="text" name="title" v-model="title" placeholder="Do groceries...">
            <input type="submit" value="Submit" class="btn">
            
        </form>
    </div>    
</template>

<script>
//import { v1 as uuid } from 'uuid';

export default 
{
    name: 'AddItem',
    data() {
        return{
            title: ''
        }
    },

    methods: 
    {
        addTodo(e)
        {
            e.preventDefault();
            const newTodo = 
            {
                //id: uuid(),
                title: this.title,
                completed: false
            }

            this.$emit('item-added', newTodo);
            this.title = '';
        }
    }
}
</script>

<style scoped>

.add-item-container
{
    background-color: #ddd;
    padding: 2em;
}

.add-item-container form
{
    margin-top: 10px;
}


input[type=text],
input[type=submit]
{
    padding: 10px;
    font-size: 16px;
    border: none;
    margin: 5px;
}

input[type=submit]
{
    background-color: green;
    color: white
}

</style>
<template>
  <div id="app">
    <!-- 
      NOTES:

        v-bind syntax:

          v-bind:name of data being imported into this file / data in / prop   =   "data to be sent to the incoming file / data out"

          example:

          v-bind:todos = "todos_arr"
          Wherein this file imports the "todos" prop, while sending the data from the "todos_arr" 
    -->
    <LoadingOverlay ref="loaderOverlay"/>
    <AddItem v-on:item-added="addItem"/>
    <Todos v-bind:todos_main="todos_arr" v-on:item-deleted="deleteTodo"/>
   

  </div>
</template>

<script>
import Todos from '../components/Todos';
import AddItem from '../components/AddItem';
import LoadingOverlay from '../components/LoadingOverlay';
import axios from 'axios';


export default {
  name: 'Home',
  components: {
    Todos,
    AddItem,
    LoadingOverlay 
  },
  data(){
    return{
      todos_arr: []
    }
  },

  methods:{
    /*
      NOTES:

      Filter - filters out items in an array and returns it based on the condition given. This works the same way as a for loop.
             - in this instance, it returns every item that hasn't been deleted (based on the ID)
                - upon emitting the 'item-deleted' event, the ID of the deleted item is sent to this function. Based on the condition below, we could say that
                  the filter returns everything except the deleted ID.  

      SYNTAX:

      this.array_name = this.array_name.filter(x = (condition))

       */
    deleteTodo(id)
    { 
      this.$refs.loaderOverlay.doAjax();
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}
      `).then(() => this.todos_arr = this.todos_arr.filter(t => t.id !== id)).then(() => this.$refs.loaderOverlay.cancel())
        .catch(error => console.log(error));
      
    },

    addItem(newItem)
    {
      const {title, completed} = newItem;
      
      axios.post('https://jsonplaceholder.typicode.com/todos',{
        
        title,
        completed

      }).then(res => this.todos_arr = [...this.todos_arr, res.data]).catch(error => console.log(error));

      
    },

    
    
  },

  created()
  {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.todos_arr = res.data).catch(error => console.log(error))
  }
}
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body
  {
    font-family: Avenir, Helvetica, Arial, sans-serif;    
  }
</style>

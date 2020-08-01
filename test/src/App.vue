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
    <Todos v-bind:todos_main="todos_arr" v-on:item-deleted="deleteTodo"/>
  </div>
</template>

<script>
import Todos from './components/Todos';

export default {
  name: 'App',
  components: {
    Todos    
  },
  data(){
    return{
      todos_arr: [
      {
        id: 1,
        title: 'Learn Vue',
        completed: false
      },
      {
        id: 2,
        title: 'Be good at Vue',
        completed: false
      },
      {
        id: 3,
        title: 'Master Vue',
        completed: false
      }
    ]}
  },

  methods:{
    deleteTodo(id){
      this.todos_arr = this.todos_arr.filter(todos_arr => todos_arr.id !== id)
    }
  }
}
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body{
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
</style>

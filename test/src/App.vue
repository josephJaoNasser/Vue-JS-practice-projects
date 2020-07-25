<template>
  <div id="app">
    <!-- 
      
      v-bind syntax:

        v-bind:(name of the thing you wanna pass) 
            ="(the data in the script you wanna bind)"

        example:

        v-bind:todos = "todos_arr"

    -->
    <Todos v-bind:todos="todos_arr"/>
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
        title: 'ey',
        completed: false
      },
      {
        id: 2,
        title: 'yo',
        completed: true
      },
      {
        id: 3,
        title: 'aye',
        completed: true
      }
    ]}
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

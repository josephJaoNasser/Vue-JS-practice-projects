<template>
  <div id="app">
    <MainHeader />
    
    <router-view/>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader';

export default {
  name: 'app',
  components: {
    MainHeader
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #52585e;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: white;
  padding: 5px 15px
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

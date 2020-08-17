<template>
    <div class="main-header">
        <h1>Reminders</h1>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about" >About</router-link>
        </div>
    </div>
</template>


<script>
export default {
    
}
</script>


<style scoped>
    .main-header{
        width: 100%;
        background-color: #222;
        padding: 1em;
        color: white;
        -webkit-box-shadow: 2px 3px 17px -5px rgba(0,0,0,0.79);
        -moz-box-shadow: 2px 3px 17px -5px rgba(0,0,0,0.79);
        box-shadow: 2px 3px 17px -5px rgba(0,0,0,0.79);
    }
    .main-header a{
        text-decoration: none;
    }

    .nav{
        background-color: white;
    }
</style>
<template>
    <div class="main-div">
        <div v-bind:key="t.id" v-for="t in todos">
            <h3>{{t.title}}</h3>
        </div>
    </div>
    
</template>

<script>
export default {
    name:"Todos",
    props: ["todos"]
}
</script>

<style scoped>

</style>
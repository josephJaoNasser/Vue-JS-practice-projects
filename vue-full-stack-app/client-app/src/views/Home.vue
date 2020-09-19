<template>
  <div class="post-component-container">
    <PostComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue'

export default {
  name: 'Home',
  components: {
    PostComponent
  }
}
</script>

<style scoped>
.post-component-container{
  width: 50vw;
  margin: 0 auto;
}
</style>
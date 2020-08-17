<template>
  <div class="home-main">
    <div class="presentation-area">
      <InfoCont />
      <InteractCont />
    </div>
    
  </div>
</template>

<script>
import InfoCont from '../components/InformationContainer'
import InteractCont from '../components/InteractionContainer'
export default {
  name: "Home",
  components: {
    InfoCont,
    InteractCont
  }
}
</script>

<style scoped>
  .presentation-area{
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    padding: 0 2em;
  }
</style>
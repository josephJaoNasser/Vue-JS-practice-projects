<template>
  <div class="presentation-main">      
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
            <div class="presentation-area">
              <InfoCont />
              <InteractCont />
          </div>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import InfoCont from '../components/InformationContainer'
import InteractCont from '../components/InteractionContainer'
export default {
  name: "PresentationMain",
  components: {
    InfoCont,
    InteractCont
  }
}
</script>

<style scoped>

  .presentation-main
  {
    padding-top: 5em;
  }

  .presentation-area{
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    padding: 0 2em;
  }
</style>
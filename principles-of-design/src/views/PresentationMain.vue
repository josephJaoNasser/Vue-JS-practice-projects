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
    <router-link to="/">Done</router-link>    
    
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

  a{
    text-decoration: none;
    color: white!important;
  }

  .presentation-main
  {
    padding-top: 4em;
  }

  .presentation-area{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2em;
  }
</style>
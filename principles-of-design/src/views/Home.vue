<template>
  <div class="home-main">
    <v-app>
      <v-main>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
            >
              <h1 >Norman's 6 principles of design</h1>
               <p class="font-weight-thin my-5">A brief presentation by Jay Nasser</p>
              <router-link to="/Norman">
                <v-btn class="h1">Let's go!</v-btn>
              </router-link>
             
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Home",
}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Alata&family=Frank+Ruhl+Libre:wght@900&display=swap');
  
  h1{
    font-family: 'Frank Ruhl Libre', serif;
    font-size: 5em;
    line-height: 1em;
    color: white;
  }

  p{
    color: white;
  }

  .home-main a{
    color: black;
    text-decoration: none;
  }
</style>
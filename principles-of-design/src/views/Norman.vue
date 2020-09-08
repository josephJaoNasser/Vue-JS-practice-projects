<template>
  <div class="home-main" >
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
              sm="5">
                 <v-img 
                    class="rounded-circle norman-img"
                    src="https://media.nngroup.com/media/people/photos/DonNorman2003-3.jpg.600x600_q75_autocrop_crop-smart_upscale.jpg"
                    height="200"
                    width="200"
                    >
                    
                 </v-img>
            </v-col>
            <v-col
              cols="12"
              sm="8"
            >
              <v-container class="text-left">
                  <h1>Donald Arthur Norman</h1>
                  <p>An American researcher, professor, and author. Norman is the director of The Design Lab at University of California, San Diego.
                      He is best known for his books on design, especially <mark class="px-1">The Design of Everyday Things</mark>. He is widely regarded for his <mark class="px-1">expertise in the fields of design, usability engineering, and cognitive science.</mark>
                      Much of Norman's work involves the advocacy of user-centered design. His books all have the underlying purpose of furthering the field of design, from doors to computers.
                  </p>
              </v-container>
             <router-link to="/PresentationMain">
                <v-btn class="h1"
                floating>Next</v-btn>
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
    font-size: 4em;
    margin-bottom: 15px;
    line-height: 1em;
    color: white;
  }

  mark{
      background-color:rgb(241, 214, 60);
  }

  .norman-img{
      padding:2em;
      border: 2px dashed #fff
  }

  p{
    color: white;
  }

  .home-main a{
    color: black;
    text-decoration: none;
  }
</style>
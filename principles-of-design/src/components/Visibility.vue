<template>
    <div class="visibility-interactions">
        <v-btn class="mb-3">I am here</v-btn><br>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="mx-3">fas fa-list</v-icon>
              What else?</v-btn>
            </template>

            <v-list class="text-left">
              <v-list-item class="list-item">
                <v-list-item-title>What lies here</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>is more than </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>what meets the eye</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </div>
    
    
</template>

<script>

export default {
    name: "Visibility",
}
</script>

<style scoped>
.visibility-interactions{
    background-color: rgba(0, 0, 0, .3);
    padding: 2em;
    border-radius: 10px;
    top: 50%;
}
</style>
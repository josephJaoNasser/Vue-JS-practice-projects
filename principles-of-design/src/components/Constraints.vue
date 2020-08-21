<template>
    <div class="constraints-interactions">
        <v-container>
            <v-btn dark color="error" disabled>U can't press me</v-btn>
        </v-container>

        <v-dialog
        v-model="dialog"
        width="300"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="error"
                dark
                v-bind="attrs"
                v-on="on"
                >
                Don't even try to press me
                </v-btn>
            </template>

            <v-card>
                <v-card-title >
                    <v-icon color="red" style="margin:0 auto" size="70">fas fa-times</v-icon>
                    <br>
                    <v-card-text>no..</v-card-text>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                    >
                        I accept the rejection
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
    
    
</template>

<script>

export default {
    name: "Constraints",
    data(){
        return{
            dialog: false
        }
    }
}
</script>

<style scoped>
.constraints-interactions{
    background-color: rgba(0, 0, 0, .3);
    color: white;
    padding: 2em;
    border-radius: 10px;
    top: 50%;
}
</style>
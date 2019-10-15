<template>
  <v-card hover outlined tile>
    <v-card-text>
      <v-row>
        <v-col>
          <v-card
            flat
            class="mx-auto"
          >
            <v-card-title>
              Son Roy Almerol
            </v-card-title>
            <v-card-text>
              <div class="text--primary">
                10/16/2019 11:59pm
              </div><br>
              <h3>Test Location<br>
              Test Reason</h3>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            flat
            class="mx-auto"
          >
            <v-card-text>
              <div class="text--primary">
                Athlete/Perfomer: ✘<br>
                Leave alone: ✔<br>
                Late Night: ✔<br>
                Remarks:<br>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn fab color="green"><v-icon>mdi-check</v-icon></v-btn>
        <v-btn fab color="red"><v-icon>mdi-close</v-icon></v-btn>
        <v-btn fab color="blue"><v-icon>mdi-message-bulleted</v-icon></v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      show: false,
    }),
  }
</script>
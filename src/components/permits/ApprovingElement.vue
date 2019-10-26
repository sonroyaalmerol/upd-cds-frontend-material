<template>
  <v-card hover outlined tile>
    <v-card-text>
      <v-row>
        <v-col>
          <v-card flat class="mx-auto">
            <v-card-title>
              Son Roy Almerol
            </v-card-title>
            <v-card-text>
              <v-chip>
                <div class="text--primary">
                  10/16/2019 11:59pm
                </div>
              </v-chip>
              <br><br>
              <h3>Test Location<br>
                Test Reason</h3>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card flat class="mx-auto">
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
        <v-row>
          <v-col>
            <v-btn tile block color="green">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn tile block color="blue" v-on="on">
                  <v-icon>mdi-message-bulleted</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Remarks</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-textarea label="Remarks" hint="This can be seen by both the admin and the resident."
                      persistent-hint></v-textarea>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col>
            <v-btn tile block color="red">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      show: false
    }),
  }
</script>
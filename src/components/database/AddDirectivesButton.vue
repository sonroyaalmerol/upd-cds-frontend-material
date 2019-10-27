<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn tile :block="block" color="primary" v-on="on">Add Directive</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Directive</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-textarea v-model="reason" label="Details"></v-textarea>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" tile @click="dialog = false">Add Directive</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      block: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      dialog: false,
      reason: ''
    }),
  }
</script>
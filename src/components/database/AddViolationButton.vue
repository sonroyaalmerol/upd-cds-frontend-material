<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn rounded :block="block" color="primary" v-on="on">Add Violation</v-btn>
    </template>
    <v-card flat outlined>
      <v-card-title>
        <span class="headline">Add Violation</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-textarea v-model="details" label="Reason/Details"></v-textarea>
          <v-switch color="primary" v-model="isMajor" label="Major Violation"></v-switch>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" rounded @click="dialog = false">Add Violation</v-btn>
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
      details: '',
      isMajor: false
    }),
  }
</script>
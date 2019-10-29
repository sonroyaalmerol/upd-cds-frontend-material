<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="batch" rounded :block="block" color="primary" v-on="on">Batch Accountability</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add Accountability</v-btn>
    </template>
    <v-card flat outlined>
      <v-card-title>
        <span v-if="batch" class="headline">Batch Accountability</span>
        <span v-else class="headline">Add Accountability</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-textarea v-model="reason" label="Reason/Details"></v-textarea>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn rounded color="primary" @click="dialog = false">Add Accountability</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      batch: {
        type: Boolean,
        default: false
      },
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
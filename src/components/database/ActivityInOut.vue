<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="out" tile :block="block" color="primary" v-on="on">Add Out Entry</v-btn>
      <v-btn v-else tile :block="block" color="primary" v-on="on">Add In Entry</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span v-if="out" class="headline">Add Out Entry</span>
        <span v-else class="headline">Add In Entry</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field @keyup.enter.native="submitID" v-model="krhid" label="Barcode ID" required></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    components: {
    },
    props: {
      profile: {
        type: Object,
        default: null
      },
      block: {
        type: Boolean,
        default: false
      },
      out: {
        type: Boolean,
        default: false
      }
    },
    created() {
    },
    data: () => ({
      dialog: false,
      krhid: ''
    }),
    methods: {
      submitID() {
        this.krhid = ''
      }
    }
  }
</script>
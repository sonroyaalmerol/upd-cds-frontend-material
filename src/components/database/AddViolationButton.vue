<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn rounded :block="block" color="primary" v-on="on">Add Violation</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span class="headline">Add Violation</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-textarea v-model="form.details" label="Reason/Details"></v-textarea>
          <v-switch color="primary" v-model="form.isMajor" label="Major Violation"></v-switch>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" rounded @click="addViolation">Add Violation</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { addViolation } from '@/utils/ekalayapi'

  export default {
    props: {
      block: {
        type: Boolean,
        default: false
      },
      residentId: String
    },
    data: () => ({
      dialog: false,
      form: {
        details: '',
        ismajor: false,
        _resident: ''
      },
      loading: false
    }),
    methods: {
      addViolation() {
        this.form._resident = this.residentId
        this.loading = true
        addViolation(this.form).then(() => {
          this.$message('Successfully added violation!', 'success')
          this.form = {
            details: '',
            ismajor: false,
            _resident: ''
          }
          this.$emit('done')
          this.dialog = false
          this.loading = false
        })
      },
    }
  }
</script>
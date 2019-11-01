<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn rounded :block="block" color="primary" v-on="on">Add Directive</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span class="headline">Add Directive</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-textarea v-model="form.details" label="Details"></v-textarea>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" rounded @click="submit">Add Directive</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { addDirective } from '@/utils/ekalayapi'

  export default {
    props: {
      block: {
        type: Boolean,
        default: false
      },
      assistantId: String
    },
    data: () => ({
      dialog: false,
      form: {
        details: '',
        done: false,
        doneOn: null,
        _assistant: ''
      },
      loading: false
    }),
    methods: {
      submit() {
        this.form._assistant = this.assistantId
        this.loading = true
        addDirective(this.form).then(() => {
          this.$message('Successfully added directive!', 'success')
          this.form = {
            details: '',
            done: false,
            doneOn: null,
            _assistant: ''
          }
          this.$emit('done')
          this.loading = false
          this.dialog = false
        })
      },
    }
  }
</script>
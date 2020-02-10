<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="localPicker" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field rounded outlined :clearable="!disabled" v-model="computedTimeFormatted" :label="label" prepend-icon="mdi-clock" readonly v-on="on" required>
      </v-text-field>
    </template>
    <v-time-picker v-if="modal" v-model="localPicker" :disabled="disabled" full-width ampm-in-title>
      <v-spacer></v-spacer>
      <v-btn rounded text color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn rounded text color="primary" @click="$refs.dialog.save(localPicker)">OK</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
  import { format, parse } from 'date-fns'

  export default {
    props: {
      value: {
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      label: String
    },
    data() {
      return {
        modal: false,
      }
    },
    computed: {
      localPicker: {
        get() {
          return format(new Date(this.value), 'HH:mm')
        },
        set(localPicker) {
          this.$emit('input', parse(localPicker, 'HH:mm', new Date()))
        }
      },
      computedTimeFormatted () {
        return format(parse(this.localPicker, 'HH:mm', new Date()), 'hh:mm a')
      }
    }
  }
</script>
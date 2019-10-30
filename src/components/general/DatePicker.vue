<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="localPicker" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field rounded outlined clearable v-model="computedDateFormatted" :label="label" prepend-icon="mdi-calendar" readonly v-on="on" required>
      </v-text-field>
    </template>
    <v-date-picker v-model="localPicker" scrollable>
      <v-spacer></v-spacer>
      <v-btn rounded text color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn rounded text color="primary" @click="$refs.dialog.save(localPicker)">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
  import { format, parse } from 'date-fns'

  export default {
    props: {
      value: {
        required: true
      },
      label: String
    },
    data() {
      return {
        modal: false
      }
    },
    computed: {
      localPicker: {
        get() {
          return format(new Date(this.value), 'yyyy-MM-dd')
        },
        set(localPicker) {
          this.$emit('input', parse(localPicker, 'yyyy-MM-dd', new Date()))
        }
      },
      computedDateFormatted () {
        return this.formatDate(this.localPicker)
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      }
    }
  }
</script>
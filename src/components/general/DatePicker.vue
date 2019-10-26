<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="localPicker" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field v-model="localPicker" :label="label" prepend-icon="mdi-calendar" readonly v-on="on" required>
      </v-text-field>
    </template>
    <v-date-picker v-model="localPicker" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(localPicker)">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      value: {
        required: true
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
          return this.value
        },
        set(localPicker) {
          this.$emit('input', localPicker)
        }
      }
    }
  }
</script>
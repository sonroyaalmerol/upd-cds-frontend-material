<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="localPicker" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field rounded outlined v-model="localPicker" :label="label" prepend-icon="mdi-clock" readonly v-on="on" required>
      </v-text-field>
    </template>
    <v-time-picker v-if="modal" v-model="localPicker" full-width>
      <v-spacer></v-spacer>
      <v-btn rounded text color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn rounded text color="primary" @click="$refs.dialog.save(localPicker)">OK</v-btn>
    </v-time-picker>
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
<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="localShow" width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Color Picker</span>
      </v-card-title>
      <v-card-text>
        <v-color-picker v-model="$vuetify.theme.themes[theme].primary" width="600px" class="ma-2" dot-size="30"></v-color-picker>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="localShow = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localShow: {
      get() {
        return this.value
      },
      set(localShow) {
        this.$emit('input', localShow)
      }
    },
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>
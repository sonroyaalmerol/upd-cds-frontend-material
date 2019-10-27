<template>
  <v-snackbar :color="color" :timeout="3000" v-model="show" top>
    {{ message }}
    <v-btn text color="white" @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      color: 'primary',
      message: ''
    }
  },
  created: function () {
    this.emitAlert()
    this.$store.watch(state => state.app.alert, () => {
      this.emitAlert()
    })
  },
  methods: {
    emitAlert() {
      const msg = this.$store.state.app.alert
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.app.alert
        this.color = this.$store.state.app.alertType
        this.$store.dispatch('setAlert', { message: '', type: 'primary' })
      }
    }
  }
}
</script>
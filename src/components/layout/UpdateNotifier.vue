<template>
  <v-bottom-sheet v-model="updateAvailable" persistent>
    <v-sheet class="text-center" height="150px">
      <v-btn class="mt-6" text dark color="primary" @click="refreshApp">Update</v-btn>
      <div>An update is available!</div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'App',
    methods: {
      refreshApp() {
        this.$store.dispatch('setUpdateAvailable', false)
        window.location.reload(true)
      },
    },
    computed: {
      ...mapGetters([
        'updateAvailable'
      ]),
    },
    data() {
      return {
        updateExists: false
      }
    }
  }
</script>
<template>
  <v-bottom-sheet v-model="updateExists">
    <v-sheet class="text-center" height="150px">
      <v-btn class="mt-6" text dark color="primary" @click="refreshApp">Update</v-btn>
      <div>An update is available!</div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
  import { Bus } from '@/bus'

  export default {
    name: 'App',
    methods: {
      refreshApp() {
        Bus.$emit('refresh_app')
      },
    }
  }
</script>
<template>
  <v-bottom-sheet v-model="open">
    <v-sheet class="text-center" height="150px">
      <v-btn class="mt-6" text dark color="primary" @click="open = !open">close</v-btn>
      <div>You are currently
        <v-chip v-if="!status" class="ma-2" color="red" text-color="white">
          OFFLINE
        </v-chip>
        <v-chip v-else class="ma-2" color="green" text-color="white">
          ONLINE
        </v-chip>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      status: false,
      open: false
    }),
    watch: {
      networkStatus(next, prev) {
        if (prev !== null && prev != next) {
          this.open = false
          this.status = next
          this.open = true
        }
      }
    },
    computed: {
      networkStatus() {
        return this.isOnline
      }
    }
  }
</script>
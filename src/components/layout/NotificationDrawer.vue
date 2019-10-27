<template>
  <v-navigation-drawer v-if="$route.path !== '/login' && $route.path !== '/register'" v-model="localDrawer" app
    clipped right>
    <v-card hover outlined tile>
      <v-card-text>
        No notifications
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'App',
    props: {
      value: {
        required: true
      }
    },
    computed: {
      localDrawer: {
        get() {
          return this.value
        },
        set(localDrawer) {
          this.$emit('input', localDrawer)
        }
      }
    },
  }
</script>
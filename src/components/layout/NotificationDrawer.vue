<template>
  <v-navigation-drawer v-if="$route.path !== '/login' && $route.path !== '/register'" v-model="value" app
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
    }
  }
</script>
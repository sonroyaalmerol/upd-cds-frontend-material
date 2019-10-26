<template>
  <vue-pull-refresh :on-refresh="onRefresh" :config="config">
    <v-container>
      <slot />
    </v-container>
  </vue-pull-refresh>
</template>

<script>
  import VuePullRefresh from 'vue-pull-refresh'

  export default {
    components: {
      'vue-pull-refresh': VuePullRefresh
    },
    props: {
      onRefresh: Function
    },
    data: () => ({
      config: {
        errorLabel: 'Refresh error',
        startLabel: 'Pull down to refresh',
        readyLabel: 'Release to refresh',
        loadingLabel: 'Refreshing...',
        pullDownHeight: 100
      }
    })
  }
</script>
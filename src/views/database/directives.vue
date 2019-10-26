<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-alert border="right" color="blue-grey" dark>
      I'm under construction!
    </v-alert>
  </v-container-refresh>
</template>

<script>
  export default {
    methods: {
      onRefresh: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve()
          }, 1000)
        })
      }
    },
    components: {

    }
  }
</script>
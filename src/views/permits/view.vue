<template>
  <v-container-refresh :on-refresh="onRefresh">
  </v-container-refresh>
</template>

<script>

export default {
  methods: {
    onRefresh: function() {
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

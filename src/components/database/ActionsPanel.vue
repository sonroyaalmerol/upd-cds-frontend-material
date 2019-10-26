<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel :key="0">
      <v-expansion-panel-header>Actions</v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    data() {
      return {
        panel: null
      }
    },
    computed: {
      isMobileDevice() {
        return (typeof this.$windowOrientation !== "undefined") || (this.$userAgent.indexOf('IEMobile') !== -1);
      }
    },
    created() {
      this.panel = 0
      if (this.isMobileDevice) {
        this.panel = null
      }
    },
    methods: {

    },
  }
</script>
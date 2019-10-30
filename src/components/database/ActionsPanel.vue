<template>
  <v-card flat outlined class="mx-auto mb-4">
    <v-btn text block @click="panel = !panel">
      Actions<v-spacer></v-spacer>
      <v-icon>{{ panel ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>
    
    <v-expand-transition>
      <div v-show="panel">
        <v-card-text>
          <slot />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        panel: false
      }
    },
    computed: {
      isMobileDevice() {
        return (typeof this.$windowOrientation !== "undefined") || (this.$userAgent.indexOf('IEMobile') !== -1);
      }
    },
    created() {
      if (!this.isMobileDevice) {
        this.panel = true
      }
    },
    methods: {

    },
  }
</script>
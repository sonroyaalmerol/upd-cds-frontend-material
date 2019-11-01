<template>
  <div>
    <v-btn v-if="!confirm" :dark="!disabled" rounded :block="block" :color="color" @click="checkStatus" :loading="loading" :disabled="disabled">
      <slot />
    </v-btn>
    <v-tooltip v-else top :value="true">
      <template v-slot:activator="{ on }">
        <v-btn dark rounded :block="block" :color="'warning'" @click="checkStatus" v-on="on">
          <slot />
        </v-btn>
      </template>
      <span>Confirm Action</span>
    </v-tooltip>
  </div>
</template>

<script>
  export default {
    props: {
      color: String,
      block: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      confirm: false,
    }),
    methods: {
      checkStatus() {
        if (this.confirm) {
          this.confirm = false
          this.$emit('action')
        } else {
          this.confirm = true
        }
      }
    }
  }
</script>
<template>
  <div class="text-center">
    <v-btn
      v-if="!confirm"
      dark
      tile
      :block="block"
      :color="color"
      @click="checkStatus"
    >
      <slot />
    </v-btn>
    <v-tooltip v-else top>
      <template v-slot:activator="{ on }">
        <v-btn
            dark
            tile
            block
            :color="'warning'"
            @click="checkStatus"
            v-on="on"
        >
            Confirm
        </v-btn>
      </template>
      <span><slot /></span>
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
        }
    },
    data: () => ({
      confirm: false,
    }),
    methods: {
        checkStatus() {
            if(this.confirm) {
                this.confirm = false
                this.$emit('action')
            } else {
                this.confirm = true
            }
        }
    }
  }
</script>
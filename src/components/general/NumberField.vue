<template>
  <v-text-field rounded outlined v-model="localValue" type="number" :label="label" append-outer-icon="mdi-plus" @click:append-outer="increment" prepend-icon="mdi-minus" @click:prepend="decrement" @change="emitChange"></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
    label: String
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(localValue) {
        this.$emit('input', localValue)
      }
    }
  },
  methods: {
    increment () {
      this.$emit('input', parseInt(this.localValue, 10) + 1)
    },
    decrement () {
      this.$emit('input', parseInt(this.localValue, 10) - 1)
    },
    emitChange() {
      this.$emit('change')
    }
  }
}
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }

</style>
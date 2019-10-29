<template>
  <v-btn rounded :block="block" color="primary" :loading="loading" @click="$refs.file.click()">
    Batch Profile
    <input type="file" ref="file" style="display: none" v-on:change="onUpload" />
  </v-btn>
</template>

<script>
  export default {
    props: {
      block: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        csvFile: null,
        loading: false
      }
    },
    methods: {
      onUpload(e) {
        var files = e.target.files || e.dataTransfer.files
        this.csvFile = files[0]
      }
    }
  }
</script>
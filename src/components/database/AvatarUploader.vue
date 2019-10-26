<template>
  <v-btn color="primary" fab dark :width="205" :height="205" :loading="loading" @click="$refs.file.click()">
    <v-avatar v-if="value" :size="200">
      <img :src="value" />
    </v-avatar>
    <v-icon v-else :size="50" dark>mdi-cloud-upload</v-icon>
    <input type="file" ref="file" style="display: none" v-on:change="onUpload" />
  </v-btn>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        imageFile: null,
        loading: false
      }
    },
    methods: {
      onUpload(e) {
        var files = e.target.files || e.dataTransfer.files
        this.imageFile = files[0]
      }
    }
  }
</script>
<template>
  <v-btn color="primary" fab dark :width="205" :height="205" :loading="loading" :disabled="disabled" @click="$refs.file.click()">
    <v-avatar v-if="localValue.displayPhoto" :size="200">
      <img :src="croppedImage" :alt="localValue.displayPhotoId" />
    </v-avatar>
    <v-icon v-else :size="50" dark>mdi-cloud-upload</v-icon>
    <input type="file" ref="file" style="display: none" v-on:change="onUpload" :disabled="disabled" />
  </v-btn>
</template>

<script>
  import { uploadImage } from '@/utils/ekalayapi'

  export default {
    props: {
      value: {
        type: Object,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imageFile: null,
        loading: false
      }
    },
    computed: {
      localValue: {
        get() {
          return this.value
        },
        set(localValue) {
          this.$emit('input', localValue)
        }
      },
      croppedImage() {
        return this.localValue.displayPhoto.replace('upd-cds/image/upload/', 'upd-cds/image/upload/w_400,h_400,c_fill,g_face/')
      }
    },
    methods: {
      onUpload(e) {
        var files = e.target.files || e.dataTransfer.files
        this.imageFile = files[0]

        var data = new FormData()
        data.append('image', this.imageFile, this.imageFile.name)

        const config = {
          headers: { 'content-type': 'multipart/form-data' }
        }
        
        this.loading = true
        uploadImage(data, config).then((res) => {
          this.loading = false
          this.localValue.displayPhoto = res.secure_url
          this.localValue.displayPhotoId = res.public_id
        })
      }
    }
  }
</script>
<template>
  <v-btn rounded :block="block" color="primary" :loading="loading" @click="$refs.file.click()" :disabled="disabled">
    Batch Profile
    <input type="file" ref="file" style="display: none" v-on:change="onUpload" />
  </v-btn>
</template>

<script>
  import Papa from 'papaparse'
  import { batchResident } from '@/utils/ekalayapi'

  export default {
    props: {
      block: {
        type: Boolean,
        default: false
      },
      disabled: {
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
        this.loading = true
        var reader = new FileReader()
        var vew = this
        reader.readAsText(vew.csvFile)
        reader.onload = async function(event) {
          vew.csvBatch = Papa.parse(event.target.result, { header: true })
          await batchResident(vew.csvBatch.data)
          this.loading = false
          vew.$message(`Successfully uploaded ${vew.csvBatch.data.length} profiles!`, 'success')
          vew.$emit('done')
        }
        reader.onerror = function() {
          this.loading = false
          vew.$message('Unable to read ' + vew.csvFile.fileName, 'error')
        }
      }
    }
  }
</script>
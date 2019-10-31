<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="out" rounded :block="block" color="primary" v-on="on">Add Out Entry</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add In Entry</v-btn>
    </template>
    <v-card flat outlined>
      <v-card-title>
        <span v-if="out" class="headline">Add Out Entry</span>
        <span v-else class="headline">Add In Entry</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field v-if="!out" ref="krhidIn" rounded outlined @keyup.enter.native="handleIn" v-model="krhid" label="Barcode ID" required></v-text-field>
          <v-text-field v-else ref="krhidOut" rounded outlined @keyup.enter.native="handleOut" v-model="krhid" label="Barcode ID" required></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text rounded @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { activityInEntry, activityOutEntry } from '@/utils/ekalayapi'

  export default {
    components: {
    },
    props: {
      activityId: {
        type: String,
        required: true
      },
      block: {
        type: Boolean,
        default: false
      },
      out: {
        type: Boolean,
        default: false
      }
    },
    created() {

    },
    data: () => ({
      dialog: false,
      krhid: ''
    }),
    methods: {
      handleIn() {
        var krhid = this.krhid
        var _activity = this.activityId
        var timestamp = new Date()
        activityInEntry({ _activity, krhid, timestamp }).then(() => {
          this.krhid = ''
          this.$refs.krhidIn.$el.focus()
          this.$message(`IN entry added for ${krhid} (${timestamp})`, 'success')
        }).catch(() => {
          this.krhid = ''
          this.$refs.krhidIn.$el.focus()
        })
      },
      handleOut() {
        var _activity = this.activityId
        var krhid = this.krhid
        var timestamp = new Date()
        activityOutEntry({ _activity, krhid, timestamp }).then(() => {
          this.krhid = ''
          this.$refs.krhidOut.$el.focus()
          this.$message(`OUT entry added for ${krhid} (${timestamp})`, 'success')
        }).catch(() => {
          this.krhid = ''
          this.$refs.krhidOut.$el.focus()
        })
      },
    }
  }
</script>
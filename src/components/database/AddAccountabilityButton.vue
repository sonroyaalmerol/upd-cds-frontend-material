<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="batch" rounded :block="block" color="primary" v-on="on">Batch Accountability</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add Accountability</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span v-if="batch" class="headline">Batch Accountability</span>
        <span v-else class="headline">Add Accountability</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-textarea v-model="form.reason" label="Reason/Details"></v-textarea>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <ConfirmButton v-if="batch" color="primary" @action="batchAccountability">Add Accountability</ConfirmButton>
        <ConfirmButton v-else color="primary" @action="newAccountability">Add Accountability</ConfirmButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { batchAccountability, addAccountability } from '@/utils/ekalayapi'

  const ConfirmButton = () => import('@/components/general/ConfirmButton')

  export default {
    components: {
      ConfirmButton
    },
    props: {
      batch: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
      },
      residents: Array,
      residentId: String
    },
    data: () => ({
      dialog: false,
      form: {
        reason: '',
        cleared: false,
        clearedOn: null,
        clearedBy: '',
        _resident: ''
      },
      loading: false
    }),
    methods: {
      batchAccountability() {
        const promises = this.residents.map((resident) => {
          return {
            reason: this.form.reason,
            cleared: false,
            _resident: resident._id
          }
        })
        this.loading = true
        Promise.all(promises).then((res) => {
          batchAccountability(res).then(() => {
            this.$message('Successfully added accountability to all residents!', 'success')
            this.$emit('done')
            this.dialog = false
            this.loading = false
          })
        })
      },
      newAccountability() {
        this.loading = true
        this.form._resident = this.residentId
        addAccountability(this.form).then(() => {
          this.$message('Successfully added accountability!', 'success')
          this.form = {
            reason: '',
            cleared: false,
            clearedOn: null,
            clearedBy: '',
            _resident: ''
          }
          this.$emit('done')
          this.dialog = false
          this.loading = false
        })
      }
    }
  }
</script>
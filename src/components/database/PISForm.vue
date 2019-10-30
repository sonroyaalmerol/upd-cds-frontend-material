<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="pisId" rounded :block="block" color="primary" v-on="on">Update PIS</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add New PIS</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span v-if="pisId" class="headline">Update PIS</span>
        <span v-else class="headline">Add New PIS</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-switch color="primary" v-model="pisForm.leave" label="Leave the residence hall on his/her own"></v-switch>
          <v-switch color="primary" v-model="pisForm.overnight"
            label="Spend overnight and/or weekends other than the dorm"></v-switch>
          <v-switch color="primary" v-model="pisForm.lateNight" label="Arrive beyond curfew hours"></v-switch>
          <v-switch color="primary" v-model="pisForm.fieldTrip" label="Join school-related field trips"></v-switch>
          <v-switch color="primary" v-model="pisForm.joinOrg"
            label="Join registered student organization/s in UP Diliman"></v-switch>
          <v-switch color="primary" v-model="pisForm.applyPermitEMAcad" label="Early Morning (Academic)"></v-switch>
          <v-text-field rounded outlined v-model="pisForm.emTimeAcad" label="Earliest time (Academic)"></v-text-field>
          <v-switch color="primary" v-model="pisForm.applyPermitEMNonAcad" label="Early Morning (Non-academic)">
          </v-switch>
          <v-text-field rounded outlined v-model="pisForm.emTimeNonAcad" label="Earliest time (Non-academic)"></v-text-field>
          <v-textarea v-model="pisForm.remarks" label="Remarks"></v-textarea>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn v-if="pisId" color="primary" rounded @click="updatePIS">Update PIS</v-btn>
        <v-btn v-else color="primary" rounded @click="addPIS">Add New PIS</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { addPIS as add, updatePIS as update, getPISById } from '@/utils/ekalayapi'

  export default {
    props: {
      pisId: {
        type: String,
        default: ''
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      dialog: false,
      pisForm: {
        leave: true,
        overnight: true,
        lateNight: true,
        fieldTrip: true,
        joinOrg: true,
        applyPermitEMAcad: true,
        applyPermitEMNonAcad: true,
        emTimeAcad: '',
        emTimeNonAcad: '',
        remarks: '',
        _resident: ''
      },
      loading: false,
    }),
    created() {
      if (this.pisId) {
        this.loading = true
        getPISById(this.pisId).then((res) => {
          this.loading = false
          this.pisForm = res
        })
      }
    },
    methods: {
      addPIS() {
        this.loading = true
        add(this.pisForm).then(() => {
          this.$message('Successfully added PIS!', 'success')
          this.dialog = false
          this.loading = false
        })
      },
      updatePIS() {
        this.loading = true
        update(this.pisForm, this.pisForm._id).then(() => {
          this.$message('Successfully updated PIS!', 'success')
          this.dialog = false
          this.loading = false
        })
      }
    }
  }
</script>
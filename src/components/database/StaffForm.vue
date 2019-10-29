<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" rounded :block="block" color="primary" v-on="on">Update Staff</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add New Staff</v-btn>
    </template>
    <v-card flat outlined>
      <v-card-title>
        <span v-if="profile" class="headline">Update Staff</span>
        <span v-else class="headline">Add New Staff</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <center>
                <AvatarUploader v-model="staffForm.displayPhoto" />
              </center>
            </v-col>
          </v-row>
          <v-text-field rounded outlined v-model="staffForm.krhid" :counter="10" label="KRH ID Number" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field rounded outlined v-model="staffForm.firstName" :counter="10" label="First Name" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field rounded outlined v-model="staffForm.lastName" :counter="10" label="Last Name" required></v-text-field>
            </v-col>
          </v-row>
          <v-text-field rounded outlined v-model="staffForm.position" label="Position"></v-text-field>
          <DatePicker v-model="staffForm.birthday" label="Birthday" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" rounded @click="dialog = false">Update Staff</v-btn>
        <v-btn v-else color="primary" rounded @click="dialog = false">Add New Staff</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  const DatePicker = () => import('@/components/general/DatePicker')
  const AvatarUploader = () => import('@/components/database/AvatarUploader')
  export default {
    components: {
      DatePicker,
      AvatarUploader
    },
    props: {
      profile: {
        type: Object,
        default: null
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    created() {
      if (this.profile) {
        this.staffForm = this.profile
      }
    },
    data: () => ({
      dialog: false,
      staffForm: {
        krhid: '',
        firstName: '',
        lastName: '',
        position: '',
        birthday: '',
        displayPhoto: '',
        displayPhotoId: ''
      }
    }),
  }
</script>
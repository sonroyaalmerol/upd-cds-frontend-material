<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" tile :block="block" color="primary" v-on="on">Update DM</v-btn>
      <v-btn v-else tile :block="block" color="primary" v-on="on">Add New Dormitory Manager</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span v-if="profile" class="headline">Update Dormitory Manager</span>
        <span v-else class="headline">Add New Dormitory Manager</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <center>
                <AvatarUploader v-model="dmForm.displayPhoto" />
              </center>
            </v-col>
          </v-row>
          <v-text-field v-model="dmForm.krhid" :counter="10" label="KRH ID Number" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field v-model="dmForm.firstName" :counter="10" label="First Name" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="dmForm.lastName" :counter="10" label="Last Name" required></v-text-field>
            </v-col>
          </v-row>
          <DatePicker v-model="dmForm.birthday" label="Birthday" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" tile @click="dialog = false">Update DM</v-btn>
        <v-btn v-else color="primary" tile @click="dialog = false">Add New DM</v-btn>
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
        this.dmForm = this.profile
      }
    },
    data: () => ({
      dialog: false,
      dmForm: {
        krhid: '',
        firstName: '',
        lastName: '',
        birthday: '',
        displayPhoto: '',
        displayPhotoId: ''
      }
    }),
  }
</script>
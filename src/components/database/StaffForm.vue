<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" rounded :block="block" color="primary" v-on="on">Update Staff</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add New Staff</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
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
          <v-text-field rounded outlined v-model="staffForm.krhid" :counter="12" label="KRH ID Number" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field rounded outlined v-model="staffForm.firstName" label="First Name" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field rounded outlined v-model="staffForm.lastName" label="Last Name" required></v-text-field>
            </v-col>
          </v-row>
          <v-text-field rounded outlined v-model="staffForm.position" label="Position"></v-text-field>
          <DatePicker v-model="staffForm.birthday" label="Birthday" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" rounded @click="updateProfile">Update Staff</v-btn>
        <v-btn v-else color="primary" rounded @click="createProfile">Add New Staff</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { addStaff, updateStaff } from '@/utils/ekalayapi'

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
        this.photo.displayPhoto = this.staffForm.displayPhoto
        this.photo.displayPhotoId = this.staffForm.displayPhotoId
      }
    },
    computed: {
      photoWatcher() {
        return this.photo.displayPhoto
      }
    },
    watch: {
      photoWatcher() {
        if (this.dialog) {
          this.staffForm.displayPhoto = this.photo.displayPhoto
          this.staffForm.displayPhotoId = this.photo.displayPhotoId
          this.loading = true
          updateStaff(this.staffForm, this.staffForm._id).then(() => {
            this.$message('Successfully updated display photo!', 'success')
            this.loading = false
          })
        }
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
      },
      photo: {
        displayPhoto: '',
        displayPhotoId: ''
      },
      loading: false
    }),
    methods: {
      reset: function () {
        this.staffForm = {
          krhid: '',
          firstName: '',
          lastName: '',
          position: '',
          birthday: '',
          displayPhoto: '',
          displayPhotoId: ''
        }
      },
      createProfile: function () {
        this.loading = true
        addStaff(this.staffForm).then(() => {
          this.$message('Successfully added staff profile!', 'success')
          this.dialog = false
          this.reset()
          this.loading = false
        })
      },
      updateProfile: function () {
        this.loading = true
        updateStaff(this.staffForm, this.staffForm._id).then(() => {
          /* const index = this.residents.findIndex((resident) => { return resident._id == res._id })
          const name = this.residents[index].name
          const username = this.residents[index].username
          // add here for future profile statics that is not in profile
          this.residents[index] = res
          this.residents[index].name = name
          this.residents[index].username = username */
          this.$message('Successfully updated staff profile!', 'success')
          this.dialog = false
          this.reset()
          this.loading = false
        })
      }
    }
  }
</script>
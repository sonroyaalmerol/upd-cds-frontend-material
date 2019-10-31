<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" rounded :block="block" color="primary" v-on="on">Update DM</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add New Dormitory Manager</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
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
          <v-text-field rounded outlined v-model="dmForm.krhid" :counter="12" label="KRH ID Number" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field rounded outlined v-model="dmForm.firstName" label="First Name" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field rounded outlined v-model="dmForm.lastName" label="Last Name" required></v-text-field>
            </v-col>
          </v-row>
          <DatePicker v-model="dmForm.birthday" label="Birthday" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" rounded @click="updateProfile">Update DM</v-btn>
        <v-btn v-else color="primary" rounded @click="createProfile">Add New DM</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { addManager, updateManager } from '@/utils/ekalayapi'

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
        this.photo.displayPhoto = this.dmForm.displayPhoto
        this.photo.displayPhotoId = this.dmForm.displayPhotoId
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
          this.dmForm.displayPhoto = this.photo.displayPhoto
          this.dmForm.displayPhotoId = this.photo.displayPhotoId
          this.loading = true
          updateManager(this.dmForm, this.dmForm._id).then(() => {
            this.$message('Successfully updated display photo!', 'success')
            this.loading = false
          })
        }
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
      },
      photo: {
        displayPhoto: '',
        displayPhotoId: ''
      },
      loading: false
    }),
    methods: {
      reset: function () {
        this.dmForm = {
          krhid: '',
          firstName: '',
          lastName: '',
          birthday: '',
          displayPhoto: '',
          displayPhotoId: ''
        }
      },
      createProfile: function () {
        this.loading = true
        addManager(this.dmForm).then(() => {
          this.$message('Successfully added manager profile!', 'success')
          this.dialog = false
          this.reset()
          this.loading = false
          this.$emit('done')
        })
      },
      updateProfile: function () {
        this.loading = true
        updateManager(this.dmForm, this.dmForm._id).then(() => {
          /* const index = this.residents.findIndex((resident) => { return resident._id == res._id })
          const name = this.residents[index].name
          const username = this.residents[index].username
          // add here for future profile statics that is not in profile
          this.residents[index] = res
          this.residents[index].name = name
          this.residents[index].username = username */
          this.$message('Successfully updated manager profile!', 'success')
          this.dialog = false
          this.reset()
          this.loading = false
          this.$emit('done')
        })
      }
    }
  }
</script>
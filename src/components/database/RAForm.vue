<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" rounded :block="block" color="primary" v-on="on">Update RA</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add New Resident Assistant</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span v-if="profile" class="headline">Update Resident Assistant</span>
        <span v-else class="headline">Add New Resident Assistant</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <center>
                <AvatarUploader v-model="raForm.displayPhoto" />
              </center>
            </v-col>
          </v-row>
          <v-text-field rounded outlined v-model="raForm.upid" :counter="10" label="Student Number" required></v-text-field>
          <v-text-field rounded outlined v-model="raForm.krhid" :counter="12" label="KRH ID Number" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field rounded outlined v-model="raForm.firstName" label="First Name" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field rounded outlined v-model="raForm.lastName" label="Last Name" required></v-text-field>
            </v-col>
          </v-row>
          <v-text-field rounded outlined v-model="raForm.contact" label="Resident Contact Number"></v-text-field>
          <v-text-field rounded outlined v-model="raForm.emergency" label="Person to contact in case of emerency"></v-text-field>
          <v-text-field rounded outlined v-model="raForm.emergencyContact" label="Emergency Contact Number"></v-text-field>
          <v-radio-group v-model="raForm.sex" label="Sex" row>
            <v-radio color="blue" label="Male" value="Male"></v-radio>
            <v-radio color="red" label="Female" value="Female"></v-radio>
          </v-radio-group>
          <v-row>
            <v-col>
              <v-select v-model="raForm.corridor" :items="[{
                                    text: 'Basement Boys',
                                    value: 'BB'
                                },
                                {
                                    text: '1st Floor Boys',
                                    value: '1FB'
                                },
                                {
                                    text: '2nd Floor Boys',
                                    value: '2FB'
                                },
                                {
                                    text: '3rd Floor Boys',
                                    value: '3FB'
                                },
                                {
                                    text: 'Centerfold Girls',
                                    value: 'CF'
                                },
                                {
                                    text: '1st Floor Girls',
                                    value: '1FG'
                                },
                                {
                                    text: '2nd Floor Girls',
                                    value: '2FG'
                                },
                                {
                                    text: '3rd Floor Girls',
                                    value: '3FG'
                                }]" label="Corridor"></v-select>
            </v-col>
            <v-col>
              <v-text-field rounded outlined v-model="raForm.room" label="Room Number"></v-text-field>
            </v-col>
          </v-row>
          <DatePicker v-model="raForm.birthday" label="Birthday" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" rounded @click="updateProfile">Update RA</v-btn>
        <v-btn v-else color="primary" rounded @click="createProfile">Add New RA</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { addAssistant, updateAssistant } from '@/utils/ekalayapi'

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
        this.raForm = this.profile
        this.photo.displayPhoto = this.raForm.displayPhoto
        this.photo.displayPhotoId = this.raForm.displayPhotoId
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
          this.raForm.displayPhoto = this.photo.displayPhoto
          this.raForm.displayPhotoId = this.photo.displayPhotoId
          this.loading = true
          updateAssistant(this.raForm, this.raForm._id).then(() => {
            this.$message('Successfully updated display photo!', 'success')
            this.loading = false
          })
        }
      }
    },
    data: () => ({
      dialog: false,
      raForm: {
        upid: '',
        krhid: '',
        firstName: '',
        lastName: '',
        contact: '',
        emergency: '',
        emergencyContact: '',
        sex: '',
        room: '',
        birthday: '',
        corridor: '',
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
        this.raForm = {
          upid: '',
          krhid: '',
          firstName: '',
          lastName: '',
          contact: '',
          emergency: '',
          emergencyContact: '',
          sex: '',
          room: '',
          birthday: '',
          corridor: '',
          displayPhoto: '',
          displayPhotoId: ''
        }
      },
      createProfile: function () {
        this.loading = true
        addAssistant(this.raForm).then(() => {
          this.$message('Successfully added RA profile!', 'success')
          this.dialog = false
          this.reset()
          this.loading = false
          this.$emit('done')
        })
      },
      updateProfile: function () {
        this.loading = true
        updateAssistant(this.raForm, this.raForm._id).then(() => {
          /* const index = this.residents.findIndex((resident) => { return resident._id == res._id })
          const name = this.residents[index].name
          const username = this.residents[index].username
          // add here for future profile statics that is not in profile
          this.residents[index] = res
          this.residents[index].name = name
          this.residents[index].username = username */
          this.$message('Successfully updated RA profile!', 'success')
          this.dialog = false
          this.reset()
          this.loading = false
          this.$emit('done')
        })
      }
    }
  }
</script>
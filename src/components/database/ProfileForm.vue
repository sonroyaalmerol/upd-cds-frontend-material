<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" rounded :block="block" color="primary" v-on="on">Update Profile</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Add New Profile</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span v-if="profile" class="headline">Update Profile</span>
        <span v-else class="headline">Add New Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <center>
                <AvatarUploader v-model="photo" @done="updateProfile" />
              </center>
            </v-col>
          </v-row>
          <v-text-field rounded outlined v-model="residentForm.upid" :counter="10" label="Student Number" required>
          </v-text-field>
          <v-text-field rounded outlined v-model="residentForm.krhid" :counter="12" label="KRH ID Number" required>
          </v-text-field>
          <template v-if="!isMobileDevice">
            <v-row>
              <v-col>
                <v-text-field rounded outlined v-model="residentForm.firstName" label="First Name" required>
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field rounded outlined v-model="residentForm.lastName" label="Last Name" required>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field rounded outlined v-model="residentForm.college" label="College"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field rounded outlined v-model="residentForm.degree" label="Degree Program"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-switch color="primary" v-model="residentForm.isAthletePerformer"
                  label="University Athlete/Performer">
                </v-switch>
              </v-col>
              <v-col>
                <v-switch color="primary" v-model="residentForm.isCouncil" label="House Council Member"></v-switch>
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <v-text-field rounded outlined v-model="residentForm.firstName" label="First Name" required></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.lastName" label="Last Name" required></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.college" label="College"></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.degree" label="Degree Program"></v-text-field>
            <v-switch color="primary" v-model="residentForm.isAthletePerformer" label="University Athlete/Performer">
            </v-switch>
            <v-switch color="primary" v-model="residentForm.isCouncil" label="House Council Member"></v-switch>
          </template>
          <v-text-field rounded outlined v-model="residentForm.contact" label="Resident Contact Number"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.emergency" label="Person to contact in case of emerency">
          </v-text-field>
          <v-text-field rounded outlined v-model="residentForm.emergencyContact" label="Emergency Contact Number">
          </v-text-field>
          <v-radio-group v-model="residentForm.sex" label="Sex" row>
            <v-radio color="blue" label="Male" value="Male"></v-radio>
            <v-radio color="red" label="Female" value="Female"></v-radio>
          </v-radio-group>
          <template v-if="!isMobileDevice">
            <v-row>
              <v-col>
                <v-select rounded outlined v-model="residentForm.corridor" :items="corridors" label="Corridor">
                </v-select>
              </v-col>
              <v-col>
                <v-text-field rounded outlined v-model="residentForm.room" label="Room Number"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field rounded outlined v-model="residentForm.religion" label="Religion"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field rounded outlined v-model="residentForm.civilStatus" label="Civil Status"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <DatePicker v-model="residentForm.birthday" label="Birthday" />
              </v-col>
              <v-col>
                <v-text-field rounded outlined v-model="residentForm.stsBracket" label="STS Bracket"></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <v-select rounded outlined v-model="residentForm.corridor" :items="corridors" label="Corridor">
            </v-select>
            <v-text-field rounded outlined v-model="residentForm.room" label="Room Number"></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.religion" label="Religion"></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.civilStatus" label="Civil Status"></v-text-field>
            <DatePicker v-model="residentForm.birthday" label="Birthday" />
            <v-text-field rounded outlined v-model="residentForm.stsBracket" label="STS Bracket"></v-text-field>
          </template>
          <v-textarea rounded outlined v-model="residentForm.homeAddress" label="Home Address"></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.mmAddress" label="Metro Manila Address"></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.foodAllergies" label="Food Allergies"></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.medicineAllergies" label="Medicine Allergies"></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.diagnosedHealthCondition"
            label="Diagnosed Health Condition"></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.recurringSymptoms" label="Recurring Symptoms"></v-textarea>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" rounded @click="updateProfile">Update Profile</v-btn>
        <v-btn v-else color="primary" rounded @click="createProfile">Add New Profile</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    addResident,
    updateResident
  } from '@/utils/ekalayapi'

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
        this.residentForm = this.profile
        this.photo.displayPhoto = this.residentForm.displayPhoto
        this.photo.displayPhotoId = this.residentForm.displayPhotoId
      }
    },
    computed: {
      photoWatcher() {
        return this.photo.displayPhoto
      },
      isMobileDevice() {
        return (typeof this.$windowOrientation !== "undefined") || (this.$userAgent.indexOf('IEMobile') !== -1);
      }
    },
    watch: {
      photoWatcher() {
        if (this.dialog) {
          this.residentForm.displayPhoto = this.photo.displayPhoto
          this.residentForm.displayPhotoId = this.photo.displayPhotoId
          this.loading = true
          updateResident(this.residentForm, this.residentForm._id).then(() => {
            this.$message('Successfully updated display photo!', 'success')
            this.loading = false
          })
        }
      }
    },
    data: () => ({
      corridors: [{
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
        }
      ],
      dialog: false,
      residentForm: {
        upid: '',
        krhid: '',
        firstName: '',
        lastName: '',
        college: '',
        degree: '',
        contact: '',
        emergency: '',
        emergencyContact: '',
        sex: '',
        room: '',
        religion: '',
        civilStatus: '',
        birthday: '',
        stsBracket: '',
        corridor: '',
        homeAddress: '',
        mmAddress: '',
        foodAllergies: '',
        medicineAllergies: '',
        diagnosedHealthCondition: '',
        recurringSymptoms: '',
        isAthletePerformer: false,
        isCouncil: false,
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
        this.residentForm = {
          upid: '',
          krhid: '',
          firstName: '',
          lastName: '',
          college: '',
          degree: '',
          contact: '',
          emergency: '',
          emergencyContact: '',
          sex: '',
          room: '',
          religion: '',
          civilStatus: '',
          birthday: '',
          stsBracket: '',
          corridor: '',
          homeAddress: '',
          mmAddress: '',
          foodAllergies: '',
          medicineAllergies: '',
          diagnosedHealthCondition: '',
          recurringSymptoms: '',
          isAthletePerformer: false,
          isCouncil: false,
          displayPhoto: '',
          displayPhotoId: ''
        }
      },
      createProfile: function () {
        this.loading = true
        addResident(this.residentForm).then(() => {
          this.$message('Successfully added resident profile!', 'success')
          this.dialog = false
          this.reset()
          this.loading = false
        })
      },
      updateProfile: function () {
        this.loading = true
        updateResident(this.residentForm, this.residentForm._id).then(() => {
          /* const index = this.residents.findIndex((resident) => { return resident._id == res._id })
          const name = this.residents[index].name
          const username = this.residents[index].username
          // add here for future profile statics that is not in profile
          this.residents[index] = res
          this.residents[index].name = name
          this.residents[index].username = username */
          this.$message('Successfully updated resident profile!', 'success')
          this.dialog = false
          this.reset()
          this.loading = false
        })
      }
    }
  }
</script>
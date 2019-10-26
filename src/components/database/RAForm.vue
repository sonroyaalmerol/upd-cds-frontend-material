<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" tile :block="block" color="primary" v-on="on">Update RA</v-btn>
      <v-btn v-else tile :block="block" color="primary" v-on="on">Add New Resident Assistant</v-btn>
    </template>
    <v-card>
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
          <v-text-field v-model="raForm.upid" :counter="10" label="Student Number" required></v-text-field>
          <v-text-field v-model="raForm.krhid" :counter="10" label="KRH ID Number" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field v-model="raForm.firstName" :counter="10" label="First Name" required></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="raForm.lastName" :counter="10" label="Last Name" required></v-text-field>
            </v-col>
          </v-row>
          <v-text-field v-model="raForm.contact" label="Resident Contact Number"></v-text-field>
          <v-text-field v-model="raForm.emergency" label="Person to contact in case of emerency"></v-text-field>
          <v-text-field v-model="raForm.emergencyContact" label="Emergency Contact Number"></v-text-field>
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
              <v-text-field v-model="raForm.room" label="Room Number"></v-text-field>
            </v-col>
          </v-row>
          <DatePicker v-model="raForm.birthday" label="Birthday" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" tile @click="dialog = false">Update RA</v-btn>
        <v-btn v-else color="primary" tile @click="dialog = false">Add New RA</v-btn>
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
        this.raForm = this.profile
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
      }
    }),
  }
</script>
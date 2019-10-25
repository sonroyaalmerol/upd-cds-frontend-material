<template>
    <v-dialog v-model="dialog" persistent max-width="800px">
        <template v-slot:activator="{ on }">
            <v-btn v-if="profile" tile :block="block" color="primary" v-on="on">Update Profile</v-btn>
            <v-btn v-else tile :block="block" color="primary" v-on="on">Add New Profile</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span v-if="profile" class="headline">Update Profile</span>
                <span v-else class="headline">Add New Profile</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>
                            <center><AvatarUploader v-model="residentForm.displayPhoto" /></center>
                        </v-col>
                    </v-row>
                    <v-text-field
                        v-model="residentForm.upid"
                        :counter="10"
                        label="Student Number"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="residentForm.krhid"
                        :counter="10"
                        label="KRH ID Number"
                        required
                    ></v-text-field>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="residentForm.firstName"
                                :counter="10"
                                label="First Name"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="residentForm.lastName"
                                :counter="10"
                                label="Last Name"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="residentForm.college"
                                label="College"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="residentForm.degree"
                                label="Degree Program"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-switch
                                color="primary"
                                v-model="residentForm.isAthletePerformer"
                                label="University Athlete/Performer"
                            ></v-switch>
                        </v-col>
                        <v-col>
                            <v-switch
                                color="primary"
                                v-model="residentForm.isCouncil"
                                label="House Council Member"
                            ></v-switch>
                        </v-col>
                    </v-row>
                    <v-text-field
                        v-model="residentForm.contact"
                        label="Resident Contact Number"
                    ></v-text-field>
                    <v-text-field
                        v-model="residentForm.emergency"
                        label="Person to contact in case of emerency"
                    ></v-text-field>
                    <v-text-field
                        v-model="residentForm.emergencyContact"
                        label="Emergency Contact Number"
                    ></v-text-field>
                    <v-radio-group v-model="residentForm.sex" label="Sex" row>
                        <v-radio color="blue" label="Male" value="Male"></v-radio>
                        <v-radio color="red" label="Female" value="Female"></v-radio>
                    </v-radio-group>
                    <v-row>
                        <v-col>
                            <v-select
                                v-model="residentForm.corridor"
                                :items="[{
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
                                }]"
                                label="Corridor"
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="residentForm.room"
                                label="Room Number"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="residentForm.religion"
                                label="Religion"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="residentForm.civilStatus"
                                label="Civil Status"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <DatePicker v-model="residentForm.birthday" label="Birthday" />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="residentForm.stsBracket"
                                label="STS Bracket"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-textarea
                        v-model="residentForm.homeAddress"
                        label="Home Address"
                    ></v-textarea>
                    <v-textarea
                        v-model="residentForm.mmAddress"
                        label="Metro Manila Address"
                    ></v-textarea>
                    <v-textarea
                        v-model="residentForm.foodAllergies"
                        label="Food Allergies"
                    ></v-textarea>
                    <v-textarea
                        v-model="residentForm.medicineAllergies"
                        label="Medicine Allergies"
                    ></v-textarea>
                    <v-textarea
                        v-model="residentForm.diagnosedHealthCondition"
                        label="Diagnosed Health Condition"
                    ></v-textarea>
                    <v-textarea
                        v-model="residentForm.recurringSymptoms"
                        label="Recurring Symptoms"
                    ></v-textarea>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Close</v-btn>
                <v-btn v-if="profile" color="primary" tile @click="dialog = false">Update Profile</v-btn>
                <v-btn v-else color="primary" tile @click="dialog = false">Add New Profile</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import DatePicker from '@/components/general/DatePicker'
import AvatarUploader from '@/components/database/AvatarUploader'
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
        }
    },
    data: () => ({
      dialog: false,
      residentForm: {
        upid: '', krhid: '', firstName: '', lastName: '',
        college: '', degree: '', contact: '', emergency: '',
        emergencyContact: '', sex: '', room: '', religion: '',
        civilStatus: '', birthday: '', stsBracket: '',
        corridor: '', homeAddress: '', mmAddress: '', foodAllergies: '',
        medicineAllergies: '', diagnosedHealthCondition: '',
        recurringSymptoms: '', isAthletePerformer: false, isCouncil: false,
        displayPhoto: '', displayPhotoId: ''
      }
    }),
  }
</script>
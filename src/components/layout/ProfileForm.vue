<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="800px">
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span class="headline">Update Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <center>
                <AvatarUploader v-model="residentForm" disabled />
              </center>
            </v-col>
          </v-row>
          <h2 style="margin-bottom: 20px; margin-top: 20px; margin-left: 5px;"><b>Resident Profile</b></h2>
          <v-text-field rounded outlined v-model="residentForm.upid" :counter="8" label="Resident Number" required>
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
            <!--<v-row>
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
            </v-row>-->
          </template>
          <template v-else>
            <v-text-field rounded outlined v-model="residentForm.firstName" label="First Name" required></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.lastName" label="Last Name" required></v-text-field>
            <!--<v-text-field rounded outlined v-model="residentForm.college" label="College"></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.degree" label="Degree Program"></v-text-field>
            <v-switch color="primary" v-model="residentForm.isAthletePerformer" label="University Athlete/Performer">
            </v-switch>
            <v-switch color="primary" v-model="residentForm.isCouncil" label="House Council Member"></v-switch>-->
          </template>
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
            <DatePicker v-model="residentForm.birthday" label="Birthday" />
          </template>
          <template v-else>
            <v-select rounded outlined v-model="residentForm.corridor" :items="corridors" label="Corridor">
            </v-select>
            <v-text-field rounded outlined v-model="residentForm.room" label="Room Number"></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.religion" label="Religion"></v-text-field>
            <v-text-field rounded outlined v-model="residentForm.civilStatus" label="Civil Status"></v-text-field>
            <DatePicker v-model="residentForm.birthday" label="Birthday" />
            <!--<v-text-field rounded outlined v-model="residentForm.stsBracket" label="STS Bracket"></v-text-field>-->
          </template>
          <v-radio-group v-model="residentForm.sex" label="Sex" row>
            <v-radio color="blue" label="Male" value="Male"></v-radio>
            <v-radio color="red" label="Female" value="Female"></v-radio>
          </v-radio-group>
          <v-text-field rounded outlined v-model="residentForm.office" label="Office"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.position" label="Position"></v-text-field>

          <v-divider />

          <h2 style="margin-bottom: 20px; margin-top: 20px; margin-left: 5px;"><b>Resident Contact Details</b></h2>

          <v-text-field rounded outlined v-model="residentForm.phoneNumber" label="Cellphone Number"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.email" label="Email Address"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.officeNumber" label="Office Phone Number"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.homeNumber" label="Home Phone Number"></v-text-field>
          <v-textarea rounded outlined v-model="residentForm.homeAddress" label="Home Address"></v-textarea>

          <v-divider />

          <h2 style="margin-bottom: 20px; margin-top: 20px; margin-left: 5px;"><b>Person to Contact in Case of Emergency</b></h2>

          <v-text-field rounded outlined v-model="residentForm.emergencyName" label="Name">
          </v-text-field>
          <v-text-field rounded outlined v-model="residentForm.emergencyRelation" label="Relation"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.emergencyPhoneNumber" label="Cellphone Number"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.emergencyEmail" label="Email Address"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.emergencyOfficeNumber" label="Office Phone Number"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.emergencyHomeNumber" label="Home Phone Number"></v-text-field>
          <v-textarea rounded outlined v-model="residentForm.emergencyHomeAddress" label="Home Address"></v-textarea>

          <v-divider />

          <h2 style="margin-bottom: 20px; margin-top: 20px; margin-left: 5px;"><b>Health Information</b></h2>

          <v-textarea rounded outlined v-model="residentForm.healthCondition" label="Mayroon ka bang pangmatagalang sakit?" hint="Diabetes, High Blood, etc."></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.medicineMaintenance" label="Mayroon ka bang maintenance na gamot?" hint="Isulat ang NA kung walang maintenance na gamot"></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.fluVaccine" label="Kailan ang iyong huling flu vaccine?" hint="Isulat ang NA kung hindi pa o hindi maalala kung naka flu vaccine"></v-textarea>

          <v-divider />

          <h2 style="margin-bottom: 20px; margin-top: 20px; margin-left: 5px;"><b>Schedule and Activity</b></h2>

          <v-text-field rounded outlined v-model="residentForm.workSchedule" label="Work schedule (e.g., Mon-Fri 8-5PM)"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.dayOff" label="Day off"></v-text-field>
          <v-textarea rounded outlined v-model="residentForm.workOvertime" label="Kailan at anong oras mo ineexpect mag-overtime?" hint="Isulat ang NA kung di nag eexpect ng overtime"></v-textarea>
          <v-text-field rounded outlined v-model="residentForm.schoolCourse" label="Nag-aaral ka ba kasabay ng trabaho?" hint="Kung oo, pakilagay ang degree at school. Kung hindi, NA"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.transportationToHome" label="Sasakyan pag umuuwi" hint="Kunsakaling uuwi o manggagaling sa bahay, ano ang iyong sasakyan paalis/papuntang dormitoryo?"></v-text-field>
          <v-text-field rounded outlined v-model="residentForm.homePopulation" label="Ilan ang kasama sa bahay?"></v-text-field>
          <v-textarea rounded outlined v-model="residentForm.homeRiskInfo" label="May kasamang frontliner sa bahay?" hint="Kasama ang kung sino man na madalas humaharap sa maraming tao o sa may sakit. Kung oo, pakilagay ano ang kanilang trabaho. Kung wala, NA"></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.homeElderInfo" label="May kasamang matanda o bata sa bahay?" hint="Kung oo, pakilagay ang mga edad. Kung wala, NA"></v-textarea>
          <v-textarea rounded outlined v-model="residentForm.remarks" label="Iba pang impormasyon" hint="Iba pang impormasyon na maaaring dapat naming malaman habang ika’y nakatira sa aming dormitoryo (e.g., religious, personal, etc.)"></v-textarea>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" rounded @click="updateProfile">Update Profile</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getResidentById, updateResident } from '@/utils/ekalayapi'

  const DatePicker = () => import('@/components/general/DatePicker')
  const AvatarUploader = () => import('@/components/database/AvatarUploader')
  export default {
    components: {
      DatePicker,
      AvatarUploader
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
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
      this.fetchProfile()
    },
    computed: {
      ...mapGetters([
        'profileid',
        'roles'
      ]),
      dialog: {
        get() {
          return this.value
        },
        set(dialog) {
          this.$emit('input', dialog)
        }
      },
      isMobileDevice() {
        return (typeof this.$windowOrientation !== "undefined") || (this.$userAgent.indexOf('IEMobile') !== -1);
      }
    },
    watch: {
      async dialog(next) {
        if (next === true) {
          await this.fetchProfile()
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
      residentForm: {
        upid: '',
        krhid: '',
        firstName: '',
        lastName: '',
        office: '',
        position: '',
        phoneNumber: '',
        email: '',
        officeNumber: '',
        homeNumber: '',
        homeAddress: '',
        emergencyName: '',
        emergencyRelation: '',
        emergencyEmail: '',
        emergencyPhoneNumber: '',
        emergencyOfficeNumber: '',
        emergencyHomeNumber: '',
        emergencyHomeAddress: '',
        sex: '',
        room: '',
        corridor: '',
        religion: '',
        civilStatus: '',
        birthday: new Date(),
        healthCondition: '',
        medicineMaintenance: '',
        fluVaccine: '',
        workSchedule: '',
        dayOff: '',
        workOvertime: '',
        schoolCourse: '',
        transportationToHome: '',
        homePopulation: '',
        homeRiskInfo: '',
        homeElderInfo: '',
        remarks: '',

        isAthletePerformer: false,
        isCouncil: false,
        displayPhoto: '',
        displayPhotoId: ''
      },
      loading: false
    }),
    methods: {
      async fetchProfile() {
        var tempForm = await getResidentById(this.profileid)
        if (tempForm) {
          this.residentForm = tempForm
        }
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
          this.loading = false
        })
      }
    }
  }
</script>
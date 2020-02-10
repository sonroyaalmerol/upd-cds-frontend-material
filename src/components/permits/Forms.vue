<template>
  <v-card flat outlined :loading="submitting">
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-if="roles !== 0" rounded outlined v-model="form.upid" :counter="10" :rules="upidRules" label="Student Number" required>
        </v-text-field>

        <template v-if="!isMobileDevice">
          <v-row>
            <v-col>
              <DatePicker v-if="permitType === 1" v-model="form.dataOne" label="Start Date" />
              <DatePicker v-else-if="(permitType !== 3 && permitType !== 4) || isSpecial" v-model="form.dataOne" label="Date" />

              <DatePicker v-else-if="(permitType === 3 || permitType === 4) && !isSpecial" v-model="form.dataOne" label="Start Date" />
            </v-col>
            <v-col>
              <DatePicker v-if="permitType === 1" v-model="form.dataTwo" label="End Date" />
              <TimePicker v-else-if="(permitType !== 3 && permitType !== 4) || isSpecial" v-model="form.dataTwo" label="Time" :disabled="isSpecial" :key="`data1Timepicker`" />

              <DatePicker v-else-if="permitType === 3 || permitType === 4" v-model="form.dataOne2" label="End Date" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <DatePicker v-if="permitType === 1" v-model="form.dataOne" label="Start Date" />
          <DatePicker v-else-if="(permitType !== 3 && permitType !== 4) || isSpecial" v-model="form.dataOne" label="Date" />
          <DatePicker v-else-if="(permitType === 3 || permitType === 4) && !isSpecial" v-model="form.dataOne" label="Start Date" />

          <DatePicker v-if="permitType === 1" v-model="form.dataTwo" label="End Date" />
          <TimePicker v-else-if="(permitType !== 3 && permitType !== 4) || isSpecial" v-model="form.dataTwo" label="Time" :disabled="isSpecial" :key="`data1Timepicker`" />
          <DatePicker v-else-if="(permitType === 3 || permitType === 4) && !isSpecial" v-model="form.dataOne2" label="End Date" />
        </template>
        <TimePicker v-if="(permitType === 3 || permitType === 4) && !isSpecial" v-model="form.dataTwo" label="Time" :key="`data2Timepicker`"/>
        <v-switch v-if="permitType === 0 || permitType === 3" v-model="isSpecial" inset :label="'Special UP Fair Late Night'"></v-switch>
        <v-text-field rounded outlined v-model="form.location" label="Location" :disabled="isSpecial" required></v-text-field>
        <v-text-field rounded outlined v-model="form.reason" label="Reason" :disabled="isSpecial" required></v-text-field>
        <v-text-field rounded outlined v-model="form.notes" label="Remarks"></v-text-field>
        <v-btn rounded :disabled="!valid" color="success" class="mr-4 mt-2" @click="onSubmit">
          Apply Permit
        </v-btn>

        <v-btn rounded color="error" class="mr-4 mt-2" @click="defaults">
          Reset Form
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  const TimePicker = () => import('@/components/general/TimePicker')
  const DatePicker = () => import('@/components/general/DatePicker')
  import { mapGetters } from 'vuex'
  import { applyPermit } from '@/utils/ekalayapi'
  import { isBefore, setMilliseconds, setSeconds, setMinutes, setHours } from 'date-fns'

  export default {
    components: {
      TimePicker,
      DatePicker
    },
    created() {
      this.defaults()
    },
    computed: {
      ...mapGetters([
        'roles',
        'isAthletePerformer'
      ]),
      isMobileDevice() {
        return (typeof this.$windowOrientation !== "undefined") || (this.$userAgent.indexOf('IEMobile') !== -1);
      }
    },
    data() {
      return {
        form: {
          dataOne: null,
          dataOne2: null,
          dataTwo: null,
          location: '',
          reason: '',
          notes: '',
          upid: '',
          permitType: 0
        },
        isSpecial: false,
        valid: true,
        submitting: false,
        upidRules: [
          v => !!v || 'Student Number is required',
        ],
      }
    },
    watch: {
      isSpecial: function (val) {
        this.form.dataTwo = new Date()
        if (val) {
          this.form.dataTwo = this.form.dataTwo.setHours(2, 0, 0, 0)
          this.form.reason = 'UP Fair'
          this.form.location = 'Sunken Garden'
        } else {
          if (this.permitType === 0 || this.permitType === 3) {
            this.form.dataTwo = this.form.dataTwo.setHours(23, 59, 59, 99)
          } else if (this.permitType === 2 || this.permitType === 4) {
            this.form.dataTwo = this.form.dataTwo.setHours(0, 1, 0, 0)
          }
          this.form.reason = ''
          this.form.location = ''
        }
      }
    },
    props: {
      permitType: Number
    },
    methods: {
      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      defaults() {
        this.isSpecial = false
        this.form.location = ''
        this.form.reason = ''
        this.form.notes = ''
        this.form.upid = ''
        this.form.dataOne = new Date()
        if (this.permitType === 2 || this.permitType === 4) {
          this.form.dataOne.setDate(this.form.dataOne.getDate() + 1)
        }
        this.form.dataOne2 = this.form.dataOne
        this.form.dataTwo = new Date()
        if (this.permitType === 0 || this.permitType === 3) {
          this.form.dataTwo = this.form.dataTwo.setHours(23, 59, 59, 99)
        } else if (this.permitType === 2 || this.permitType === 4) {
          this.form.dataTwo = this.form.dataTwo.setHours(0, 1, 0, 0)
        } else if (this.permitType === 1) {
          this.form.dataTwo.setDate(this.form.dataTwo.getDate() + 1)
        }
      },
      onSubmit() {
        this.form.permitType = this.permitType
        this.submitting = true
        if (this.isSpecial) {
          // UP Fair
          this.form.permitType = 5
        }
        applyPermit(this.form).then(() => {
          if (this.roles !== 0) {
            this.$message('Successfully submitted permit! You may now process this permit.', 'success')
          } else {
            if (isBefore(new Date(), setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 16))) {
              this.$message('Successfully submitted permit! Please wait for the admin to process your request within the day.', 'success')
            } else {
              this.$message('Successfully submitted permit! Since it\'s already past 4pm, this permit will be processed the next working day.', 'success')
            }
          }
          this.form.location = ''
          this.form.reason = ''
          this.form.remarks = ''

          this.defaults()
          this.submitting = false

          /* switch (this.activeName) {
            case 'ln':
              this.form.dataOne = new Date()
              this.form.dataTwo = new Date().setHours(23, 59, 59, 99)
              break
            case 'lnap':
              this.form.dataOne = new Date()
              this.form.dataOne2 = new Date()
              this.form.dataTwo = new Date().setHours(23, 59, 59, 99)
              break
            case 'on':
              this.form.dataOne = new Date()
              this.form.dataTwo = new Date()
              break
            case 'em':
              this.form.dataOne = new Date()
              this.form.dataOne.setDate(this.form.dataOne.getDate() + 1)
              this.form.dataTwo = new Date().setHours(0, 1, 0, 0)
              break
            case 'emap':
              this.form.dataOne = new Date()
              this.form.dataOne2 = new Date()
              this.form.dataOne.setDate(this.form.dataOne.getDate() + 1)
              this.form.dataTwo = new Date().setHours(0, 1, 0, 0)
              break
          } */
        }).catch(() => {
          this.submitting = false
        })
      }
    }
  }
</script>
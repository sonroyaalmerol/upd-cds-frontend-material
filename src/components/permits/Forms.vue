<template>
  <v-card flat outlined :loading="submitting">
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-if="roles !== 0" rounded outlined v-model="form.upid" :counter="10" :rules="upidRules" label="Student Number" required>
        </v-text-field>

        <v-row>
          <v-col>
            <DatePicker v-if="permitType === 1" v-model="initForm.dataOne" label="Start Date" />
            <DatePicker v-else v-model="initForm.dataOne" label="Date" />
          </v-col>
          <v-col>
            <DatePicker v-if="permitType === 1" v-model="initForm.dataTwo" label="End Date" />
            <TimePicker v-else v-model="initForm.dataTwo" label="Time" />
          </v-col>
        </v-row>

        <v-text-field rounded outlined v-model="form.location" label="Location" required></v-text-field>
        <v-text-field rounded outlined v-model="form.reason" label="Reason" required></v-text-field>
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
  import { isBefore, setMilliseconds, setSeconds, setMinutes, setHours, parse } from 'date-fns'

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
      ])
    },
    data() {
      return {
        initForm: {
          dataOne: null,
          dataOne2: null,
          dataTwo: null,
        },
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
        valid: true,
        submitting: false,
        upidRules: [
          v => !!v || 'Student Number is required',
        ],
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
      stringToTime(str) {
        return parse(str, 'HH:mm', new Date())
      },
      stringToDate(str) {
        return parse(str, 'yyyy-MM-dd', new Date())
      },
      defaults() {
        this.form.location = ''
        this.form.reason = ''
        this.form.notes = ''
        this.form.upid = ''
        var nDate = new Date()
        if (this.permitType === 2) {
          nDate.setDate(nDate.getDate() + 1)
        }
        this.initForm.dataOne = nDate.toISOString().substr(0, 10)
        this.initForm.dataOne2 = this.initForm.dataOne
        if (this.permitType === 0) {
          this.initForm.dataTwo = '23:59'
        } else if (this.permitType === 2) {
          this.initForm.dataTwo = '4:00'
        }

        this.form.dataOne = this.initForm.dataOne
        this.form.dataOne2 = this.initForm.dataOne2
        this.form.dataTwo = this.initForm.dataTwo
      },
      onSubmit() {
        this.form.permitType = this.permitType
        this.submitting = true

        if (this.permitType === 0  || this.permitType === 2) {
          this.form.dataOne = this.stringToDate(this.initForm.dataOne)
          this.form.dataTwo = this.stringToTime(this.initForm.dataTwo)
        } else {
          this.form.dataOne = this.stringToDate(this.initForm.dataOne)
          this.form.dataTwo = this.stringToDate(this.initForm.dataTwo)
        }

        applyPermit(this.form).then(() => {
          if (this.roles !== 0) {
            this.$message({
              message: 'Successfully submitted permit! You may now process this permit.',
              type: 'success'
            })
          } else {
            if (isBefore(new Date(), setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 16))) {
              this.$message({
                message: 'Successfully submitted permit! Please wait for the admin to process your request within the day.',
                type: 'success'
              })
            } else {
              this.$message({
                message: 'Successfully submitted permit! Since it\'s already past 4pm, this permit will be processed the next working day.',
                type: 'success'
              })
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
<template>
  <v-card flat outlined>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field rounded outlined v-model="form.upid" :counter="10" :rules="upidRules" label="Student Number" required>
        </v-text-field>

        <v-row>
          <v-col>
            <DatePicker v-if="permitType === 1" v-model="form.dataOne" label="Start Date" />
            <DatePicker v-else v-model="form.dataOne" label="Date" />
          </v-col>
          <v-col>
            <DatePicker v-if="permitType === 1" v-model="form.dataTwo" label="End Date" />
            <TimePicker v-else v-model="form.dataTwo" label="Time" />
          </v-col>
        </v-row>

        <v-text-field rounded outlined v-model="form.location" label="Location" required></v-text-field>
        <v-text-field rounded outlined v-model="form.reason" label="Reason" required></v-text-field>
        <v-text-field rounded outlined v-model="form.notes" label="Remarks"></v-text-field>
        <v-btn rounded :disabled="!valid" color="success" class="mr-4 mt-2" @click="validate">
          Apply Permit
        </v-btn>

        <v-btn rounded color="error" class="mr-4 mt-2" @click="reset">
          Reset Form
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  const TimePicker = () => import('@/components/general/TimePicker')
  const DatePicker = () => import('@/components/general/DatePicker')
  export default {
    components: {
      TimePicker,
      DatePicker
    },
    created() {
      this.form.dataOne = new Date().toISOString().substr(0, 10)
      if (this.permitType === 0) {
        this.form.dataTwo = '23:59'
      } else if (this.permitType === 2) {
        this.form.dataTwo = '4:00'
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
        valid: true,
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
      reset() {
        this.$refs.form.reset()
      }
    }
  }
</script>
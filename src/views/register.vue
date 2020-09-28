<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card flat outlined :loading="registerload">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registration</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="registrationForm.upid" rounded outlined label="Resident Number" name="upid" type="text" color="primary"></v-text-field>
              <v-text-field v-model="registrationForm.email" rounded outlined label="Email Address" name="email" type="text" color="primary"></v-text-field>
              <v-text-field v-model="registrationForm.username" rounded outlined label="Username" name="username" type="text" color="primary"></v-text-field>
              <v-text-field v-model="registrationForm.password" rounded outlined id="password" label="Password" name="password" type="password" color="primary">
              </v-text-field>
              <v-text-field v-model="registrationForm.confirmpass" rounded outlined id="confirmpass" label="Confirm Password" name="confirmpass" type="password"
                color="primary" @keyup.enter.native="handleRegistration"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn rounded color="primary" x-large text @click.stop="$router.push('login')">Back to Login</v-btn>
            <v-btn rounded color="primary" x-large @click.stop="handleRegistration">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { register, registerDm } from '@/utils/ekalayapi'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      registrationForm: {
        username: '',
        password: '',
        confirmpass: '',
        email: '',
        upid: ''
      },
      registerload: false
    }),
    methods: {
      handleRegistration() {
        if (this.registrationForm.password === this.registrationForm.confirmpass) {
          if (/^KRH-[0-9]{4}-[0-9]{2}$/.test(this.registrationForm.upid)) {
            var dmDetails = this.registrationForm
            dmDetails.krhid = this.registrationForm.upid
            this.registerload = true
            registerDm(dmDetails).then(() => {
              this.registerload = false
              this.$message('Successfully registered account! You may now login.', 'success')
              this.registrationForm = {
                username: '',
                password: '',
                confirmpass: '',
                email: '',
                upid: ''
              }
              this.$router.push({ path: '/login' })
            }).catch(() => {
              this.registerload = false
            })
          } else {
            this.registerload = true
            register(this.registrationForm).then(() => {
              this.registerload = false
              this.$message('Successfully registered account! You may now login.', 'success')
              this.registrationForm = {
                username: '',
                password: '',
                confirmpass: '',
                email: '',
                upid: ''
              }
              this.$router.push({ path: '/login' })
            }).catch(() => {
              this.registerload = false
            })
          }
        } else {
          this.$message('Password does not match!', 'error')
        }
      }
    }
  }
</script>
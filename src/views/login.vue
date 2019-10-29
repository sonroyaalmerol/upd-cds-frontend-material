<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" :loading="loading">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Authentication</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Username" name="username" v-model="loginForm.username" prepend-icon="mdi-account" type="text" color="primary">
              </v-text-field>

              <v-text-field id="password" label="Password" name="password" v-model="loginForm.password" prepend-icon="mdi-lock" type="password"
                color="primary"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" x-large text @click.stop="$router.push('register')">Register</v-btn>
            <v-btn color="primary" x-large @click.stop="handleLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    created() {},
    data: () => ({
      drawer: null,
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }),
    methods: {
      handleLogin() {
        this.loading = true
        this.$store.dispatch('login', this.loginForm).then(() => {
          this.loading = false
          this.loginForm = {
            username: '',
            password: ''
          }
          this.$router.push({ path: this.redirect || '/dashboard' })
        }).catch(() => {
          this.loading = false
        })
      },
    }
  }
</script>
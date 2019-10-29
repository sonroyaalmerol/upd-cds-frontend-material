<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card flat outlined>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registration</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field rounded outlined label="Student Number" name="upid" type="text" color="primary"></v-text-field>
              <v-text-field rounded outlined label="Email Address" name="email" type="text" color="primary"></v-text-field>
              <v-text-field rounded outlined label="Username" name="username" type="text" color="primary"></v-text-field>
              <v-text-field rounded outlined id="password" label="Password" name="password" type="password" color="primary">
              </v-text-field>
              <v-text-field rounded outlined id="confirmpass" label="Confirm Password" name="confirmpass" type="password"
                color="primary"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn rounded color="primary" x-large text @click.stop="$router.push('login')">Back to Login</v-btn>
            <v-btn rounded color="primary" x-large>Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>
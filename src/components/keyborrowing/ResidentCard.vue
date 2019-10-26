<template>
  <v-card class="d-inline-block mx-2 my-3">
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img
            height="200"
            width="200"
            :src="data.image"
          ></v-img>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col>
          <center>
            <b>{{ data.name }}</b><br />
            <div>{{ data.room }}</div>
            <div class="overline mb-1">{{ data.upid }}</div>
          </center>
        </v-col>
      </v-row>
      <v-row>
        <v-btn v-if="data.state" text tile block>
          <v-icon color="green">mdi-key</v-icon>Borrow Key
        </v-btn>
        <v-btn v-else text tile block>
          <v-icon color="red">mdi-key</v-icon>Return Key
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    props: {
      data: Object
    }
  }
</script>
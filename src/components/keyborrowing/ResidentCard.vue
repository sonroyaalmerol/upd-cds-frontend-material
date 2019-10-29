<template>
  <v-card flat hover outlined class="d-inline-block mx-2 my-2">
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-img
            height="200"
            width="200"
            :src="localData.image"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <center>
            <div><b>{{ localData.name }}</b></div>
            <div>{{ localData.room }}</div>
            <div class="overline mb-1">{{ localData.upid }}</div>
          </center>
        </v-col>
      </v-row>
      <v-row>
        <v-btn v-if="localData.state" @click="changeStateKey" :loading="loading" text rounded outlined>
          <v-icon color="green">mdi-key</v-icon>Borrow Key
        </v-btn>
        <v-btn v-else @click="changeStateKey" :loading="loading" text rounded outlined>
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
    },
    data() {
      return {
        loading: false,
        localData: {
          image: '',
          name: '',
          room: '',
          upid: '',
          state: true
        }
      }
    },
    watch: {
      data(next) {
        this.localData = next
      }
    },
    created() {
      this.localData = this.data
    },
    methods: {
      timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      async changeStateKey() {
        this.loading = true
        await this.timeout(1000)
        this.localData.state = !this.localData.state
        this.loading = false
      },
    }
  }
</script>
<template>
  <v-card flat outlined class="d-inline-block mx-2 my-2">
    <v-container>
      <v-row class="mx-auto">
        <v-col cols="auto">
          <v-img
            height="200"
            width="200"
            :src="localData.displayPhoto.replace('image/upload/', 'image/upload/w_400,h_400,c_fill,g_face/')"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <center>
            <div><b>{{ localData.name }}</b></div>
            <div>{{ localData.room ? localData.room : 'N/A' }}</div>
            <div class="overline mb-1">{{ localData.upid }}</div>
          </center>
        </v-col>
      </v-row>
      <v-row>
        <v-btn v-if="!confirm && localData.keyborrow" @click="checkStatus(localData._id)" :loading="loading" class="mx-auto" text rounded outlined>
          <v-icon color="green" class="mr-2">mdi-key</v-icon>Borrow Key
        </v-btn>
        <v-btn v-else-if="!confirm && !localData.keyborrow" @click="checkStatus(localData._id)" :loading="loading" class="mx-auto" text rounded outlined>
          <v-icon color="red" class="mr-2">mdi-key</v-icon>Return Key
        </v-btn>
        <v-tooltip v-else top>
          <template v-slot:activator="{ on }">
            <v-btn dark rounded :color="'warning'" @click="checkStatus(localData._id)" class="mx-auto" v-on="on">
              <template v-if="localData.keyborrow">
                <v-icon color="white" class="mr-2">mdi-key</v-icon>Borrow Key
              </template>
              <template v-else>
                <v-icon color="white" class="mr-2">mdi-key</v-icon>Return Key
              </template>
            </v-btn>
          </template>
          <span>Confirm Action</span>
        </v-tooltip>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { addKeyBorrowEntry } from '@/utils/ekalayapi'

  export default {
    props: {
      data: Object
    },
    data() {
      return {
        loading: false,
        localData: {
          displayPhoto: '',
          name: '',
          room: '',
          upid: '',
          keyborrow: true,
          _id: ''
        },
        confirm: false
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
      checkStatus(x) {
        if (this.confirm) {
          this.confirm = false
          this.keyAction(x)
        } else {
          this.confirm = true
        }
      },
      keyAction(id) {
        this.loading = true
        addKeyBorrowEntry({ _resident: id, timestamp: new Date() }).then(() => {
          this.$message('Successfully added key borrowing entry!', 'success')
          this.localData.keyborrow = !this.localData.keyborrow
          this.loading = false
        })
      }
    }
  }
</script>
<template>
  <div>
    <v-card flat>
      <v-container>
        <v-text-field rounded outlined v-model="search" block append-icon="mdi-account-search" label="Search" single-line hide-details>
        </v-text-field>
      </v-container>
    </v-card>
    <v-pagination
      circle
      v-model="page"
      class="my-4"
      :length="numberOfPages"
      :total-visible="6"
    ></v-pagination>
    <center v-if="!loading">
      <template v-for="(res, i) in dataToShow">
        <ResidentCard :data="res" :key="`${i}-${res.image}`" />
      </template>
    </center>
    <center v-else>
      <v-card flat outlined class="d-inline-block mx-2 my-3" :loading="true">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-img
                height="200"
                width="200"
              ></v-img>
            </v-col>
          </v-row>
          <v-row justify="space-between">
            <v-col>
            </v-col>
          </v-row>
          <v-row>
          </v-row>
        </v-container>
      </v-card>
    </center>
    <v-pagination
      circle
      v-model="page"
      class="my-4"
      :length="numberOfPages"
      :total-visible="6"
    ></v-pagination>
  </div>
</template>

<script>
  const ResidentCard = () => import('@/components/keyborrowing/ResidentCard')

  export default {
    props: {
      value: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    components: {
      ResidentCard
    },
    computed: {
      dataToShow() {
        var index = this.page - 1
        var toShow = this.filteredArray
        return toShow.slice(index * this.profilePerPage, (index + 1) * this.profilePerPage)
      },
      filteredArray() {
        var x = this.value.filter(
          data => {
            var searchKey = `${data.name ? data.name : ''} ${data.upid ? data.upid : ''} ${data.room ? data.room : ''}`
            return !this.search || searchKey.toLowerCase().includes(this.search.toLowerCase())
          }
        )
        return x
      },
      numberOfPages() {
        return Math.ceil(this.filteredArray.length/this.profilePerPage)
      }
    },
    data: () => ({
      show: false,
      search: '',
      page: 1,
      profilePerPage: 10
    }),
    methods: {
    }
  }
</script>
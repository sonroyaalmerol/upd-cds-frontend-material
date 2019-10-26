<template>
  <div>
    <v-card :loading="loading" flat tile>
      <template v-for="(res, i) in dataToShow">
        <ApprovingElement :data="res" :key="i" />
      </template>
    </v-card>
    <v-pagination
      v-model="page"
      class="my-4"
      :length="numberOfPages"
    ></v-pagination>
  </div>
</template>

<script>
  const ApprovingElement = () => import('@/components/permits/ApprovingElement')

  export default {
    components: {
      ApprovingElement
    },
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
    computed: {
      dataToShow() {
        var index = this.page - 1
        var toShow = this.value
        return toShow.slice(index * this.permitsPerPage, (index + 1) * this.permitsPerPage)
      },
      numberOfPages() {
        return Math.ceil(this.value.length/this.permitsPerPage)
      }
    },
    data: () => ({
      show: false,
      page: 1,
      permitsPerPage: 5
    }),
  }
</script>
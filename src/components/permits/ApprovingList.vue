<template>
  <div>
    <v-card flat tile :loading="loading">
      <template v-if="localValue.length">
        <template v-for="(res, i) in dataToShow">
          <ApprovingElement :data="res" :key="`${i}-${res._id}`" @done="done(i)" />
        </template>
      </template>
      <v-card v-else flat tile>
        <v-card-text>
          <center class="my-4">No pending permits found!</center>
        </v-card-text>
      </v-card>
    </v-card>
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
        var toShow = this.localValue
        return toShow.slice(index * this.permitsPerPage, (index + 1) * this.permitsPerPage)
      },
      numberOfPages() {
        return Math.ceil(this.localValue.length/this.permitsPerPage)
      },
      localValue: {
        get() {
          return this.value
        },
        set(localValue) {
          this.$emit('input', localValue)
        }
      }
    },
    methods: {
      done(index) {
        this.localValue.splice(index, 1)
      }
    },
    data: () => ({
      page: 1,
      permitsPerPage: 5
    }),
  }
</script>
<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-card flat>
      <v-card flat tile :loading="loading">
        <template v-if="inOutEntries.length && !loading">
          <template v-for="(res, i) in dataToShow">
            <ActivityInOutElement :data="res" :stats="statistics" :key="`${i}-${res._id}`" @done="done(i)" />
          </template>
        </template>
        <v-card v-else flat tile>
          <v-card-text>
            <center class="my-4">No pending in/outs found!</center>
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
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { toProcessActivityInOuts, getActivity, getActivityStatistics } from '@/utils/ekalayapi'

  const ActivityInOutElement = () => import('@/components/database/ActivityInOutElement')

  export default {
    components: {
      ActivityInOutElement,
    },
    computed: {
      ...mapGetters([
        'roles',
        'uid',
        'profileid',
        'first_name',
        'last_name'
      ]),
      dataToShow() {
        var index = this.page - 1
        var toShow = this.inOutEntries
        return toShow.slice(index * this.permitsPerPage, (index + 1) * this.permitsPerPage)
      },
      numberOfPages() {
        return Math.ceil(this.inOutEntries.length/this.permitsPerPage)
      }
    },
    activated() {
      if (this.$route.params.activityId && this.roles !== 0) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/database/activities` })
      }
    },
    methods: {
      onRefresh: function () {
        return this.fetchData()
      },
      fetchData: async function() {
        this.loading = true
        try {
          this.inOutEntries = await toProcessActivityInOuts(this.$route.params.activityId)
          this.statistics = await getActivityStatistics(this.$route.params.activityId)
          this.activity = await getActivity(this.$route.params.activityId)
          this.loading = false
        } catch (err) {
          this.$message('Activity ID not found. Please try again!', 'error')
        }
        this.loading = false
      },
      
      done(index) {
        this.inOutEntries.splice(index, 1)
      }
    },
    data() {
      return {
        inOutEntries: [],
        activity: {},
        statistics: {},
        loading: false,
        confirming: false,
        page: 1,
        permitsPerPage: 5
      }
    },
  }
</script>
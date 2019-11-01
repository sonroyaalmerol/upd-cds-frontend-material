<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-card flat>
      <v-data-table :headers="headers" :items="inoutentries" item-key="_id" :loading="loading" disable-filtering disable-pagination disable-sort hide-default-footer>
        <template v-slot:item.timestamp="{ value }">
          {{ parseTimestamp(value) }}
        </template>
        <template v-slot:item.status="{ value }">
          <v-chip v-if="value" tile class="ma-2" color="success">
            IN
          </v-chip>
          <v-chip v-else tile class="ma-2" color="error">
            OUT
          </v-chip>
        </template>
      </v-data-table>
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
  import { inoutentries } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'

  export default {
    methods: {
      parseTimestamp(timestamp) {
        return format(parseISO(timestamp), 'MMMM d, yyyy | h:mm a')
      },
      onRefresh: function () {
        return this.fetchData()
      },
      fetchData: async function() {
        this.loading = true
        try {
          const res = await inoutentries(this.$route.params.profileId, this.page)
          this.inoutentries = res.docs
          this.totalDocs = res.totalDocs
        } catch (err) {
          this.$message('Resident ID not found. Please try again!', 'error')
        }
        this.loading = false
      }
    },
    computed: {
      ...mapGetters([
        'roles',
        'uid',
        'profileid'
      ]),
      numberOfPages() {
        return Math.ceil(this.totalDocs/this.entriesPerPage)
      }
    },
    watch: {
      page: function() {
        this.fetchData()
      }
    },
    data() {
      return {
        headers: [{
            text: 'Timestamp',
            value: 'timestamp'
          },
          {
            text: 'In/Out',
            value: 'status'
          },
        ],
        loading: false,
        inoutentries: [],
        page: 1,
        entriesPerPage: 10,
        totalDocs: 0
      }
    },
    activated() {
      if ((this.roles === 0 && this.profileid === this.$route.params.profileId) || this.roles !== 0) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/inoutentries/${this.profileid}` })
      }
    }
  }
</script>
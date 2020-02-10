<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-card flat>
      <v-data-table :headers="headers" :items="permits" item-key="_id" :loading="loading" disable-filtering disable-pagination disable-sort hide-default-footer>
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
  import { permitsAll } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'

  export default {
    methods: {
      parseTimestamp(timestamp) {
        return format(parseISO(timestamp), 'MMMM d, yyyy | h:mm a')
      },
      onRefresh: function () {
        return this.fetchData()
      },
      integerToSymbols(bool) {
        if (bool === 1) {
          return '✔'
        } else if (bool === 0) {
          return '✘'
        } else {
          return 'Not yet processed.'
        }
      },
      fetchMore: async function (permit) {
        var toOutput = permit
        toOutput.approvedRA = `${this.integerToSymbols(permit.approvedRA)}${permit.remarksRA ? ' | ' + permit.remarksRA : ''}`
        toOutput.approvedDM = `${this.integerToSymbols(permit.approvedDM)}${permit.remarksDM ? ' | ' + permit.remarksDM : ''}`
        if (permit._resident) {
          const resident = permit._resident
          toOutput.upid = resident.upid
        }
        if (permit.permitType === 0) {
          toOutput.dataOne = format(parseISO(permit.dataTwo), 'h:mm a') + ', ' + format(parseISO(permit.dataOne), 'MMMM d, yyyy')
        } else if (permit.permitType === 1) {
          toOutput.dataOne = format(parseISO(permit.dataOne), 'MMMM d, yyyy') + ' - ' + format(parseISO(permit.dataTwo), 'MMMM d, yyyy')
        } else if (permit.permitType === 2) {
          toOutput.dataOne = format(parseISO(permit.dataTwo), 'h:mm a') + ', ' + format(parseISO(permit.dataOne), 'MMMM d, yyyy')
        } else if (permit.permitType === 5) {
          toOutput.dataOne = format(parseISO(permit.dataTwo), 'h:mm a') + ' the next day, ' + format(parseISO(permit.dataOne), 'MMMM d, yyyy')
        }
        toOutput.timestamp = format(parseISO(permit.timestamp), 'MMMM d, yyyy | h:mm a')
        this.permits.push(toOutput)
      },
      fetchData: async function() {
        this.loading = true
        this.permits = []
        const res = await permitsAll(this.page)
        this.totalDocs = res.totalDocs
        const promises = res.docs.map(this.fetchMore)
        await Promise.all(promises)
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
        search: '',
        headers: [{
            text: 'Student Number',
            value: 'upid'
          },
          {
            text: 'Location',
            value: 'location'
          },
          {
            text: 'Reason',
            value: 'reason'
          },
          {
            text: 'Date/Time',
            value: 'dataOne'
          },
          {
            text: 'Approved by RA',
            value: 'approvedRA'
          },
          {
            text: 'Approved by DM',
            value: 'approvedDM'
          },
        ],
        permits: [],
        loading: false,
        page: 1,
        entriesPerPage: 10,
        totalDocs: 0
      }
    },
    activated() {
      this.fetchData()
    }
  }
</script>
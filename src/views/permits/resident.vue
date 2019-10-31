<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-card flat>
      <v-data-table :headers="headers" :items="permits" :search="search" item-key="_id">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field rounded outlined v-model="search" append-icon="mdi-account-search" label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { permitsResident } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'

  export default {
    created() {
      if ((this.roles === 0 && this.profileid === this.$route.params.profileId) || this.roles !== 0) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/permits/${this.profileid}` })
      }
    },
    computed: {
      ...mapGetters([
        'roles',
        'profileid'
      ])
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
        loading: false
      }
    },
    methods: {
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
      fetchMore: async function(permit) {
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
        }
        toOutput.timestamp = format(parseISO(permit.timestamp), 'MMMM d, yyyy | h:mm a')
        this.permits.push(toOutput)
      },
      fetchData: async function() {
        this.loading = true
        this.permits = []
        var response = await permitsResident(this.currentPage, this.$route.params.profileId)
        this.totalDocs = response.totalDocs
        const promises = response.docs.map(this.fetchMore)
        await Promise.all(promises)
        this.loading = false
      }
    }
  }
</script>
<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles !== 0">
      <v-col>
        <v-btn rounded color="primary" @click="exportCSV">Export CSV</v-btn>
      </v-col>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="inOutEntries" :single-expand="singleExpand" :expanded.sync="expanded"
        :search="search" item-key="_id" show-expand @click:row="clicked" :loading="loading">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field rounded outlined v-model="search" append-icon="mdi-account-search" label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <v-btn rounded block color="primary" disabled>Confirm</v-btn>
              </v-col>
              <v-col>
                <v-btn rounded block color="primary" disabled>Manual Add Out</v-btn>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:item.in="{ value }">
          {{ parseTimestamp(value) }}
        </template>
        <template v-slot:item.out="{ value }">
          {{ parseTimestamp(value) }}
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { activityInOuts, getActivity } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'
  import downloadCSV from '@/utils/downloadCSV'

  const ActionsPanel = () => import('@/components/database/ActionsPanel')

  export default {
    components: {
      ActionsPanel
    },
    computed: {
      ...mapGetters([
        'roles',
        'uid',
        'profileid',
        'first_name',
        'last_name'
      ]),
    },
    created() {
      if (this.$route.params.activityId && this.roles !== 0) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/database/activities` })
      }
    },
    methods: {
      parseTimestamp(timestamp) {
        return timestamp ? format(parseISO(timestamp), 'MMMM d, yyyy | h:mm a') : 'N/A'
      },
      clicked(value) {
        if (this.expanded.includes(value)) {
          var index = this.expanded.indexOf(value);
          if (index > -1) {
            this.expanded.splice(index, 1);
          }
        } else {
          if (this.expanded.length > 0 && this.singleExpand) {
            this.expanded = []
          }
          this.expanded.push(value)
        }
      },
      onRefresh: function () {
        return this.fetchData()
      },
      fetchData: async function() {
        this.loading = true
        try {
          this.inOutEntries = await activityInOuts(this.$route.params.activityId)
          this.activity = await getActivity(this.$route.params.activityId)
        } catch (err) {
          this.$message('Activity ID not found. Please try again!', 'error')
        }
        this.loading = false
      },
      exportCSV() {
        downloadCSV(this.inOutEntries, `${this.activity.name}`)
      }
    },
    data() {
      return {
        search: '',
        expanded: [],
        singleExpand: true,
        headers: [{
            text: 'Student Number',
            value: '_profile.upid'
          },
          {
            text: 'First Name',
            value: '_profile.firstName'
          },
          {
            text: 'Last Name',
            value: '_profile.lastName'
          },
          {
            text: 'In Timestamp',
            value: 'in'
          },
          {
            text: 'Out Timestamp',
            value: 'out'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        inOutEntries: [],
        activity: {},
        loading: false
      }
    },
  }
</script>
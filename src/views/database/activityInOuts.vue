<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles !== 0">
      <v-row>
        <v-col>
          <v-btn rounded block color="primary" :to="`/database/activities/${activity._id}/process`">Process Entries</v-btn>
        </v-col>
        <v-col>
          <v-btn rounded block color="primary" @click="exportCSV">Export CSV</v-btn>
        </v-col>
      </v-row>
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
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <template v-if="!item.counted && item.counted !== 0">
                <v-col>
                  <ConfirmButton :key="item._id" rounded block color="primary" disabled>Not yet processed!</ConfirmButton>
                </v-col>
              </template>
              <v-col v-else>
                <ConfirmButton :key="item._id" rounded block color="primary" @action="undoInOut(item)" :loading="confirming">Undo points</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:[`item.counted`]="{ value }">
          <template v-if="value">
            <b>{{ value }}</b> / {{ activity.points }}
          </template>
          <template v-else>N/A</template>
        </template>
        <template v-slot:[`item.in`]="{ value }">
          {{ parseTimestamp(value) }}
        </template>
        <template v-slot:[`item.out`]="{ value }">
          {{ parseTimestamp(value) }}
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { activityInOuts, getActivity, undoConActivityInOut } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'
  import downloadCSV from '@/utils/downloadCSV'

  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const ConfirmButton = () => import('@/components/general/ConfirmButton')

  export default {
    components: {
      ActionsPanel,
      ConfirmButton
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
    activated() {
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
      },
      
      undoInOut(entry) {
        var entryCopy = entry
        this.confirming = true
        undoConActivityInOut(entryCopy, entry._id).then(async () => {
          this.$message('Successfully removed points!', 'success')
          await this.fetchData()
          this.confirming = false
        })
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
            text: 'Points',
            value: 'counted'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        inOutEntries: [],
        activity: {},
        loading: false,
        confirming: false
      }
    },
  }
</script>
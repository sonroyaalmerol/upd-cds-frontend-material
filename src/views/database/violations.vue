<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles !== 0">
      <v-row>
        <v-col>
          <AddViolationButton block :residentId="resident._id" @done="fetchData()" />
        </v-col>
        <v-col>
          <v-btn rounded block color="primary" :to="`/inoutentries/${resident._id}`">Review In/Out Entries</v-btn>
        </v-col>
        <v-col>
          <v-btn rounded block color="primary" :to="`/permits/${resident._id}`">Review Permits</v-btn>
        </v-col>
        <v-col>
          <v-btn rounded block color="primary" @click="exportViolations">Export to CSV</v-btn>
        </v-col>
      </v-row>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="violations" :single-expand="singleExpand" :expanded.sync="expanded"
        :search="search" item-key="_id" :show-expand="roles !== 0" @click:row="clicked" :loading="loading">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field rounded outlined v-model="search" append-icon="mdi-account-search" label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-if="roles !== 0" v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <ConfirmButton :key="item._id" color="red" block @action="deleteViolation(item)" :loading="deleting">Delete</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:[`item.ismajor`]="{ value }">
          <v-chip v-if="value" tile class="ma-2" color="error">
            Major Violation
          </v-chip>
          <v-chip v-else tile class="ma-2" color="warning">
            Minor Violation
          </v-chip>
        </template>
        <template v-slot:[`item.timestamp`]="{ value }">
          {{ parseTimestamp(value) }}
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { violations, getResidentById, deleteViolation } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'
  import downloadCSV from '@/utils/downloadCSV'

  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const AddViolationButton = () => import('@/components/database/AddViolationButton')
  const ConfirmButton = () => import('@/components/general/ConfirmButton')

  export default {
    activated() {
      if ((this.roles === 0 && this.profileid === this.$route.params.residentId) || this.roles !== 0) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/database/violations/${this.profileid}` })
      }
    },
    components: {
      ActionsPanel,
      AddViolationButton,
      ConfirmButton
    },
    computed: {
      ...mapGetters([
        'roles',
        'uid',
        'profileid'
      ]),
    },
    methods: {
      parseTimestamp(timestamp) {
        return format(parseISO(timestamp), 'MMMM d, yyyy | h:mm a')
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
          var promiseVio = violations(this.$route.params.residentId)
          var promiseResident = getResidentById(this.$route.params.residentId)
          const res = await Promise.all([promiseVio, promiseResident])
          this.violations = res[0]
          this.resident = res[1]
        } catch (err) {
          this.$message('Resident ID not found. Please try again!', 'error')
        }
        this.loading = false
      },
      deleteViolation(violation) {
        this.deleting = true
        deleteViolation(violation._id).then(() => {
          this.$message('Successfully deleted violation!', 'success')
          this.violations = this.violations.filter((val) => val !== violation)
          this.deleting = false
        })
      },
      exportViolations() {
        downloadCSV(this.violations, `${this.resident.upid}-violations`)
      }
    },
    data() {
      return {
        search: '',
        expanded: [],
        singleExpand: false,
        headers: [{
            text: 'Type',
            value: 'ismajor'
          },
          {
            text: 'Details',
            value: 'details'
          },
          {
            text: 'timestamp',
            value: 'timestamp'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        violations: [],
        loading: false,
        resident: {},
        deleting: false
      }
    },
  }
</script>
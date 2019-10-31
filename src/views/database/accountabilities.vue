<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles !== 0">
      <v-col>
        <AddAccountabilityButton :residentId="resident._id" @done="fetchData()"/>
      </v-col>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="accountabilities" :single-expand="singleExpand" :expanded.sync="expanded"
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
                <ConfirmButton :key="item._id" color="green" block @action="clearAccountability(item)">Clear</ConfirmButton>
              </v-col>
              <v-col>
                <ConfirmButton :key="item._id" color="red" block @action="deleteAccountability(item)">Delete</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:item.cleared="{ value, item }">
          <v-chip v-if="value" tile class="ma-2" color="success">
            Cleared (by: {{ item.clearedBy }})
          </v-chip>
          <v-chip v-else tile class="ma-2" color="error">
            Not Cleared
          </v-chip>
        </template>
        <template v-slot:item.clearedOn="{ value }">
          {{ parseTimestamp(value) }}
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { accountabilities, getResidentById, deleteAccountability, clearAccountability } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'

  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const AddAccountabilityButton = () => import('@/components/database/AddAccountabilityButton')
  const ConfirmButton = () => import('@/components/general/ConfirmButton')

  export default {
    components: {
      AddAccountabilityButton,
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
          var promiseAcc = accountabilities(this.$route.params.residentId)
          var promiseResident = getResidentById(this.$route.params.residentId)
          const res = await Promise.all([promiseAcc, promiseResident])
          this.accountabilities = res[0]
          this.resident = res[1]
        } catch (err) {
          this.$message('Resident ID not found. Please try again!', 'error')
        }
        this.loading = false
      },
      deleteAccountability(accountability) {
        var id = accountability._id
        deleteAccountability(id).then(() => {
          this.$message('Successfully deleted accountability!', 'success')
          this.accountabilities = this.accountabilities.filter((val) => val !== accountability)
        })
      },
      clearAccountability(accountability) {
        var id = accountability._id
        clearAccountability(id, `${this.first_name} ${this.last_name}`).then(() => {
          this.$message('Successfully cleared accountability!', 'success')
          this.fetchData()
        })
      },
    },
    created() {
      if ((this.roles === 0 && this.profileid === this.$route.params.residentId) || this.roles !== 0) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/database/accountabilities/${this.profileid}` })
      }
    },
    activated() {
      if ((this.roles === 0 && this.profileid === this.$route.params.residentId) || this.roles !== 0) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/database/accountabilities/${this.profileid}` })
      }
    },
    data() {
      return {
        search: '',
        expanded: [],
        singleExpand: true,
        loading: false,
        headers: [{
            text: 'Reason',
            value: 'reason'
          },
          {
            text: 'Status',
            value: 'cleared'
          },
          {
            text: 'Date of Clearance',
            value: 'clearedOn'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        accountabilities: [],
        resident: {}
      }
    },
  }
</script>
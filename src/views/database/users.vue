<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles !== 0">
      <v-row>
        <v-col>
          <BatchProfileUploader block @done="fetchData()" />
        </v-col>
        <v-col>
          <ProfileForm block @done="fetchData()" />
        </v-col>
        <v-col>
          <AddAccountabilityButton batch block :residents="residents" />
        </v-col>
        <v-col>
          <v-btn rounded block color="primary" :loading="exportingVio" @click="exportViolations">Export Violations</v-btn>
        </v-col>
        <v-col>
          <v-btn rounded block color="primary" :loading="exportingAcc" @click="exportAccountabilities">Export Accountabilities</v-btn>
        </v-col>
        <v-col>
          <v-btn rounded block color="primary" :loading="exportingInOutEntries" @click="exportInOutEntries">Export In/Out Entries</v-btn>
        </v-col>
      </v-row>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="residents" :single-expand="singleExpand" :expanded.sync="expanded"
        :search="search" item-key="_id" show-expand @click:row="clicked" :loading="loading" :custom-filter="filterUsers">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn class="mr-4" rounded color="primary" :loading="exportingDb" @click="exportDb">Export</v-btn>
            <v-text-field rounded outlined v-model="search" append-icon="mdi-account-search" label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <v-btn :key="item._id" rounded block color="primary" :to="`/permits/${item._id}`">View Permit Records</v-btn>
              </v-col>
              <v-col>
                <v-btn :key="item._id" rounded block color="primary" :to="`/database/violations/${item._id}`">Violations</v-btn>
              </v-col>
              <v-col>
                <v-btn :key="item._id" rounded block color="primary" :to="`/database/accountabilities/${item._id}`">Accountabilities</v-btn>
              </v-col>
              <v-col>
                <v-btn :key="item._id" rounded block color="primary" :to="`/inoutentries/${item._id}`">In/Out Entries</v-btn>
              </v-col>
              <v-col>
                <ProfileForm :key="item._id" block :profile="item" @done="fetchData()" />
              </v-col>
              <v-col>
                <PISForm :key="item._id" block :pisId="item._pis" :profileId="item._id" @done="fetchData()" />
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="item.userId">
                <ConfirmButton :key="item._id" block color="red" @action="resetAcc(item)" :loading="resetting">Reset Account</ConfirmButton>
              </v-col>
              <v-col>
                <ConfirmButton :key="item._id" block color="red" @action="checkoutAcc(item)" :loading="checkingout">Checkout</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:[`item.inout`]="{ value }">
          <v-chip v-if="value === 'IN'" tile class="ma-2" color="success">
            IN
          </v-chip>
          <v-chip v-else-if="value === 'OUT'" tile class="ma-2" color="error">
            OUT
          </v-chip>
          <v-chip v-else tile class="ma-2" color="warning">
            N/A
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { residents, deleteUserById, deleteResident, accountabilitiesAll, violationsAll, inoutentriesAll } from '@/utils/ekalayapi'
  import downloadCSV from '@/utils/downloadCSV'
  import { mapGetters } from 'vuex'

  const ProfileForm = () => import('@/components/database/ProfileForm')
  const PISForm = () => import('@/components/database/PISForm')
  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const ConfirmButton = () => import('@/components/general/ConfirmButton')
  const BatchProfileUploader = () => import('@/components/database/BatchProfileUploader')
  const AddAccountabilityButton = () => import('@/components/database/AddAccountabilityButton')

  export default {
    components: {
      ProfileForm,
      PISForm,
      ConfirmButton,
      ActionsPanel,
      BatchProfileUploader,
      AddAccountabilityButton
    },
    data() {
      return {
        search: '',
        expanded: [],
        singleExpand: true,
        headers: [{
            text: 'Student Number',
            value: 'upid'
          },
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Username',
            value: 'username'
          },
          {
            text: 'In/Out',
            value: 'inout'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        loading: false,
        resetting: false,
        checkingout: false,
        exportingAcc: false,
        exportingVio: false,
        exportingDb: false,
        exportingInOutEntries: false,
        residents: []
      }
    },
    activated() {
      this.fetchData()
    },
    computed: {
      ...mapGetters([
        'roles'
      ]),
    },
    methods: {
      filterUsers(value, search, item) {
        var searchKey = ''
        searchKey = `location:${item.inout ? item.inout: ''} ${item.name ? item.name : ''} ${item.upid ? item.upid : ''} ${item.krhid ? item.krhid : ''} ${item.corridor ? item.corridor : ''} ${item.room ? item.room : ''} ${item.username ? item.username : ''}`

        return !search || searchKey.toLowerCase().includes(search.toLowerCase())
      },
      exportAccountabilities() {
        this.exportingAcc = true
        accountabilitiesAll().then((res) => {
          downloadCSV(res, 'accountabilities')
          this.exportingAcc = false
        })
      },
      exportViolations() {
        this.exportingVio = true
        violationsAll().then((res) => {
          downloadCSV(res, 'violations')
          this.exportingVio = false
        })
      },
      exportInOutEntries() {
        this.exportingInOutEntries = true
        inoutentriesAll().then((res) => {
          downloadCSV(res, 'inoutentries')
          this.exportingInOutEntries = false
        })
      },
      exportDb() {
        this.exportingDb = true
        var toExport = []
        this.residents.map((item) => {
          if (this.filterUsers(item, this.search, item)) {
            var x = item
            delete x.isAthletePerformer
            delete x.isCouncil
            delete x._permits
            delete x._attendedActivities
            delete x._id
            delete x.displayPhotoId
            delete x._pis
            delete x._keyborrow
            delete x.__v
            delete x._user
            delete x._inout
            delete x.userId
            delete x.name
            toExport.push(x)
          }
        })
        downloadCSV(toExport, 'userdb')
        this.exportingDb = false
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
      test() {
        this.$message('this is a test')
      },
      fetchMore: function(resident) {
        return new Promise((resolve) => {
          var toOutput = resident
          toOutput.name = `${resident.firstName} ${resident.lastName}`
          if (toOutput._inout) {
            if (toOutput._inout.status) {
              // in
              toOutput.inout = 'IN'
            } else {
              // out
              toOutput.inout = 'OUT'
            }
          } else {
            toOutput.inout = 'N/A'
          }
          if (resident._user) {
            toOutput.username = resident._user.username
            toOutput.userId = resident._user._id
          } else {
            toOutput.username = 'N/A'
            toOutput.userId = null
          }
          this.residents.push(toOutput)
          resolve()
        })
      },
      fetchData: async function() {
        this.loading = true
        this.residents = []
        var response = await residents()
        const promises = response.map(this.fetchMore)
        await Promise.all(promises)
        this.loading = false
      },
      resetAcc: function(acc) {
        this.resetting = true
        deleteUserById(acc.userId).then(() => {
          this.resetting = false
          this.$message('Successfully deleted user! He/she can now register again to gain access of his/her account once again.', 'success')
          var index = this.residents.findIndex((val) => val === acc)
          this.residents[index].name = 'Unregistered User'
          this.residents[index].username = 'N/A'
          this.residents[index].userId - null
        })
      },
      checkoutAcc: function(acc) {
        this.checkingout = true
        deleteResident(acc._id).then(() => {
          this.checkingout = false
          this.$message('Successfully checked out resident!', 'success')
          this.residents = this.residents.filter((val) => val !== acc)
        })
      }
    }
  }
</script>
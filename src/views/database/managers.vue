<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel>
      <v-col>
        <DMForm @done="fetchData()" />
      </v-col>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="managers" :single-expand="singleExpand" :expanded.sync="expanded"
        :search="search" item-key="_id" show-expand @click:row="clicked">
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
              <v-col>
                <DMForm :key="item._id" block :profile="item" @done="fetchData()" />
              </v-col>
              <v-col>
                <ConfirmButton :key="item._id" color="red" block :loading="resetting" @action="deleteUser(item)">Reset Account</ConfirmButton>
              </v-col>
              <v-col>
                <ConfirmButton :key="item._id" color="red" block :loading="deleting" @action="deleteManager(item)">Checkout</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:item.inout="{ value }">
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
  import { mapGetters } from 'vuex'
  import { managers, deleteManager, deleteUserById } from '@/utils/ekalayapi'

  const ConfirmButton = () => import('@/components/general/ConfirmButton')
  const DMForm = () => import('@/components/database/DMForm')
  const ActionsPanel = () => import('@/components/database/ActionsPanel')

  export default {
    components: {
      DMForm,
      ActionsPanel,
      ConfirmButton
    },
    computed: {
      ...mapGetters([
        'roles',
        'uid'
      ])
    },
    created() {
      this.fetchData()
    },
    methods: {
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
      fetchMore: function(manager) {
        return new Promise((resolve) => {
          var toOutput = manager
          toOutput.name = `${manager.firstName} ${manager.lastName}`
          if (manager._user) {
            toOutput.username = manager._user.username
            toOutput.userId = manager._user._id
          } else {
            toOutput.username = 'N/A'
            toOutput.userId = null
          }
          if (manager._inout) {
            if (manager._inout.status) {
              // in
              toOutput.inout = 'IN'
            } else {
              // out
              toOutput.inout = 'OUT'
            }
          } else {
            toOutput.inout = 'N/A'
          }
          this.managers.push(toOutput)
          resolve()
        })
      },
      fetchData: async function() {
        this.loading = true
        this.managers = []
        var response = await managers()
        const promises = response.map(this.fetchMore)
        await Promise.all(promises)
        this.loading = false
      },
      deleteManager(manager) {
        this.resetting = true
        deleteManager(manager._id).then(() => {
          this.resetting = false
          this.$message('Successfully deleted manager!', 'success')
          this.managers = this.managers.filter((val) => val !== manager)
        })
      },
      deleteUser(user) {
        this.deleting = true
        deleteUserById(user.userId).then(() => {
          this.deleting = false
          this.$message('Successfully deleted user! He/she can now register again to gain access of his/her account once again.', 'success')
          var index = this.managers.findIndex((val) => val === user)
          this.managers[index].name = 'Unregistered User'
          this.managers[index].username = 'N/A'
        })
      },
    },
    data() {
      return {
        search: '',
        expanded: [],
        singleExpand: true,
        headers: [{
            text: 'KRH ID',
            value: 'krhid'
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
        managers: [],
        loading: false,
        resetting: false,
        deleting: false
      }
    },
  }
</script>
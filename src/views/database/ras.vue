<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles === 2">
      <v-col>
        <RAForm />
      </v-col>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="assistants" :single-expand="singleExpand" :expanded.sync="expanded"
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
              <v-col v-if="(item.userId === uid) || roles === 2">
                <RAForm :key="item._id" :profile="item" block />
              </v-col>
              <v-col v-if="roles === 2" :key="item._id">
                <v-btn rounded block color="primary" :to="`/database/directives/${item._id}`">Directives</v-btn>
              </v-col>
              <v-col>
                <ConfirmButton :key="item._id" color="red" block :loading="deleting" @action="deleteUser(item)">Reset Account</ConfirmButton>
              </v-col>
              <v-col v-if="roles === 2">
                <ConfirmButton :key="item._id" color="red" block :loading="checkingOut" @action="deleteAssistant(item)">Checkout</ConfirmButton>
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
  import { assistants, deleteAssistant, deleteUserById } from '@/utils/ekalayapi'

  const ConfirmButton = () => import('@/components/general/ConfirmButton')
  const RAForm = () => import('@/components/database/RAForm')
  const ActionsPanel = () => import('@/components/database/ActionsPanel')

  export default {
    components: {
      RAForm,
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
      fetchMore: function(assistant) {
        return new Promise((resolve) => {
          var toOutput = assistant
          toOutput.name = `${assistant.firstName} ${assistant.lastName}`
          if (assistant._user) {
            toOutput.username = assistant._user.username
            toOutput.userId = assistant._user._id
          } else {
            toOutput.username = 'N/A'
            toOutput.userId = null
          }
          if (assistant._inout) {
            if (assistant._inout.status) {
              // in
              toOutput.inout = 'IN'
            } else {
              // out
              toOutput.inout = 'OUT'
            }
          } else {
            toOutput.inout = 'N/A'
          }
          this.assistants.push(toOutput)
          resolve()
        })
      },
      fetchData: async function() {
        this.loading = true
        this.assistants = []
        var response = await assistants()
        const promises = response.map(this.fetchMore)
        await Promise.all(promises)
        this.loading = false
      },
      deleteAssistant(assistant) {
        this.checkingOut = true
        deleteAssistant(assistant._id).then(() => {
          this.checkingOut = false
          this.$message('Successfully deleted resident assistant!', 'success')
          this.assistants = this.assistants.filter((val) => val !== assistant)
        })
      },
      deleteUser(user) {
        this.deleting = true
        deleteUserById(user.userId).then(() => {
          this.deleting = false
          this.$message('Successfully deleted user! He/she can now register again to gain access of his/her account once again.', 'success')
          var index = this.assistants.findIndex((val) => val === user)
          this.assistants[index].name = 'Unregistered User'
          this.assistants[index].username = 'N/A'
        })
      },
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
        assistants: [],
        deleting: false,
        checkingOut: false,
      }
    },
  }
</script>
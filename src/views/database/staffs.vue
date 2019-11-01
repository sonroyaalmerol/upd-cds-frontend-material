<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles === 2">
      <v-col>
        <StaffForm @done="fetchData()" />
      </v-col>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="staffs" :single-expand="singleExpand" :expanded.sync="expanded"
        :search="search" item-key="_id" :show-expand="roles === 2" @click:row="clicked" :loading="loading">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field rounded outlined v-model="search" append-icon="mdi-account-search" label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-if="roles === 2" v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <StaffForm :key="item._id" :profile="item" block @done="fetchData()" />
              </v-col>
              <v-col>
                <ConfirmButton :key="item._id" color="red" block @action="deleteStaff(item)" :loading="deleting">Checkout</ConfirmButton>
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
  import { staffs, deleteStaff } from '@/utils/ekalayapi'

  const ConfirmButton = () => import('@/components/general/ConfirmButton')
  const StaffForm = () => import('@/components/database/StaffForm')
  const ActionsPanel = () => import('@/components/database/ActionsPanel')

  export default {
    components: {
      StaffForm,
      ActionsPanel,
      ConfirmButton
    },
    computed: {
      ...mapGetters([
        'roles',
        'uid'
      ])
    },
    activated() {
      this.fetchData()
    },
    methods: {
      fetchMore: function(staff) {
        return new Promise((resolve) => {
          var toOutput = staff
          toOutput.name = `${staff.firstName} ${staff.lastName}`
          if (staff._inout) {
            if (staff._inout.status) {
              // in
              toOutput.inout = 'IN'
            } else {
              // out
              toOutput.inout = 'OUT'
            }
          } else {
            toOutput.inout = 'N/A'
          }
          this.staffs.push(toOutput)
          resolve()
        })
      },
      fetchData: async function() {
        this.loading = true
        this.staffs = []
        var response = await staffs()
        const promises = response.map(this.fetchMore)
        await Promise.all(promises)
        this.loading = false
      },
      deleteStaff(staff) {
        this.deleting = true
        deleteStaff(staff._id).then(() => {
          this.$message('Successfully deleted staff!', 'success')
          this.staffs = this.staffs.filter((val) => val !== staff)
          this.deleting = false
        })
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
      }
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
            text: 'Position',
            value: 'position'
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
        staffs: [],
        loading: false,
        deleting: false
      }
    },
  }
</script>
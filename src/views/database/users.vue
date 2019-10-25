<template>
  <v-container>
    <ActionsPanel>
      <v-row>
        <v-col>
          <BatchProfileUploader block />
        </v-col>
        <v-col>
          <ProfileForm :profile="null" block />
        </v-col>
        <v-col>
          <AddAccountabilityButton batch block />
        </v-col>
        <v-col>
          <v-btn tile block color="primary">Export Violations</v-btn>
        </v-col>
        <v-col>
          <v-btn tile block color="primary">Export Accountabilities</v-btn>
        </v-col>
        <v-col>
          <v-btn tile block color="red" disabled>Clear Database</v-btn>
        </v-col>
      </v-row>
    </ActionsPanel><br/>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :search="search"
        item-key="upid"
        show-expand
        @click:row="clicked"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-account-search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <v-btn tile block color="primary" :to="'/permits/asd'">View Permit Records</v-btn>
              </v-col>
              <v-col>
                <v-btn tile block color="primary" :to="'/database/violations/asd'">Violations</v-btn>
              </v-col>
              <v-col>
                <v-btn tile block color="primary" :to="'/database/accountabilities/asd'">Accountabilities</v-btn>
              </v-col>
              <v-col>
                <ProfileForm block :profile="null" />
              </v-col>
              <v-col>
                <PISForm block :pisId="'asdasd'" />
              </v-col>
              <v-col>
                <ConfirmButton block color="red" @action="test()">Reset Account</ConfirmButton>
              </v-col>
              <v-col>
                <ConfirmButton block color="red" @action="test()">Checkout</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
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
    methods: {
      clicked(value) {
        if(this.expanded.includes(value)) {
          var index = this.expanded.indexOf(value);
          if (index > -1) {
            this.expanded.splice(index, 1);
          }
        } else {
          this.expanded.push(value)
        }
      }
    },
    data () {
      return {
        search: '',
        expanded: [],
        singleExpand: false,
        headers: [
          { text: 'Student Number', value: 'upid' },
          { text: 'Name', value: 'name' },
          { text: 'Username', value: 'username' },
          { text: 'In/Out', value: 'inout' },
          { text: '', value: 'data-table-expand' },
        ],
        users: [
          {
            upid: '2015-12584',
            name: 'Son Roy Almerol',
            username: 'saalmerol',
            inout: 'IN',
          },
          {
            upid: '2015-12583',
            name: 'Test Developer',
            username: 'sonroyaalmerol',
            inout: 'IN',
          },
        ]
      }
    },
  }
</script>

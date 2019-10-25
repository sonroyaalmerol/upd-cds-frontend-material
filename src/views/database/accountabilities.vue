<template>
  <v-container>
    <ActionsPanel>
      <AddAccountabilityButton />
    </ActionsPanel><br />
    <v-card>
      <v-data-table
        :headers="headers"
        :items="accountabilities"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :search="search"
        item-key="name"
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
                <v-btn color="green" dark tile block>Clear</v-btn>
              </v-col>
              <v-col>
                <v-btn color="red" dark tile block>Delete</v-btn>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const AddAccountabilityButton = () => import('@/components/database/AddAccountabilityButton')
  export default {
    components: {
      AddAccountabilityButton,
      ActionsPanel
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
          { text: 'Reason', value: 'reason' },
          { text: 'Status', value: 'status' },
          { text: 'Date of Clearance', value: 'clearanceDate' },
          { text: '', value: 'data-table-expand' },
        ],
        accountabilities: [
          {
            reason: 'Water Fee 100 - MONTH 1',
            status: 'Not cleared',
            clearanceDate: 'N/A',
          }
        ],
      }
    },
  }
</script>

<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel>
      <AddDirectivesButton />
    </ActionsPanel>
    <v-card>
      <v-data-table :headers="headers" :items="directives" :single-expand="singleExpand" :expanded.sync="expanded"
        :search="search" item-key="details" show-expand @click:row="clicked">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-account-search" label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <v-btn tile block color="primary">Accomplish</v-btn>
              </v-col>
              <v-col>
                <v-btn tile block color="error">Delete</v-btn>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const AddDirectivesButton = () => import('@/components/database/AddDirectivesButton')

  export default {
    components: {
      ActionsPanel,
      AddDirectivesButton
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
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve()
          }, 1000)
        })
      }
    },
    data() {
      return {
        search: '',
        expanded: [],
        singleExpand: true,
        headers: [{
            text: 'Details',
            value: 'details'
          },
          {
            text: 'Status',
            value: 'status'
          },
          {
            text: 'Date of Accomplishment',
            value: 'timestamp'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        directives: [{
            details: 'test',
            status: 'Not yet accomplished',
            timestamp: 'N/A',
          },
          {
            details: 'test 2',
            status: 'Not yet accomplished',
            timestamp: 'N/A',
          },
        ],
      }
    },
  }
</script>
<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel>
      <v-btn rounded color="primary">Export CSV</v-btn>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="activityInOuts" :single-expand="singleExpand" :expanded.sync="expanded"
        :search="search" item-key="name" show-expand @click:row="clicked">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field rounded outlined v-model="search" append-icon="mdi-account-search" label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <v-btn rounded block color="primary">Confirm</v-btn>
              </v-col>
              <v-col>
                <v-btn rounded block color="primary">Manual Add Out</v-btn>
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

  export default {
    components: {
      ActionsPanel
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
            text: 'Student Number',
            value: 'upid'
          },
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'In Timestamp',
            value: 'inTimestamp'
          },
          {
            text: 'Out Timestamp',
            value: 'outTimestamp'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        activityInOuts: [{
            upid: '2015-12584',
            name: 'Son Roy Almerol',
            inTimestamp: '8/5/2019, 10:04:42 PM',
            outTimestamp: '8/5/2019, 10:04:48 PM'
          },
          {
            upid: '2015-12583',
            name: 'Test Developer',
            inTimestamp: '8/5/2019, 10:09:40 PM',
            outTimestamp: 'N/A'
          },
        ],
      }
    },
  }
</script>
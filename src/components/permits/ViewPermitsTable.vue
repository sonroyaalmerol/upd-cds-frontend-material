<template>
  <v-data-table :headers="headers" :items="permits" :single-expand="singleExpand" :expanded.sync="expanded" :search="search"
    item-key="name" show-expand @click:row="clicked">
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
            <v-btn tile dark color="red">Delete</v-btn>
          </v-col>
        </v-row>
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: {
      permitType: Number
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
    },
    data() {
      return {
        expanded: [],
        search: '',
        singleExpand: true,
        headers: [{
            text: 'Location',
            value: 'location'
          },
          {
            text: 'Reason',
            value: 'reason'
          },
          {
            text: 'Date/Time',
            value: 'dateTime'
          },
          {
            text: 'Approved by RA',
            value: 'approvedRA'
          },
          {
            text: 'Approved by DM',
            value: 'approvedDM'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        permits: [{
          location: 'CS Atrium',
          reason: 'To study',
          dateTime: 'October 18, 2019 - October 19, 2019',
          approvedRA: '✔',
          approvedDM: '✔',
        }]
      }
    }
  }
</script>
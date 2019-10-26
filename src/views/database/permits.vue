<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="permits"
        :search="search"
        item-key="name"
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
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  export default {
    methods: {
      onRefresh: function() {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve()
          }, 1000)
        })
      }
    },
    data () {
      return {
        search: '',
        headers: [
          { text: 'Student Number', value: 'upid' },
          { text: 'Location', value: 'location' },
          { text: 'Reason', value: 'reason' },
          { text: 'Date/Time', value: 'dateTime' },
          { text: 'Approved by RA', value: 'approvedRA' },
          { text: 'Approved by DM', value: 'approvedDM' },
        ],
        permits: [
          {
            upid: '2019-02142',
            location: 'CS Atrium',
            reason: 'To study',
            dateTime: 'October 18, 2019 - October 19, 2019',
            approvedRA: '✔',
            approvedDM: '✔',
          }
        ],
      }
    },
  }
</script>

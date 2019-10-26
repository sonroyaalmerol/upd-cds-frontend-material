<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-card>
      <v-data-table :headers="headers" :items="inoutentries" item-key="name">
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  export default {
    methods: {
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
        headers: [{
            text: 'Timestamp',
            value: 'timestamp'
          },
          {
            text: 'In/Out',
            value: 'status'
          },
        ],
        inoutentries: [{
          timestamp: '8/29/2019, 12:13:30 AM',
          status: 'IN',
        }],
      }
    },
  }
</script>
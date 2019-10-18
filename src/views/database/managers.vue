<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="dms"
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
            <v-btn text>
              Edit DM
            </v-btn>
            <v-btn color="red" text>
              Reset Account
            </v-btn>
            <v-btn color="red" text>
              Checkout
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  export default {
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
          { text: 'KRH ID', value: 'krhid' },
          { text: 'Name', value: 'name' },
          { text: 'Username', value: 'username' },
          { text: 'In/Out', value: 'inout' },
          { text: '', value: 'data-table-expand' },
        ],
        dms: [
          {
            krhid: 'KRH-2018-22',
            name: 'Joseph Dominic Liao',
            username: 'DMDom',
            inout: 'IN',
          }
        ],
      }
    },
  }
</script>

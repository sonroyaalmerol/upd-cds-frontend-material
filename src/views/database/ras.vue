<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="ras"
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
                <v-btn tile block color="primary">Edit RA</v-btn>
              </v-col>
              <v-col>
                <v-btn tile block color="primary">Directives</v-btn>
              </v-col>
              <v-col>
                <v-btn color="red" dark tile block>Reset Account</v-btn>
              </v-col>
              <v-col>
                <v-btn color="red" dark tile block>Checkout</v-btn>
              </v-col>
            </v-row>
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
          { text: 'Student Number', value: 'upid' },
          { text: 'Name', value: 'name' },
          { text: 'Username', value: 'username' },
          { text: 'In/Out', value: 'inout' },
          { text: '', value: 'data-table-expand' },
        ],
        ras: [
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
        ],
      }
    },
  }
</script>
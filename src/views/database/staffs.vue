<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="staffs"
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
                <v-btn tile block color="primary">Edit Staff</v-btn>
              </v-col>
              <v-col>
                <v-btn color="red" dark tile block>Checkout</v-btn>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
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
      },
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
        expanded: [],
        singleExpand: false,
        headers: [
          { text: 'KRH ID', value: 'krhid' },
          { text: 'Name', value: 'name' },
          { text: 'Position', value: 'position' },
          { text: 'In/Out', value: 'inout' },
          { text: '', value: 'data-table-expand' },
        ],
        staffs: [
          {
            krhid: 'KRH-2018-34',
            name: 'Gemma Semeniano',
            position: 'Household Attendant III',
            inout: 'IN',
          }
        ],
      }
    },
  }
</script>

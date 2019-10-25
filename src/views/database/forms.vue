<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="forms"
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
                <v-btn tile block color="primary">Edit</v-btn>
              </v-col>
              <v-col>
                <v-btn tile block color="primary">Download Responses</v-btn>
              </v-col>
              <v-col>
                <v-btn tile block color="primary">Go Live</v-btn>
              </v-col>
              <v-col>
                <v-btn color="red" dark tile block>Delete Form</v-btn>
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
          { text: 'Title', value: 'title' },
          { text: 'Required', value: 'required' },
          { text: 'Posted By', value: 'postedBy' },
          { text: 'Timestamp', value: 'timestamp' },
          { text: '', value: 'data-table-expand' },
        ],
        forms: [
          {
            title: 'Attend Talk on Solid Waste Management',
            required: 'Required',
            postedBy: '5cb3e961808c214348087b62',
            timestamp: '2019-10-14T05:23:02.859Z',
          }
        ],
      }
    },
  }
</script>
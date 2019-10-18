<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="activities"
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
              Add IN Entry
            </v-btn>
            <v-btn text>
              Add OUT Entry
            </v-btn>
            <v-btn text>
              View Entries
            </v-btn>
            <v-btn color="red" text>
              Delete
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
          { text: 'Activity Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Category', value: 'category' },
          { text: '', value: 'data-table-expand' },
        ],
        activities: [
          {
            name: 'General Assembly 1',
            points: '10',
            category: 'General Assembly',
          }
        ],
      }
    },
  }
</script>

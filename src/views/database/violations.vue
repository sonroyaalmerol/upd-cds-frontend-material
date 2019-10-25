<template>
  <v-container>
    <ActionsPanel>
      <v-row>
        <v-col>
          <v-btn tile block color="primary">Add Violation</v-btn>
        </v-col>
        <v-col>
          <v-btn tile block color="primary">Review In/Out Entries</v-btn>
        </v-col>
        <v-col>
          <v-btn tile block color="primary">Review Permits</v-btn>
        </v-col>
        <v-col>
          <v-btn tile block color="primary">Export to CSV</v-btn>
        </v-col>
      </v-row>
    </ActionsPanel><br />
    <v-card>
      <v-data-table
        :headers="headers"
        :items="violations"
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
                <v-btn color="red" dark tile block>Delete</v-btn>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import ActionsPanel from '@/components/database/ActionsPanel'
  export default {
    components: {
      ActionsPanel
    },
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
          { text: 'Type', value: 'type' },
          { text: 'Details', value: 'details' },
          { text: 'timestamp', value: 'timestamp' },
          { text: '', value: 'data-table-expand' },
        ],
        violations: [
          {
            type: 'Minor Violation',
            details: 'Key Borrowing Violation',
            timestamp: '10/14/2019, 12:32:59 PM',
          }
        ],
      }
    },
  }
</script>
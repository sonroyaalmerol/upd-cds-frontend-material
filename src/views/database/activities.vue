<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel>
      <v-col>
        <ActivityForm />
      </v-col>
    </ActionsPanel>
    <v-card flat>
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
              rounded
              outlined
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
                <ActivityInOut block />
              </v-col>
              <v-col>
                <ActivityInOut out block />
              </v-col>
              <v-col>
                <v-btn rounded block color="primary" :to="`/database/activities/asd`">View Entries</v-btn>
              </v-col>
              <v-col>
                <v-btn color="red" dark rounded block>Delete</v-btn>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  const ActivityForm = () => import('@/components/database/ActivityForm')
  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const ActivityInOut = () => import('@/components/database/ActivityInOut')

  export default {
    components: {
      ActivityForm,
      ActionsPanel,
      ActivityInOut
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
        singleExpand: true,
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

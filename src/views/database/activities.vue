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
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <ActivityInOut block :activityId="item._id" />
              </v-col>
              <v-col>
                <ActivityInOut out block :activityId="item._id" />
              </v-col>
              <v-col>
                <v-btn rounded block color="primary" :to="`/database/activities/${item._id}`">View Entries</v-btn>
              </v-col>
              <v-col>
                <ConfirmButton color="red" block @action="deleteActivity(item)" :loading="deleting">Delete</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { activities, deleteActivity } from '@/utils/ekalayapi'

  const ActivityForm = () => import('@/components/database/ActivityForm')
  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const ActivityInOut = () => import('@/components/database/ActivityInOut')
  const ConfirmButton = () => import('@/components/general/ConfirmButton')

  export default {
    components: {
      ActivityForm,
      ActionsPanel,
      ActivityInOut,
      ConfirmButton
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
        return this.fetchData()
      },
      fetchData: async function() {
        this.loading = true
        this.activities = await activities()
        this.loading = false
      },
      deleteActivity(activity) {
        this.deleting = true
        deleteActivity(activity._id).then(() => {
          this.deleting = false
          this.$message('Successfully deleted activity!', 'success')
          this.activities = this.activities.filter((val) => val !== activity)
        })
      }
    },
    computed: {
      ...mapGetters([
        'roles',
        'uid',
        'profileid',
        'isCouncil'
      ]),
    },
    created() {
      if (this.roles === 0) {
        this.headers = [
          { text: 'Activity Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Category', value: 'category' },
          { text: 'Attended', value: 'attended' }
        ]
        if (this.isCouncil) {
          this.headers.push({ text: '', value: 'data-table-expand' })
        }
      }
      this.fetchData()
    },
    activated() {
      if (this.roles === 0) {
        this.headers = [
          { text: 'Activity Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Category', value: 'category' },
          { text: 'Attended', value: 'attended' }
        ]
        if (this.isCouncil) {
          this.headers.push({ text: '', value: 'data-table-expand' })
        }
      }
      this.fetchData()
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
        activities: [],
        loading: false,
        deleting: false
      }
    },
  }
</script>

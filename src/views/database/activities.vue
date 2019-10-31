<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles !== 0">
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
        :show-expand="roles !== 0 || isCouncil"
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
        <template v-if="roles !== 0 || isCouncil" v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <ActivityInOut :key="item._id" block :activityId="item._id" />
              </v-col>
              <v-col>
                <ActivityInOut :key="item._id" out block :activityId="item._id" />
              </v-col>
              <v-col v-if="roles !== 0">
                <v-btn :key="item._id" rounded block color="primary" :to="`/database/activities/${item._id}`">View Entries</v-btn>
              </v-col>
              <v-col v-if="roles !== 0">
                <ConfirmButton :key="item._id" color="red" block @action="deleteActivity(item)" :loading="deleting">Delete</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:item.attended="{ item }">
          <v-chip v-if="item._attendees.find(x => x._id === profileid)" tile class="ma-2" color="success">
            Attended
          </v-chip>
          <v-chip v-else tile class="ma-2" color="error">
            No attendance found
          </v-chip>
        </template>
        <template v-slot:item.category="{ value }">
          <v-chip v-if="value === 4" tile color="success" class="ma-2">
            Bonus
          </v-chip>
          <v-chip v-else-if="value === 0" tile color="error" class="ma-2">
            Major
          </v-chip>
          <v-chip v-else-if="value === 1" tile color="warning" class="ma-2">
            General Assembly
          </v-chip>
          <v-chip v-else-if="value === 2" tile color="warning" class="ma-2">
            Corridor Assembly
          </v-chip>
          <v-chip v-else-if="value === 3" tile color="warning" class="ma-2">
            Talks
          </v-chip>
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
          { text: 'Attended', value: 'attended' },
          { text: '', value: 'data-table-expand' }
        ]
      }
      this.fetchData()
    },
    activated() {
      if (this.roles === 0) {
        this.headers = [
          { text: 'Activity Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Category', value: 'category' },
          { text: 'Attended', value: 'attended' },
          { text: '', value: 'data-table-expand' }
        ]
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

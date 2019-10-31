<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles === 2">
      <v-col>
        <AddDirectivesButton :assistantId="assistant._id" @done="fetchData()" />
      </v-col>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="directives" :single-expand="singleExpand" :expanded.sync="expanded"
        :search="search" item-key="_id" show-expand @click:row="clicked" :loading="loading">
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field rounded outlined v-model="search" append-icon="mdi-account-search" label="Search" single-line hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col>
                <ConfirmButton :key="item._id" block color="primary" :loading="accomplishing" @action="accomplishDirective(item)" :disabled="!(roles === 1 && !item.done)">Accomplish</ConfirmButton>
              </v-col>
              <v-col v-if="roles === 2">
                <ConfirmButton :key="item._id" block color="error" :loading="deleting" @action="deleteDirective(item)">Delete</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:item.done="{ value }">
          <v-chip v-if="value" tile class="ma-2" color="success">
            Accomplished
          </v-chip>
          <v-chip v-else tile class="ma-2" color="error">
            Not yet accomplished
          </v-chip>
        </template>
        <template v-slot:item.doneOn="{ value }">
          {{ parseTimestamp(value) }}
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { directives, getAssistantById, deleteDirective, accomplishDirective } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'

  const ConfirmButton = () => import('@/components/general/ConfirmButton')
  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const AddDirectivesButton = () => import('@/components/database/AddDirectivesButton')

  export default {
    components: {
      ActionsPanel,
      AddDirectivesButton,
      ConfirmButton
    },
    computed: {
      ...mapGetters([
        'roles',
        'profileid'
      ]),
    },
    methods: {
      parseTimestamp(timestamp) {
        return timestamp ? format(parseISO(timestamp), 'MMMM d, yyyy | h:mm a') : 'N/A'
      },
      clicked(value) {
        if (this.expanded.includes(value)) {
          var index = this.expanded.indexOf(value);
          if (index > -1) {
            this.expanded.splice(index, 1);
          }
        } else {
          if (this.expanded.length > 0 && this.singleExpand) {
            this.expanded = []
          }
          this.expanded.push(value)
        }
      },
      onRefresh: function () {
        return this.fetchData()
      },
      fetchData: async function() {
        this.loading = true
        try {
          var promiseAcc = directives(this.$route.params.assistantId)
          var promiseAssistant = getAssistantById(this.$route.params.assistantId)
          const res = await Promise.all([promiseAcc, promiseAssistant])
          this.directives = res[0]
          this.assistant = res[1]
        } catch (err) {
          this.$message('Resident Assistant ID not found. Please try again!', 'error')
        }
        this.loading = false
      },
      deleteDirective(directive) {
        this.deleting = true
        deleteDirective(directive._id).then(() => {
          this.$message('Successfully deleted directive!', 'success')
          this.directives = this.directives.filter((val) => val !== directive)
          this.deleting = false
        })
      },
      accomplishDirective(directive) {
        this.accomplishing = true
        accomplishDirective(directive._id).then(() => {
          this.$message('Successfully accomplished directive!', 'success')
          this.fetchData()
          this.accomplishing = false
        })
      },
    },
    created() {
      if ((this.roles === 1 && this.profileid === this.$route.params.assistantId) || this.roles === 2 && this.$route.params.assistantId) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/database/directives/${this.profileid}` })
      }
    },
    activated() {
      if ((this.roles === 1 && this.profileid === this.$route.params.assistantId) || this.roles === 2 && this.$route.params.assistantId) {
        this.fetchData()
      } else {
        this.$router.push({ path: `/database/directives/${this.profileid}` })
      }
    },
    data() {
      return {
        search: '',
        expanded: [],
        singleExpand: true,
        headers: [{
            text: 'Details',
            value: 'details'
          },
          {
            text: 'Status',
            value: 'done'
          },
          {
            text: 'Date of Accomplishment',
            value: 'doneOn'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        directives: [],
        assistant: {},
        loading: false,
        accomplishing: false,
        deleting: false
      }
    },
  }
</script>
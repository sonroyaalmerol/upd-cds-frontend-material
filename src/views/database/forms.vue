<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ActionsPanel v-if="roles !== 0">
      <v-col>
        <CreateForm @done="fetchData()" />
      </v-col>
    </ActionsPanel>
    <v-card flat>
      <v-data-table :headers="headers" :items="forms" :single-expand="singleExpand" :expanded.sync="expanded"
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
                <CreateForm block :form="item" @done="fetchData()" />
              </v-col>
              <v-col>
                <v-btn rounded block color="primary">Download Responses</v-btn>
              </v-col>
              <v-col>
                <ConfirmButton :key="item._id" v-if="item.closed" block color="success" @action="openForm(item)" :loading="changingStatus">Go Live</ConfirmButton>
                <ConfirmButton :key="item._id" v-else block color="error" @action="closeForm(item)" :loading="changingStatus">Close Form</ConfirmButton>
              </v-col>
              <v-col>
                <ConfirmButton :key="item._id" color="red" block @action="deleteForm(item)" :loading="deletingForm">Delete Form</ConfirmButton>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:item.required="{ value }">
          <v-chip v-if="value" tile class="ma-2" color="success">
            Required
          </v-chip>
          <v-chip v-else tile class="ma-2" color="error">
            Not required
          </v-chip>
        </template>
        <template v-slot:item.timestamp="{ value }">
          {{ parseTimestamp(value) }}
        </template>
      </v-data-table>
    </v-card>
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { forms, deleteForm, openForm, closeForm } from '@/utils/ekalayapi'
  import { format, parseISO } from 'date-fns'

  const CreateForm = () => import('@/components/database/CreateForm')
  const ActionsPanel = () => import('@/components/database/ActionsPanel')
  const ConfirmButton = () => import('@/components/general/ConfirmButton')

  export default {
    components: {
      CreateForm,
      ActionsPanel,
      ConfirmButton
    },
    created() {
      this.fetchData()
    },
    methods: {
      parseTimestamp(timestamp) {
        return format(parseISO(timestamp), 'MMMM d, yyyy | h:mm a')
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
        this.forms = []
        this.forms = await forms()
        this.loading = false
      },
      deleteForm(form) {
        this.deletingForm = true
        deleteForm(form._id).then(() => {
          this.deletingForm = false
          this.forms = this.forms.filter((val) => val !== form)
          this.$message('Successfully deleted form!', 'success')
        })
      },
      closeForm(form) {
        this.changingStatus = true
        closeForm(form._id).then(() => {
          this.changingStatus = false
          this.fetchData()
          this.$message('Successfully closed form!', 'success')
        })
      },
      openForm(form) {
        this.changingStatus = true
        openForm(form._id).then(() => {
          this.changingStatus = false
          this.fetchData()
          this.$message('Successfully changed state of form to LIVE!', 'success')
        })
      },
    },
    computed: {
      ...mapGetters([
        'roles'
      ]),
    },
    data() {
      return {
        search: '',
        expanded: [],
        singleExpand: true,
        headers: [{
            text: 'Title',
            value: 'title'
          },
          {
            text: 'Required',
            value: 'required'
          },
          {
            text: 'Posted By',
            value: 'postedBy'
          },
          {
            text: 'Timestamp',
            value: 'timestamp'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        forms: [],
        deletingForm: false,
        changingStatus: false,
        loading: false
      }
    },
  }
</script>
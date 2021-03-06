<template>
  <v-card flat>
    <v-data-table :headers="headers" :items="permits" :single-expand="singleExpand" :expanded.sync="expanded"
      item-key="_id" show-expand @click:row="clicked" :loading="loading">
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col>
              <ConfirmButton color="red" @action="deletePermit(item)">Delete</ConfirmButton>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { format, parseISO } from 'date-fns'
  import { permits, deletePermit } from '@/utils/ekalayapi'

  const ConfirmButton = () => import('@/components/general/ConfirmButton')

  export default {
    components: {
      ConfirmButton
    },
    props: {
      permitType: Number
    },
    computed: {
      ...mapGetters([
        'roles',
        'isAthletePerformer'
      ])
    },
    data() {
      return {
        expanded: [],
        singleExpand: true,
        headers: [{
            text: 'Location',
            value: 'location'
          },
          {
            text: 'Reason',
            value: 'reason'
          },
          {
            text: 'Date/Time',
            value: 'dataOne'
          },
          {
            text: 'Approved by RA',
            value: 'approvedRA'
          },
          {
            text: 'Approved by DM',
            value: 'approvedDM'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        loading: false,
        permits: []
      }
    },
    activated() {
      this.fetchData()
    },
    methods: {
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
      async sortPermits(permit) {
        permit.approvedRA = `${this.integerToSymbols(permit.approvedRA)}${permit.remarksRA ? ' | ' + permit.remarksRA : ''}`
        permit.approvedDM = `${this.integerToSymbols(permit.approvedDM)}${permit.remarksDM ? ' | ' + permit.remarksDM : ''}`
        if (permit.permitType === 0) {
          permit.dataOne = format(parseISO(permit.dataTwo), 'h:mm a') + ', ' + format(parseISO(permit.dataOne), 'MM/dd/yyyy')
        } else if (permit.permitType === 1) {
          permit.dataOne = format(parseISO(permit.dataOne), 'MMMM d, yyyy') + ' - ' + format(parseISO(permit.dataTwo), 'MMMM d, yyyy')
        } else if (permit.permitType === 2) {
          permit.dataOne = format(parseISO(permit.dataTwo), 'h:mm a') + ', ' + format(parseISO(permit.dataOne), 'MMMM d, yyyy')
        } else if (permit.permitType === 5) {
          permit.dataOne = format(parseISO(permit.dataTwo), 'h:mm a') + ' the next day, ' + format(parseISO(permit.dataOne), 'MM/dd/yyyy')
        }
      },
      integerToSymbols(bool) {
        if (bool === 1) {
          return '✔'
        } else if (bool === 0) {
          return '✘'
        } else {
          return 'Not yet processed.'
        }
      },
      fetchData: async function() {
        this.loading = true
        if (this.permitType === 0) {
          var ln = await permits(this.permitType)
          var ln_special = await permits(5)
          this.permits = [...ln, ...ln_special]
        } else {
          this.permits = await permits(this.permitType)
        }
        
        Promise.all(this.permits.map(this.sortPermits)).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      deletePermit(permit) {
        var id = permit._id

        deletePermit(id).then(() => {
          this.$message('Successfully deleted permit!', 'success')
          this.permits = this.permits.filter((val) => val !== permit)
        })
      }
    }
  }
</script>
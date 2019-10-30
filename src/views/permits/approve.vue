<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ApplicationRules />
    <v-card flat>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab :key="`ln`">
          Late Night
        </v-tab>
        <v-tab :key="`on`">
          Overnight
        </v-tab>
        <v-tab :key="`em`">
          Early Morning
        </v-tab>
      </v-tabs>

      <v-tabs-items touchless v-model="tab">
        <v-tab-item :key="`ln`">
          <ApprovingList v-model="laten" :permitType="0" :loading="lnLoading" />
        </v-tab-item>
        <v-tab-item :key="`on`">
          <ApprovingList v-model="overn" :permitType="1" :loading="onLoading" />
        </v-tab-item>
        <v-tab-item :key="`em`">
          <ApprovingList v-model="earlym" :permitType="2" :loading="emLoading" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container-refresh>
</template>

<script>
  const ApplicationRules = () => import('@/components/permits/ApplicationRules')
  const ApprovingList = () => import('@/components/permits/ApprovingList')
  import { format, parseISO } from 'date-fns'
  import { permits } from '@/utils/ekalayapi'

  export default {
    components: {
      ApplicationRules,
      ApprovingList
    },
    created() {
      this.fetchData()
    },
    methods: {
      onRefresh: function () {
        return this.fetchData()
      },
      sortPermits(data) {
        var permit = data
        permit.pis = permit._resident._pis
        permit.name = `${permit._resident.firstName} ${permit._resident.lastName} (${permit._resident.upid})`
        permit.comments = ''
        if (permit.permitType === 0) {
          permit.dataOne = format(parseISO(permit.dataTwo), 'h:mm a') + ', ' + format(parseISO(permit.dataOne), 'MM/dd/yyyy')
        } else if (permit.permitType === 1) {
          permit.dataOne = format(parseISO(permit.dataOne), 'MMMM d, yyyy') + ' - ' + format(parseISO(permit.dataTwo), 'MMMM d, yyyy')
        } else if (permit.permitType === 2) {
          permit.dataOne = format(parseISO(permit.dataTwo), 'h:mm a') + ', ' + format(parseISO(permit.dataOne), 'MMMM d, yyyy')
        }
      },
      fetchData: async function() {
        const res = await Promise.all([permits(0), permits(1), permits(2)])
        this.laten = res[0]
        this.overn = res[1]
        this.earlym = res[2]
        this.lnLoading = false
        this.onLoading = false
        this.emLoading = false
        for (var x = 0; x < this.laten.length; x++) {
          this.sortPermits(this.laten[x])
          this.lnLoading = false
        }
        for (x = 0; x < this.overn.length; x++) {
          this.sortPermits(this.overn[x])
          this.onLoading = false
        }
        for (x = 0; x < this.earlym.length; x++) {
          this.sortPermits(this.earlym[x])
          this.emLoading = false
        }
      }
    },
    data() {
      return {
        tab: null,
        laten: [],
        overn: [],
        earlym: [],
        lnLoading: true,
        onLoading: true,
        emLoading: true
      }
    }
  }
</script>
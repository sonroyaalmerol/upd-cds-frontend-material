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
          <ViewPermitsTable :permit-type="0" ref="lnTable" />
        </v-tab-item>
        <v-tab-item :key="`on`">
          <ViewPermitsTable :permit-type="1" ref="onTable" />
        </v-tab-item>
        <v-tab-item :key="`em`">
          <ViewPermitsTable :permit-type="2" ref="emTable" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container-refresh>
</template>

<script>
  const ApplicationRules = () => import('@/components/permits/ApplicationRules')
  const ViewPermitsTable = () => import('@/components/permits/ViewPermitsTable')

  export default {
    components: {
      ApplicationRules,
      ViewPermitsTable
    },
    methods: {
      onRefresh: function () {
        var promises = []
        if (this.$refs.lnTable) {
          promises.push(this.$refs.lnTable.fetchData())
        }
        if (this.$refs.onTable) {
          promises.push(this.$refs.onTable.fetchData())
        }
        if (this.$refs.emTable) {
          promises.push(this.$refs.emTable.fetchData())
        }
        return Promise.all(promises)
      }
    },
    data() {
      return {
        tab: null
      }
    }
  }
</script>
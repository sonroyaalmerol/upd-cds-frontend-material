<template>
  <v-container-refresh :on-refresh="onRefresh">
    <ApplicationRules />
    <v-card>
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
          <ApprovingList v-model="testArray" :permitType="0" />
        </v-tab-item>
        <v-tab-item :key="`on`">
          <ApprovingList v-model="testArray" :permitType="1" />
        </v-tab-item>
        <v-tab-item :key="`em`">
          <ApprovingList v-model="testArray" :permitType="2" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container-refresh>
</template>

<script>
  const ApplicationRules = () => import(/* webpackPrefetch: true */ '@/components/permits/ApplicationRules')
  const ApprovingList = () => import(/* webpackPrefetch: true */ '@/components/permits/ApprovingList')

  export default {
    components: {
      ApplicationRules,
      ApprovingList
    },
    methods: {
      onRefresh: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve()
          }, 1000)
        })
      }
    },
    data() {
      return {
        tab: null,
        testArray: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      }
    }
  }
</script>
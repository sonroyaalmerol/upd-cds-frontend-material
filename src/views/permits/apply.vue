<template>
  <v-container>
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
          <Forms :permit-type="lnKey" />
        </v-tab-item>
        <v-tab-item :key="`on`">
          <Forms :permit-type="1" />
        </v-tab-item>
        <v-tab-item :key="`em`">
          <Forms :permit-type="emKey" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  const ApplicationRules = () => import('@/components/permits/ApplicationRules')
  const Forms = () => import('@/components/permits/Forms')

  export default {
    components: {
      ApplicationRules,
      Forms
    },
    computed: {
      ...mapGetters([
        'isAthletePerformer'
      ]),
      lnKey() {
        return this.isAthletePerformer ? 3 : 0
      },
      emKey() {
        return this.isAthletePerformer ? 4 : 2
      }
    },
    methods: {},
    data() {
      return {
        tab: null
      }
    }
  }
</script>
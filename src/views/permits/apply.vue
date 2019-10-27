<template>
  <v-container>
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
          <Forms :permit-type="0" />
        </v-tab-item>
        <v-tab-item :key="`on`">
          <Forms :permit-type="1" />
        </v-tab-item>
        <v-tab-item :key="`em`">
          <Forms :permit-type="2" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
  const ApplicationRules = () => import('@/components/permits/ApplicationRules')
  const Forms = () => import('@/components/permits/Forms')

  export default {
    components: {
      ApplicationRules,
      Forms
    },
    methods: {},
    data() {
      return {
        tab: null
      }
    }
  }
</script>
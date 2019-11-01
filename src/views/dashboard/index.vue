<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-row v-if="roles === 0">
      <Forms ref="formsComponent" />
    </v-row>
    <v-row v-if="roles !== 0">
      <v-col>
        <Banner :value="total_em + total_ln + total_on" :loading="lnLoading && onLoading && emLoading" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <PermitsNumber :permit-type="0" :value="total_ln" :loading="lnLoading" />
      </v-col>
      <v-col>
        <PermitsNumber :permit-type="1" :value="total_on" :loading="onLoading" />
      </v-col>
      <v-col>
        <PermitsNumber :permit-type="2" :value="total_em" :loading="emLoading" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="total_ln !== 0">
        <PermitsTable :permit-type="0" :value="laten" :loading="lnLoading" />
      </v-col>
      <v-col v-if="total_on !== 0">
        <PermitsTable :permit-type="1" :value="overn" :loading="onLoading" />
      </v-col>
      <v-col v-if="total_em !== 0">
        <PermitsTable :permit-type="2" :value="earlym" :loading="emLoading" />
      </v-col>
    </v-row>
    <v-row v-if="roles === 0">
      <v-col>
        <ViolationsTable :value="violations" :loading="violationsLoading" />
      </v-col>
      <v-col>
        <AccountabilitiesTable :value="accountabilities" :loading="accountabilitiesLoading" />
      </v-col>
    </v-row>
    <v-row v-else-if="roles === 1">
      <v-col>
        <DirectivesTable :value="directives" :loading="directivesLoading" />
      </v-col>
    </v-row>
  </v-container-refresh>
</template>

<script>
  const AccountabilitiesTable = () => import('@/components/dashboard/AccountabilitiesTable')
  const Banner = () => import('@/components/dashboard/Banner')
  const PermitsNumber = () => import('@/components/dashboard/PermitsNumber')
  const PermitsTable = () => import('@/components/dashboard/PermitsTable')
  const ViolationsTable = () => import('@/components/dashboard/ViolationsTable')
  const DirectivesTable = () => import('@/components/dashboard/DirectivesTable')
  const Forms = () => import('@/components/dashboard/Forms')

  import { permits, violations, accountabilities, directives } from '@/utils/ekalayapi'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      AccountabilitiesTable,
      Banner,
      PermitsNumber,
      PermitsTable,
      ViolationsTable,
      DirectivesTable,
      Forms
    },
    data: function() {
      return {
        lnLoading: true,
        onLoading: true,
        emLoading: true,
        accountabilitiesLoading: false,
        violationsLoading: false,
        directivesLoading: false,
        overn: [],
        laten: [],
        earlym: [],
        total_on: 0,
        total_em: 0,
        total_ln: 0,
        accountabilities: [],
        violations: [],
        directives: [],
        returnedkey: true
      }
    },
    activated() {
      this.fetchData()
    },
    computed: {
      ...mapGetters([
        'first_name',
        'last_name',
        'roles',
        'profileid'
      ])
    },
    methods: {
      onRefresh: function () {
        return this.fetchData()
      },
      fetchData: async function() {
        if (this.$refs.formsComponent) {
          this.$refs.formsComponent.fetchForms()
        }
        const res = await Promise.all([permits(0), permits(1), permits(2)])
        this.laten = res[0].slice(0, 5)
        this.overn = res[1].slice(0, 5)
        this.earlym = res[2].slice(0, 5)
        this.total_ln = res[0].length
        this.total_on = res[1].length
        this.total_em = res[2].length
        this.lnLoading = false
        this.onLoading = false
        this.emLoading = false
        if (this.roles === 0) {
          // TODO: in backend
          this.accountabilitiesLoading = true
          accountabilities(this.profileid).then((response) => {
            this.accountabilities = response.slice(0, 5)
            this.accountabilitiesLoading = false
            const len = this.accountabilities.filter(
              data => data.cleared === false
            ).length
            if (len) {
              /* this.$notify({
                title: 'Accountabilities',
                message: `You have ${len} unresolved ${len === 1 ? 'accountability' : 'accountabilities'}. Please settle them as soon as possible. Thank you!`,
                duration: 0
              }) */
            }
          })
          this.violationsLoading = true
          violations(this.profileid).then((response) => {
            this.violations = response.slice(0, 5)
            this.violationsLoading = false
          })
        } else if (this.roles === 1) {
          this.directivesLoading = true
          directives(this.profileid).then((response) => {
            this.directives = response.slice(0, 5)
            this.directivesLoading = false
            const len = this.directives.filter(
              data => data.done === false
            ).length
            if (len) {
              /* this.$notify({
                title: 'Directives from DM',
                message: `A friendly reminder that you have ${len} unresolved ${len === 1 ? 'directive' : 'directives'} from the Dorm Manager.`,
                duration: 0
              }) */
            }
          })
        }
      }
    },
  }
</script>
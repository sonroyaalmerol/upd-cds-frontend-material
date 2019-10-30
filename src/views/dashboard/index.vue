<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-row>
      <v-col>
        <Banner />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <PermitsNumber :permit-type="0" :value="0" />
      </v-col>
      <v-col>
        <PermitsNumber :permit-type="1" :value="0" />
      </v-col>
      <v-col>
        <PermitsNumber :permit-type="2" :value="0" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <PermitsTable :permit-type="0" />
      </v-col>
      <v-col>
        <PermitsTable :permit-type="1" />
      </v-col>
      <v-col>
        <PermitsTable :permit-type="2" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ViolationsTable />
      </v-col>
      <v-col>
        <AccountabilitiesTable />
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

  import { mapGetters } from 'vuex'

  export default {
    components: {
      AccountabilitiesTable,
      Banner,
      PermitsNumber,
      PermitsTable,
      ViolationsTable
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
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve()
          }, 1000)
        })
      }
    },
  }
</script>
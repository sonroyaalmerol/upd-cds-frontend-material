<template>
  <v-container-refresh :on-refresh="onRefresh">
    <KeyBorrowingList v-model="residents" :loading="loading" />
  </v-container-refresh>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { residents } from '@/utils/ekalayapi'

  const KeyBorrowingList = () => import('@/components/keyborrowing/KeyBorrowingList')

  export default {
    components: {
      KeyBorrowingList
    },
    data() {
      return {
        residents: [],
        loading: false
      }
    },
    computed: {
      ...mapGetters([
        'roles',
        'uid'
      ])
    },
    methods: {
      onRefresh: function () {
        return this.fetchData()
      },
      fetchMore: async function(resident) {
        var toOutput = resident
        toOutput.name = `${resident.firstName} ${resident.lastName}`
        if (resident._user) {
          toOutput.username = resident._user.username
        } else {
          toOutput.username = 'N/A'
        }
        if (resident._keyborrow) {
          toOutput.keyborrow = resident._keyborrow.returned
        } else {
          toOutput.keyborrow = true
        }
        this.residents.push(toOutput)
      },
      fetchData: async function() {
        this.loading = true
        this.residents = []
        var response = await residents()
        const promises = response.map(this.fetchMore)
        await Promise.all(promises)
        this.loading = false
      },
    },
    created() {
      this.fetchData()
    }
  }
</script>
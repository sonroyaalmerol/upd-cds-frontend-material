<template>
  <v-card flat tile>
    <ApprovingElement />
    <ApprovingElement />
    <ApprovingElement />
    <ApprovingElement />
  </v-card>
</template>

<script>
  import ApprovingElement from '@/components/permits/ApprovingElement'

  export default {
    components: {
      ApprovingElement
    },
    data: () => ({
      show: false,
    }),
  }
</script>
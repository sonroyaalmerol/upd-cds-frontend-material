<template>
  <v-card flat tile>
    <ApprovingElement :key="0" />
    <ApprovingElement :key="1" />
    <ApprovingElement :key="2" />
    <ApprovingElement :key="3" />
  </v-card>
</template>

<script>
  const ApprovingElement = () => import('@/components/permits/ApprovingElement')

  export default {
    components: {
      ApprovingElement
    },
    data: () => ({
      show: false,
    }),
  }
</script>
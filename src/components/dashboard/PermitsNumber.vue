<template>
  <v-card flat outlined :loading="loading">
    <v-card-text>
      <div>{{ permitName }} Permits</div>
      <p class="display-1 text--primary">
        {{ value }}
      </p>
      <p v-if="roles !== 0">more permits to approve</p>
      <p v-else>applied permits</p>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      permitType: {
        type: Number,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      loading: Boolean
    },
    computed: {
      ...mapGetters([
        'roles'
      ]),
      permitName() {
        var x = ''
        switch (this.permitType) {
          case 0:
            x = 'Late Night'
            break
          case 1:
            x = 'Overnight'
            break
          case 2:
            x = 'Early Morning'
            break
        }
        return x
      }
    }
  }
</script>
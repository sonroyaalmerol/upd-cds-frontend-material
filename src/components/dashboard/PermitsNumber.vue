<template>
  <v-card flat outlined>
    <v-card-text>
      <div>{{ permitName }} Permits</div>
      <p class="display-1 text--primary">
        {{ value }}
      </p>
      <p>more permits to approve</p>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      permitType: {
        type: Number,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    },
    computed: {
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
<template>
  <v-card flat outlined :loading="loading">
    <v-card-title>{{ permitName }} Permits</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Location</th>
            <th class="text-left">Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="permit in value" :key="permit._id">
            <td>{{ permit.location }}</td>
            <td>{{ permit.reason }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
        type: Array,
        required: true
      },
      loading: Boolean
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
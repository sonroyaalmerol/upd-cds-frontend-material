<template>
  <v-card flat outlined :loading="loading">
    <v-card-title>Accountabilities</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Reason</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="accountability in value" :key="accountability._id">
            <td>{{ accountability.reason }}</td>
            <td>
              <v-chip v-if="accountability.cleared" tile class="ma-2" color="success">
                Cleared (by: {{ accountability.clearedBy }})
              </v-chip>
              <v-chip v-else tile class="ma-2" color="error">
                Not cleared
              </v-chip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        required: true
      },
      loading: Boolean
    }
  }
</script>
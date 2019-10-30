<template>
  <v-card flat outlined :loading="loading">
    <v-card-title>Violations</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Type</th>
            <th class="text-left">Details</th>
            <th class="text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="violation in value" :key="violation._id">
            <td>
              <v-chip v-if="violation.ismajor" tile class="ma-2" color="error">
                Major Violation
              </v-chip>
              <v-chip v-else tile class="ma-2" color="warning">
                Minor Violation
              </v-chip>
            </td>
            <td>{{ violation.details }}</td>
            <td>{{ violation.timestamp }}</td>
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
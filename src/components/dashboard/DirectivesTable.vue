<template>
  <v-card flat outlined :loading="loading">
    <v-card-title>Directives</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Details</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="directive in value" :key="directive._id">
            <td>{{ directive.details }}</td>
            <td>
              <v-chip v-if="directive.done" tile class="ma-2" color="success">
                Accomplished
              </v-chip>
              <v-chip v-else tile class="ma-2" color="error">
                Not yet accomplished
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
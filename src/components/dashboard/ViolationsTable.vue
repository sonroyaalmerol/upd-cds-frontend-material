<template>
  <v-card flat outlined>
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
          <tr>
            <td>
              <v-chip tile class="ma-2" color="warning">
                Minor Violation
              </v-chip>
            </td>
            <td>Late Night Violation (8/29/2019, 12:13:30 AM)</td>
            <td>8/29/2019, 12:13:31 AM</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {

  }
</script>
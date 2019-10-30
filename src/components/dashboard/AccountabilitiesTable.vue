<template>
  <v-card flat outlined>
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
          <tr>
            <td>Payment (First Sem) - 4TH</td>
            <td>
              <v-chip tile class="ma-2" color="success">
                Cleared (by: Son Roy Almerol)
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

  }
</script>
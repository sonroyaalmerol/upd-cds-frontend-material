<template>
  <v-card flat outlined>
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
          <tr>
            <td>test</td>
            <td>
              <v-chip tile class="ma-2" color="error">
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

  }
</script>
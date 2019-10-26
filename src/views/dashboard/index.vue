<template>
  <v-container-refresh :on-refresh="onRefresh">
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <center>
              <br /><h1 class="text--primary">Good job! You have no pending permits!</h1><br />
            </center>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <div>Late Night Permits</div>
            <p class="display-1 text--primary">
              0
            </p>
            <p>more permits to approve</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text>
            <div>Overnight Permits</div>
            <p class="display-1 text--primary">
              0
            </p>
            <p>more permits to approve</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text>
            <div>Early Morning Permits</div>
            <p class="display-1 text--primary">
              0
            </p>
            <p>more permits to approve</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Location</th>
                  <th class="text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Test</td>
                  <td>Testing Reason</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Location</th>
                  <th class="text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Test</td>
                  <td>Testing Reason</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Location</th>
                  <th class="text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Test</td>
                  <td>Testing Reason</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
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
                    <v-chip
                      outlined
                      class="ma-2"
                      color="yellow"
                    >
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
      </v-col>
      <v-col>
        <v-card>
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
                    <v-chip
                      outlined
                      class="ma-2"
                      color="green"
                    >
                      Cleared (by: Son Roy Almerol)
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container-refresh>
</template>

<script>

export default {
  methods: {
    onRefresh: function() {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve()
        }, 1000)
      })
    }
  },
}
</script>

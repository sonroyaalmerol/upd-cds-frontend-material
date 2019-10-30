<template>
  <v-card v-if="!done" flat outlined class="mb-4">
    <v-card-text>
      <v-row>
        <v-col>
          <v-card flat class="mx-auto">
            <v-card-title>
              {{ data.name }}
            </v-card-title>
            <v-card-text>
              <v-chip class="mb-4">
                <div class="text--primary">
                  {{ data.dataOne }}
                </div>
              </v-chip>
              <h3>
                <div>{{ data.location }}</div>
                <div>{{ data.reason }}</div>
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card flat class="mx-auto">
            <v-card-text>
              <div class="text--primary">
                <div>Athlete/Perfomer: {{ booleanToSymbols(data._resident.isAthletePerformer) }}</div>
                <div>Leave alone: {{ booleanToSymbols(data._resident._pis.leave) }}</div>
                <div v-if="data.permitType === 0">Late Night: {{ booleanToSymbols(data._resident._pis.lateNight) }}</div>
                <template v-else-if="data.permitType === 1">
                  <div>Overnight: {{ booleanToSymbols(data._resident._pis.overnight) }}</div>
                  <div>Fieldtrip: {{ booleanToSymbols(data._resident._pis.fieldTrip) }}</div>
                </template>
                <template v-else-if="data.permitType === 2">
                  <div>Academic: {{ booleanToSymbols(data._resident._pis.applyPermitEMAcad) }} | {{ data._resident._pis.emTimeAcad }}</div>
                  <div>Non-academic: {{ booleanToSymbols(data._resident._pis.applyPermitEMNonAcad) }} | {{ data._resident._pis.emTimeNonAcad }}</div>
                  <div>Fieldtrip: {{ booleanToSymbols(data._resident._pis.fieldTrip) }}</div>
                </template>
                <div>Remarks: {{ booleanToSymbols(data._resident._pis.remarks) }}</div>
                <div v-if="roles === 2">
                  RA: {{ data.processedBy }}
                </div>
                <div v-if="roles === 2">
                  RA Comments: {{ data.remarksRA }}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row>
          <v-col>
            <ConfirmButton block color="green" @action="approvePermit">
              <v-icon>mdi-check</v-icon>
            </ConfirmButton>
          </v-col>
          <v-col>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn rounded dark block color="blue" v-on="on">
                  <v-icon>mdi-message-bulleted</v-icon>
                </v-btn>
              </template>
              <v-card flat outlined>
                <v-card-title>
                  <span class="headline">Remarks</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-textarea v-model="remarks" label="Remarks" hint="This can be seen by both the admin and the resident."
                      persistent-hint></v-textarea>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col>
            <ConfirmButton block color="red" @action="rejectPermit">
              <v-icon>mdi-close</v-icon>
            </ConfirmButton>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
  import { approvePermit, rejectPermit } from '@/utils/ekalayapi'
  const ConfirmButton = () => import('@/components/general/ConfirmButton')

  export default {
    components: {
      ConfirmButton
    },
    props: {
      data: {
        type: Object,
        required: true
      },
    },
    data: () => ({
      dialog: false,
      show: false,
      remarks: '',
      done: false
    }),
    methods: {
      booleanToSymbols(bool) {
        if (bool) {
          return '✔'
        } else {
          return '✘'
        }
      },
      approvePermit() {
        approvePermit(this.data._id, this.remarks).then(() => {
          this.$message('Successfully approved permit!', 'success')
          this.done = true
        })
      },
      rejectPermit() {
        rejectPermit(this.data._id, this.remarks).then(() => {
          this.$message('Successfully rejected permit!', 'success')
          this.done = true
        })
      }
    }
  }
</script>
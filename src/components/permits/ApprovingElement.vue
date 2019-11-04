<template>
  <v-card flat outlined class="mb-4">
    <v-row class="mx-1">
      <v-col>
        <v-card-title>
          {{ data.name }}
        </v-card-title>
        <v-card-text>
          <v-chip class="mb-4">
            <div class="text--primary">
              {{ data.dataOne }}
            </div>
          </v-chip>
          <div class="text--primary mb-3">{{ data.reason }} (<b>{{ data.location }}</b>)</div>
          <div class="text--primary">Leave alone: {{ booleanToSymbols(data._resident._pis.leave) }}</div>
          <div v-if="data.permitType === 0" class="text--primary">Late Night: {{ booleanToSymbols(data._resident._pis.lateNight) }}</div>
          <template v-else-if="data.permitType === 1">
            <div>Overnight: {{ booleanToSymbols(data._resident._pis.overnight) }}</div>
          </template>
          <template v-else-if="data.permitType === 2">
            <div class="text--primary">Academic: {{ booleanToSymbols(data._resident._pis.applyPermitEMAcad) }} | {{ data._resident._pis.emTimeAcad }}</div>
            <div class="text--primary">Non-academic: {{ booleanToSymbols(data._resident._pis.applyPermitEMNonAcad) }} | {{ data._resident._pis.emTimeNonAcad }}</div>
          </template>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-text>
          <div class="text--primary">
            <div>Athlete/Perfomer: {{ booleanToSymbols(data._resident.isAthletePerformer) }}</div>
            <div>Fieldtrip: {{ booleanToSymbols(data._resident._pis.fieldTrip) }}</div>
            <div>Remarks: {{ data._resident._pis.remarks }}</div>
            <div v-if="roles === 2">
              RA: {{ data.processedBy }}
            </div>
            <div v-if="roles === 2">
              RA Comments: {{ data.remarksRA }}
            </div>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
    <v-card-actions class="mx-8">
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
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'
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
    computed: {
      ...mapGetters([
        'roles',
      ])
    },
    data: () => ({
      dialog: false,
      show: false,
      remarks: ''
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
          this.$emit('done')
        })
      },
      rejectPermit() {
        rejectPermit(this.data._id, this.remarks).then(() => {
          this.$message('Successfully rejected permit!', 'success')
          this.$emit('done')
        })
      }
    }
  }
</script>
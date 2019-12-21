<template>
  <v-card flat outlined class="mb-4">
    <v-row class="mx-1">
      <v-col>
        <v-card-title>
          {{ data._profile.firstName }} {{ data._profile.lastName }} ({{ data._profile.upid }})
        </v-card-title>
        <v-card-text>
          <v-chip class="mb-4 mr-2">
            <div class="text--primary">
              {{ parseTimestamp(data.in) }}
            </div>
          </v-chip>
          <v-chip class="mb-4">
            <div class="text--primary">
              {{ parseTimestamp(data.out) }}
            </div>
          </v-chip>
          <div class="text--primary mb-3">Entry time length: <b>{{ timestampDistance(data.in, data.out) }}</b></div>
          <div>Estimated event time length: {{ stats.distances.mode }}</div>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-text>
          <div class="text--primary">
            <div><b>Statistics</b></div>
            <div>Earliest IN: {{ parseTimestamp(stats.in.min) }}</div>
            <div>Latest IN: {{ parseTimestamp(stats.in.max) }}</div>
            <div>Earliest OUT: {{ parseTimestamp(stats.out.min) }}</div>
            <div>Latest OUT: {{ parseTimestamp(stats.out.max) }}</div>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
    <v-card-actions class="mx-8">
      <v-row>
        <v-col>
          <ConfirmButton :key="data._id" rounded block color="primary" @action="confirmInOut(data, 1)" :loading="confirming">Full Points</ConfirmButton>
        </v-col>
        <v-col>
          <ConfirmButton :key="data._id" rounded block color="primary" @action="confirmInOut(data, 0.5)" :loading="confirming">Half Points</ConfirmButton>
        </v-col>
        <v-col>
          <ConfirmButton :key="data._id" rounded block color="primary" @action="confirmInOut(data, 0)" :loading="confirming">No Points</ConfirmButton>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { confirmActivityInOut } from '@/utils/ekalayapi'
  import { format, parseISO, formatDistance, differenceInMinutes } from 'date-fns'

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
      stats: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters([
        'roles',
      ])
    },
    data: () => ({
      confirming: false
    }),
    methods: {
      parseTimestamp(timestamp) {
        return timestamp ? format(parseISO(timestamp), 'MMMM d, yyyy | h:mm a') : 'N/A'
      },
      timestampDistance(x, y) {
        var hours = differenceInMinutes(parseISO(y), parseISO(x)) / 60
        var minutes = differenceInMinutes(parseISO(y), parseISO(x)) % 60
        return y ? `${~~hours} hours and ${minutes} minutes (${formatDistance(parseISO(x), parseISO(y))})` : 'No OUT timestamp!'
      },
      booleanToSymbols(bool) {
        if (bool) {
          return '✔'
        } else {
          return '✘'
        }
      },
      confirmInOut(entry, multiplier) {
        var entryCopy = entry
        entryCopy.multiplier = multiplier
        this.confirming = true
        confirmActivityInOut(entryCopy, entry._id).then(async () => {
          this.$message('Successfully confirmed entry!', 'success')
          this.confirming = false
          this.$emit('done')
        })
      }
    }
  }
</script>
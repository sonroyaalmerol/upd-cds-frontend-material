<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="800px">
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span class="headline">Global Settings</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <TimePicker v-model="form.permitCutOffTime" label="Permits Cut-off Time" />
          <TimePicker v-model="form.lateNightTime" label="Late Night Time" />
          <v-switch color="primary" v-model="form.enableUPFairPermits"
            label="Enable UP Fair Permits">
          </v-switch>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" rounded @click="updateSetting">Update Settings</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { set, getHours } from 'date-fns'
  import { getGlobalSetting, changeGlobalSetting } from '@/utils/ekalayapi'

  const TimePicker = () => import('@/components/general/TimePicker')
  export default {
    components: {
      TimePicker
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      profile: {
        type: Object,
        default: null
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.fetchSettings()
    },
    computed: {
      ...mapGetters([
        'profileid',
        'roles'
      ]),
      dialog: {
        get() {
          return this.value
        },
        set(dialog) {
          this.$emit('input', dialog)
        }
      },
      isMobileDevice() {
        return (typeof this.$windowOrientation !== "undefined") || (this.$userAgent.indexOf('IEMobile') !== -1);
      }
    },
    watch: {
      async dialog(next) {
        if (next === true) {
          await this.fetchSettings()
        }
      }
    },
    data: () => ({
      form: {
        permitCutOffTime: set(new Date(), {
          month: 0, date: 1, year: 1970, hours: 16, minutes: 0, seconds: 0, milliseconds: 0
        }),
        enableUPFairPermits: false,
        lateNightTime: set(new Date(), {
          month: 0, date: 1, year: 1970, hours: 22, minutes: 0, seconds: 0, milliseconds: 0
        }),
        _manager: ''
      },
      loading: false
    }),
    methods: {
      async fetchSettings() {
        var tempForm = await getGlobalSetting()
        if (tempForm) {
          this.form = tempForm
          this.form.lateNightTime = set(new Date(), {
            month: 0, date: 1, year: 1970, hours: tempForm.lateNightTime, minutes: 0, seconds: 0, milliseconds: 0
          })
        }
      },
      updateSetting: function () {
        this.loading = true
        var toUpdate = this.form
        toUpdate.lateNightTime = getHours(this.form.lateNightTime)
        toUpdate._manager = this.profileid
        toUpdate.timestamp = new Date()
        delete toUpdate._id
        changeGlobalSetting(toUpdate).then(() => {
          /* const index = this.residents.findIndex((resident) => { return resident._id == res._id })
          const name = this.residents[index].name
          const username = this.residents[index].username
          // add here for future profile statics that is not in profile
          this.residents[index] = res
          this.residents[index].name = name
          this.residents[index].username = username */
          this.$message('Successfully updated global settings!', 'success')
          this.dialog = false
          this.loading = false
        })
      }
    }
  }
</script>
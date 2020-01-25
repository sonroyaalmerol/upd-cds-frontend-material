<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="activityId" rounded :block="block" color="primary" v-on="on">Update Activity</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Create new Activity</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span v-if="activityId" class="headline">Update Activity</span>
        <span v-else class="headline">Create new Activity</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field rounded outlined v-model="activityForm.name" label="Activity Name" required></v-text-field>
          <v-row>
            <v-col>
              <NumberField v-model="activityForm.points" label="Points" />
            </v-col>
            <v-col>
              <v-select v-model="activityForm.category" rounded outlined :items="fieldTypes" label="Category"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text rounded @click="dialog = false">Close</v-btn>
        <v-btn v-if="activityId" color="primary" rounded @click="update">Update Activity</v-btn>
        <v-btn v-else color="primary" rounded @click="submit">Create new Activity</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { createActivity, getActivity, updateActivity } from '@/utils/ekalayapi'

  const NumberField = () => import('@/components/general/NumberField')

  export default {
    components: {
      NumberField
    },
    props: {
      activityId: {
        type: String,
        default: ''
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    created() {
      if (this.activityId) {
        this.loading = true
        getActivity(this.activityId).then((res) => {
          this.loading = false
          this.activityForm = res
        })
      }
    },
    data: () => ({
      dialog: false,
      activityForm: {
        name: '',
        points: 0,
        category: 0
      },
      fieldTypes:[
        {
          text: 'Major',
          value: 0
        },
        {
          text: 'General Assembly',
          value: 1
        },
        {
          text: 'Corridor Assembly',
          value: 2
        },
        {
          text: 'Talks',
          value: 3
        },
        {
          text: 'Bonus',
          value: 4
        }
      ],
      loading: false
    }),
    methods: {
      submit() {
        this.loading = true
        createActivity(this.activityForm).then(() => {
          this.$message('Successfully created activity!', 'success')
          this.activityForm = {
            name: '',
            points: 0,
            category: 1
          }
          this.$emit('done')
          this.loading = false
          this.dialog = false
        })
      },
      update() {
        this.loading = true
        updateActivity(this.activityForm, this.activityId).then(() => {
          this.$message('Successfully updated activity!', 'success')
          this.$emit('done')
          this.loading = false
          this.dialog = false
        })
      }
    }
  }
</script>
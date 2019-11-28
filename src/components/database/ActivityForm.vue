<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn  rounded :block="block" color="primary" v-on="on">Create new Activity</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span class="headline">Create new Activity</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field rounded outlined v-model="activityForm.name" :counter="10" label="Activity Name" required></v-text-field>
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
        <v-btn color="primary" rounded @click="submit">Create new Activity</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { createActivity } from '@/utils/ekalayapi'

  const NumberField = () => import('@/components/general/NumberField')

  export default {
    components: {
      NumberField
    },
    props: {
      block: {
        type: Boolean,
        default: false
      }
    },
    created() {

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
    }
  }
</script>
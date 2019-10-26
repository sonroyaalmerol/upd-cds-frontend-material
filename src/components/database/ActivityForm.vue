<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" tile :block="block" color="primary" v-on="on">Update Activity</v-btn>
      <v-btn v-else tile :block="block" color="primary" v-on="on">Create new Activity</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span v-if="profile" class="headline">Update Activity</span>
        <span v-else class="headline">Create new Activity</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field v-model="activityForm.name" :counter="10" label="Activity Name" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field v-model="activityForm.points" type="number" label="Points" append-outer-icon="mdi-plus" @click:append-outer="increment" prepend-icon="mdi-minus" @click:prepend="decrement"></v-text-field>
            </v-col>
            <v-col>
              <v-select :items="fieldTypes" label="Category"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" tile @click="dialog = false">Update Activity</v-btn>
        <v-btn v-else color="primary" tile @click="dialog = false">Create new Activity</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    components: {
    },
    props: {
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
      if (this.profile) {
        this.activityForm = this.profile
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
      ]
    }),
    methods: {
      increment () {
        this.activityForm.points = parseInt(this.activityForm.points,10) + 1
      },
      decrement () {
        this.activityForm.points = parseInt(this.activityForm.points,10) - 1
      }
    }
  }
</script>
<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="profile" rounded :block="block" color="primary" v-on="on">Update Form</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Create New Form</v-btn>
    </template>
    <v-card flat outlined>
      <v-card-title>
        <span v-if="profile" class="headline">Update Form</span>
        <span v-else class="headline">Create New Form</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field rounded outlined v-model="form.title" label="Title" required></v-text-field>
          <v-row>
            <v-col>
              <v-text-field rounded outlined v-model="form.numberOfFields" type="number" label="Number of Fields" append-outer-icon="mdi-plus" @click:append-outer="increment" prepend-icon="mdi-minus" @click:prepend="decrement"></v-text-field>
            </v-col>
            <v-col>
              <v-switch color="primary" v-model="form.isRequired" label="Response Required">
              </v-switch>
            </v-col>
          </v-row>
          <v-divider />
          <template v-for="index in form.numberOfFields">
            <br :key="index" />
            <v-text-field rounded outlined label="Field Name" :key="index" required></v-text-field>
            <v-text-field rounded outlined label="Field Description" :key="index" required></v-text-field>
            <v-row :key="index">
              <v-col>
                <v-select :items="fieldTypes" label="Field Type"></v-select>
              </v-col>
              <v-col>
                <v-switch color="primary" label="Field Required"></v-switch>
              </v-col>
            </v-row>
            <v-divider :key="index" />
          </template>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn v-if="profile" color="primary" rounded @click="dialog = false">Update Form</v-btn>
        <v-btn v-else color="primary" rounded @click="dialog = false">Create New Form</v-btn>
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
        this.form = this.profile
      }
    },
    data: () => ({
      dialog: false,
      form: {
        numberOfFields: 0,
        title: '',
        isRequired: false,
        birthday: '',
        displayPhoto: '',
        displayPhotoId: ''
      },
      fieldTypes:[
        {
          text: 'Text',
          value: 0
        },
        {
          text: 'Multiple Choice (one answer)',
          value: 1
        },
        {
          text: 'Multiple Choice (multiple answers)',
          value: 2
        }
      ]
    }),
    methods: {
      increment () {
        this.form.numberOfFields = parseInt(this.form.numberOfFields,10) + 1
      },
      decrement () {
        this.form.numberOfFields = parseInt(this.form.numberOfFields,10) - 1
      }
    }
  }
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }
</style>
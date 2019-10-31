<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="form" rounded :block="block" color="primary" v-on="on">Edit Form</v-btn>
      <v-btn v-else rounded :block="block" color="primary" v-on="on">Create New Form</v-btn>
    </template>
    <v-card flat outlined :loading="loading">
      <v-card-title>
        <span v-if="form" class="headline">Update Form</span>
        <span v-else class="headline">Create New Form</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field rounded outlined v-model="localForm.title" label="Title" required></v-text-field>
          <v-row>
            <v-col>
              <NumberField v-model="numberFields" label="Number of Fields" @change="resizeFormFields" />
            </v-col>
            <v-col>
              <v-switch color="primary" v-model="localForm.required" label="Response Required">
              </v-switch>
            </v-col>
          </v-row>
          <v-divider />
          <template v-for="index in numberFields">
            <v-text-field v-model="localForm.tempFields[index-1].name" rounded outlined :label="`Field #${index} Name`" :key="`${index}-name`" class="mt-2" required></v-text-field>
            <v-text-field v-model="localForm.tempFields[index-1].description" rounded outlined :label="`Field #${index} Description`" :key="`${index}-desc`" required></v-text-field>
            <v-row :key="`${index}-req-type`">
              <v-col>
                <v-select v-model="localForm.tempFields[index-1].type" rounded outlined :key="`${index}-type`" :items="fieldTypes" :label="`Field #${index} Type`"></v-select>
              </v-col>
              <v-col>
                <v-switch v-model="localForm.tempFields[index-1].required" :key="`${index}-req`" color="primary" :label="`Field #${index} Required`"></v-switch>
              </v-col>
            </v-row>
            <NumberField v-if="localForm.tempFields[index-1].type === 1 || localForm.tempFields[index-1].type === 2" :key="`${index}-nameChoice`" v-model="numberChoices[index-1]" :label="`Field #${index} Number of choices`" @change="resizeFormFields" />
            <template v-for="index2 in numberChoices[index-1]">
              <v-text-field rounded outlined v-if="localForm.tempFields[index-1].type === 1 || localForm.tempFields[index-1].type === 2" :key="`${index2}`" v-model="localForm.tempFields[index-1].choices[index2-1]" :label="`Choice #${index2} Name`" required></v-text-field>
            </template>
            <v-divider :key="`${index}-divider`" />
          </template>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded text @click="dialog = false">Close</v-btn>
        <v-btn v-if="form" color="primary" rounded @click="updateForm">Edit Form</v-btn>
        <v-btn v-else color="primary" rounded @click="createForm">Create New Form</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { createForm, updateForm } from '@/utils/ekalayapi'

  const NumberField = () => import('@/components/general/NumberField')

  const resizeArray = (arr, newSize, defaultValue) => {
    while (newSize > arr.length) {
      arr.push(defaultValue)
    }
    arr.length = newSize
  }

  export default {
    components: {
      NumberField
    },
    props: {
      form: {
        type: Object,
        default: null
      },
      block: {
        type: Boolean,
        default: false
      }
    },
    created() {
      if (this.form) {
        this.localForm = Object.assign({}, this.form)
        this.localForm.tempFields = this.localForm.fields
        this.numberFields = this.localForm.tempFields.length
        for (var x = 0; x < this.numberFields; x++) {
          this.numberChoices[x] = this.localForm.tempFields[x].choices.length
        }
        delete this.localForm.fields
      }
    },
    activated() {
      if (this.form) {
        this.localForm = Object.assign({}, this.form)
        this.localForm.tempFields = this.localForm.fields
        this.numberFields = this.localForm.tempFields.length
        for (var x = 0; x < this.numberFields; x++) {
          this.numberChoices[x] = this.localForm.tempFields[x].choices.length
        }
        delete this.localForm.fields
      }
    },
    data: () => ({
      dialog: false,
      numberFields: 1,
      numberChoices: [2],
      localForm: {
        title: '',
        required: true,
        tempFields: [{
          type: 0,
          name: '',
          description: '',
          choices: [''],
          required: false
        }]
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
        /* {
          text: 'Multiple Choice (multiple answers)',
          value: 2
        } */
      ],
      loading: false
    }),
    watch: {
      numberFields() {
        this.resizeFormFields()
      }
    },
    methods: {
      resizeFormFields: function() {
        const defaultField = {
          type: 0,
          name: '',
          description: '',
          choices: [],
          required: false
        }
        resizeArray(this.localForm.tempFields, this.numberFields, defaultField)
        resizeArray(this.numberChoices, this.numberFields, 2)
      },
      resizeChoices: function(index) {
        resizeArray(this.localForm.tempFields[index].choices, this.numberChoices[index], '')
      },
      createForm() {
        this.loading = true
        createForm(this.localForm).then(() => {
          this.$message('Successfully created form!', 'success')
          this.dialog = false
          this.loading = false
        })
      },
      updateForm() {
        this.loading = true
        updateForm(this.localForm, this.localForm._id).then(() => {
          this.$message('Successfully updated form!', 'success')
          this.dialog = false
          this.loading = false
        })
      },
    }
  }
</script>
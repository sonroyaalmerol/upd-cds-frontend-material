<template>
  <v-container v-if="forms.length !== 0">
    <template v-for="(form, index) in forms">
      <v-card v-if="!form.closed" :key="form._id" flat outlined class="mx-auto mb-4" :loading="formsLoading">
        <v-card-title>
          {{ form.title }} &nbsp;
          <v-chip v-if="form.required" tile class="ma-2" color="error">
            Required
          </v-chip>
          <v-chip v-else tile class="ma-2" color="warning">
            Not required
          </v-chip>
        </v-card-title>
        <v-card-text>
          <template v-for="field in form.fields">
            <v-tooltip v-if="field.description" bottom :key="field._id">
              <template v-slot:activator="{ on }">
                <v-text-field v-on="on" v-if="field.type === 0" rounded outlined v-model="responses[`${form._id}$%^${field._id}`]" :label="field.name" :required="field.required" />
                <v-select v-on="on" v-else-if="field.type === 1" rounded outlined v-model="responses[`${form._id}$%^${field._id}`]" :label="field.name" :required="field.required" :items="field.choices" />
              </template>
              <span>{{ field.description }}</span>
            </v-tooltip>
            <template v-else>
              <v-text-field v-if="field.type === 0" rounded outlined v-model="responses[`${form._id}$%^${field._id}`]" :key="field._id" :label="field.name" :required="field.required" />
              <v-select v-else-if="field.type === 1" rounded outlined v-model="responses[`${form._id}$%^${field._id}`]" :key="field._id" :label="field.name" :required="field.required" :items="field.choices" />
            </template>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="submitForm(form._id, index)" :loading="submitting">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { forms, addResponse } from '@/utils/ekalayapi'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      forms: [],
      responses: {},
      submitting: false,
      formsLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'profileid'
    ])
  },
  created() {
    this.fetchForms()
  },
  methods: {
    submitForm: function(id, index) {
      this.submitting = true
      var form = this.forms[index]
      var toSubmit = {}
      var keysToDelete = []
      for (var i = 0; i < form.fields.length; i++) {
        var field = form.fields[i]
        toSubmit[field._id] = this.responses[`${form._id}$%^${field._id}`]
        keysToDelete.push(`${form._id}$%^${field._id}`)
      }
      addResponse(toSubmit, id).then(() => {
        this.submitting = false
        this.$message('Successfully submitted form!', 'success')
        this.fetchForms()
        for (var i = 0; i < keysToDelete.length; i++) {
          var key = keysToDelete[i]
          delete this.responses[key]
        }
      })
    },
    fetchForms: function() {
      this.forms = []
      this.formsLoading = true
      forms(this.profileid).then(async (response) => {
        this.forms = response
        var required = this.forms.filter(form => {
          return form.required === true
        })
        if (required.length) {
          /* this.$notify({
            title: 'Required Forms',
            message: `You have ${required.length} unanswered ${required.length === 1 ? 'form' : 'forms'}. You are not allowed to submit any permits until the forms are answered. Thank you!`,
            duration: 0
          }) */
        }
        this.formsLoading = false
      })
    }
  }
}
</script>
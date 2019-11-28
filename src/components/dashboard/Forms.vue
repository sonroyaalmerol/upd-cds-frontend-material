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
          <v-form :ref="form._id" v-model="valid[form._id]" lazy-validation>
            <template v-for="field in form.fields">
              <v-text-field :key="field._id" v-if="field.type === 0 && field.required" rounded outlined v-model="responses[`${form._id}$%^${field._id}`]" :label="field.name" :rules="[rules.required]" :hint="field.description" persistent-hint />
              <v-text-field :key="field._id" v-else-if="field.type === 0 && !field.required" rounded outlined v-model="responses[`${form._id}$%^${field._id}`]" :label="field.name" :hint="field.description" persistent-hint />
              <v-select :key="field._id" v-else-if="field.type === 1 && field.required" rounded outlined v-model="responses[`${form._id}$%^${field._id}`]" :label="field.name" :rules="[rules.required]" :items="field.choices" :hint="field.description" persistent-hint />
              <v-select :key="field._id" v-else-if="field.type === 1 && !field.required" rounded outlined v-model="responses[`${form._id}$%^${field._id}`]" :label="field.name" :items="field.choices" :hint="field.description" persistent-hint />
            </template>
          </v-form>
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
      valid: {},
      submitting: false,
      formsLoading: false,
      rules: {
        required: value => !!value || 'Required field!'
      }
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
      var form = this.forms[index]
      if (this.$refs[form._id][0].validate()) {
        this.submitting = true
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
      }
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
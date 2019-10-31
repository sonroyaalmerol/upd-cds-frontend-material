<template>
  <v-dialog v-model="localShow" width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Privacy Policy</span>
      </v-card-title>
      <v-card-text>
        Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand
        how we collect, use, communicate and disclose and make use of personal information. The following outlines our
        privacy policy.
        <ul>
          <li>Before or at the time of collecting personal information, we will identify the purposes for which
            information is being collected.</li>
          <li>We will collect and use of personal information solely with the objective of fulfilling those purposes
            specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned
            or as required by law.</li>
          <li>We will only retain personal information as long as necessary for the fulfillment of those purposes.</li>
          <li>We will collect personal information by lawful and fair means and, where appropriate, with the knowledge
            or consent of the individual concerned.</li>
          <li>Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary
            for those purposes, should be accurate, complete, and up-to-date.</li>
          <li>We will protect personal information by reasonable security safeguards against loss or theft, as well as
            unauthorized access, disclosure, copying, use or modification.</li>
          <li>We will make readily available to customers information about our policies and practices relating to the
            management of personal information.</li>
        </ul>
        We are committed to conducting our business in accordance with these principles in order to ensure that the
        confidentiality of personal information is protected and maintained.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="localShow = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localShow: {
      get() {
        return this.value
      },
      set(localShow) {
        this.$emit('input', localShow)
      }
    }
  }
}
</script>
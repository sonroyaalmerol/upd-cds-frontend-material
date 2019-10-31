<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="localShow" width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Support Development</span>
      </v-card-title>
      <v-card-text>
        <p><b>eKalay</b>, previously known as CDS (Centralized Database System), started as a product of Kalayaan House Council 2015-2016 for the residents. It has been developed and maintained by one person only since then (that's me). This system is currently exclusive to Kalayaan Residence Hall and is not affiliated with any other organizations or offices in the UP System.</p>
        <p>There are many ways you can help out eKalay. One way is to <b>report bugs</b> and <b>suggest features</b> to the admin. Another way is to help me develop the system itself. Specifically, the <b>mobile app</b> of the system.</p>
        <b>Why?</b>
        <p>Almost everyone use their smartphones nowadays to access eKalay. Sadly, I am not a native mobile app developer. I may be able to develop one but I cannot guarantee as of now.</p>
        <b>How?</b>
        <p>For inquiries, email me at <b>sonraalmerol@addu.edu.ph</b>. Please do contact me if you are interested.</p>
        <p>Thanks for using the eKalay system!</p>
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
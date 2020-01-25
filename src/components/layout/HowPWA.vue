<template>
  <v-dialog style="-webkit-overflow-scrolling: touch" v-model="localShow" width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Progressive Web Application</span>
      </v-card-title>
      <v-card-text>
        <b>What is a Progressive Web App (PWA)?</b><br/><br/>
        <p>Progressive Web Apps (PWA) are hybrid web pages which can be downloaded to your device just like a native APP and
        are designed to mimic native APP user experiences.</p>
        <p>Once a user Installs or Adds to their Home Page — PWA’s behave just like APPs. While the number of mobile users is growing each day
        — slow connections are an everyday problem for many and result in a frustrating user experiences. PWA’s are a great solution thanks
        to faster loading speeds and since they can even work while offline.</p>
        <b>How to Add to Home Screen PWA to iPhone or Android?</b><br/><br/>
        <b>Android</b>
        <ol>
          <li>Open Chrome on your Android Mobile Device</li>
          <li>Go to the website (e.updkalay.com)</li>
          <li>Tap Settings (Top right corner) on Chrome</li>
          <li>Slide down and tap “Add to Home Screen.”</li>
        </ol><br/>
        <b>iOS (Apple)</b>
        <ol>
          <li>Open Safari on your iPhone</li>
          <li>Go to the website (e.updkalay.com)</li>
          <li>Tap the Share button on Safari</li>
          <li>Find by slide to the right “Add to Home Screen.”</li>
          <li>Tap it, then tap Add (top right)</li>
        </ol>
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
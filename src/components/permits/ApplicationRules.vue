<template>
  <v-card flat outlined class="mx-auto mb-4">
    <v-btn text block @click="show = !show">
      Permit Rules<v-spacer></v-spacer>
      <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          <b>General Rules</b>
          <ul>
            <li>The cut-off time for the online permits is 4:00 pm.</li>
            <li>All permits not filed by that time will be queued for the next day unless it's Friday.</li>
            <li>The online permits are closed during weekends.</li>
          </ul>
          <b>Weekday Permits</b>
          <ul>
            <li>These are permits applied from Monday to Thursday.</li>
            <li>Maximum of 1 permit per type per day</li>
          </ul>
          <b>Weekend Permits</b>
          <ul>
            <li>These are permits applied on Fridays, covering the following weekend.</li>
            <li>Maximum of 3 permits per type on Friday</li>
          </ul>
          <b>Overnight Permits</b>
          <ul>
            <li>This can only cover a maximum of 5 consecutive days.</li>
          </ul>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    components: {

    }
  }
</script>
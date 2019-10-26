<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Permit Rules</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-alert type="info" color="primary" elevation="0" outlined prominent>
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
        </v-alert>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    components: {

    }
  }
</script>
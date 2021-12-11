<template>
  <v-row>
    <v-col cols="12" md="6">
      <TotalCategory></TotalCategory>
    </v-col>
    <v-col cols="12" md="6">
      <TotalNotes></TotalNotes>
    </v-col>
    <v-col cols="12" md="6">
      <TodayEvent></TodayEvent>
    </v-col>
    <v-col cols="12" md="6">
      <WeeklyEvent></WeeklyEvent>
    </v-col>
    <v-col cols="12" md="6">
      <MonthlyEvent></MonthlyEvent>
    </v-col>
  </v-row>
</template>

<script>
// demos
import TotalCategory from './TotalCategory.vue'
import TotalNotes from './TotalNotes.vue'
import TodayEvent from './TodayEvent.vue'
import WeeklyEvent from './WeeklyEvent.vue'
import MonthlyEvent from './MonthlyEvent.vue'

export default {
  components: {
    TotalNotes,
    TotalCategory,
    TodayEvent,
    WeeklyEvent,
    MonthlyEvent,
  },
  setup() {
    return {}
  },
}
</script>

<template>
  <h2>Score: {{scores.grandTotal}}</h2>
  <table class="wellness-score-table">
    <thead>
      <th></th>
      <th v-for="(week, index) in activityStore.weeks" :key="index">VK {{ getWeek(week) }}</th>
    </thead>
    <tbody>
      <tr>
        <th>Points for week</th>
        <td v-for="(score, index) in scores.weekly" :key="index">{{score}}</td>
      </tr>
      <tr>
        <td>Points for Bingo</td>
        <td v-for="(score, index) in scores.bingo" :key="index">{{score}}</td>
      </tr>
      <tr>
        <td>Points total</td>
        <td v-for="(score, index) in scores.total" :key="index">{{score}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { useActivityStore } from "~/stores/activities";

  onMounted(() => {
    activityStore.countScore()
  })
  
  const activityStore = useActivityStore();
  const {scores} = storeToRefs(activityStore)

  function getWeek(week: {start: Date, end: Date}) {
    let date = week.start;
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

</script>
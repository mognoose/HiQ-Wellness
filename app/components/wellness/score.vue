<template>
  <h2>Score: {{scores.grandTotal}}</h2>
  <table class="wellness-score-table">
    <thead>
      <th></th>
      <th>VK 3</th>
      <th>VK 4</th>
      <th>VK 5</th>
      <th>VK 6</th>
      <th>VK 7</th>
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

</script>
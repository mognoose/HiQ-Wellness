<template>
  <div class="wellness-list">
    <div v-for="(activity, index) in list" :key="index">
      <div>
        {{ activities.filter(a => a.id === activity.id)[0].name }}
      </div>
      <div>
        {{ activity.date }}
      </div>
    </div>
  </div>
    <pre>
      {{list}}
    </pre>
</template>

<script setup lang="ts">
import { useActivityStore } from '#imports';

const activityStore = useActivityStore()
const activities = [...activityStore.activities]
const list = activityStore.loggedActivities

</script>
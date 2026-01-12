<template>
  <div class="wellness-list">
    <div class="wellness-row" v-for="activity in loggedActivities" :key="`${activity.date}-${activity.id}`">
      <div>
        {{ formatDate(activity.date) }}
      </div>
      <div>
        {{ activities.find(a => a.id === activity.id)?.name }}
      </div>
      <div @click="removeActivity(activity.date, activity.id)">
        <Icon name="mingcute:delete-2-line" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActivityStore, storeToRefs } from '#imports';

const activityStore = useActivityStore()
const { loggedActivities, activities } = storeToRefs(activityStore)

function formatDate(date:string) {
  const d = date.split('-')[2]
  const m = date.split('-')[1]
  const y = date.split('-')[0]

  return `${d}.${m}.${y}`
}

function removeActivity(date:string, id:string) {
  console.log('remove activity', date, id);
  activityStore.removeLoggedActivity(date, id)
}

</script>
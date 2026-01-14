<template>
  <div class="grid-item">
    <h3 :class="{ 'logged': isLoggedInCurrentWeek }">{{ activity.name}}</h3>
    <Icon :name="activity.icon" size="128px" :class="{ 'logged': isLoggedInCurrentWeek }" />
  </div>
</template>

<script setup lang="ts">
  import { useActivityStore } from '~/stores/activities';
  import { computed, watchEffect } from 'vue';
  import { storeToRefs } from 'pinia';

  const props = defineProps({
    activity: {
      type: Object,
      required: true,
    }
  })

  const store = useActivityStore();
  const { loggedActivities } = storeToRefs(store);

  const isLoggedInCurrentWeek = computed(() => {

    const today = new Date();
    const currentWeek = {
      start: new Date(new Date(today).setDate(today.getDate() - today.getDay() + 1)),
      end: new Date(new Date(today).setDate(today.getDate() - today.getDay() + 7)),
    }
    
    currentWeek.start.setHours(0, 0, 0, 0);
    currentWeek.end.setHours(23, 59, 59, 999);

    if (!currentWeek) return false;

    return loggedActivities.value.some(logged => {
      const loggedDate = new Date(logged.date);
      const weekStart = new Date(currentWeek.start);
      const weekEnd = new Date(currentWeek.end);
      return logged.id === props.activity.id && 
             loggedDate >= weekStart && 
             loggedDate <= weekEnd;
    });
  });

  watchEffect(() => {
    loggedActivities.value;
  });
</script>

<style scoped>
  .logged {
    opacity: 0.4;
  }
</style>
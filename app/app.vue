<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
  import { useActivityStore } from '#imports';
  
  const activityStore = useActivityStore();

  onMounted(() => {
    activityStore.loadFromLocalStorage();
  })
</script>

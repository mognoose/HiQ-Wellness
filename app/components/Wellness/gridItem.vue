<template>
  <div class="grid-item">
    <h3>{{ activity.name}}</h3>
    <Icon :name="activity.icon" size="128px" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    activity: {
      type: Object,
      required: true,
    }
  })
</script>
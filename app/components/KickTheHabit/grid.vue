<template>
  <div v-if="selected?.id" class="wellness-activity">
    <h2>Add activity</h2>

    <h3>{{ selected.name}}</h3>
    <Icon :name="selected.icon" size="128px" />
    <p>{{ selected.description }}</p>
    <form @submit.prevent="addActivity">
      <input
      type="date"
      id="createdAt"
      name="createdAt"
      v-model="date"
      :min="formatDateToInput(activityStore.period.start)"
      :max="formatDateToInput(activityStore.period.end)"
      />
      <button type="submit">Add</button>
      <button @click="resetActivity">Cancel</button>
    </form>
  </div>
  <div v-else class="kick-the-habit-grid">
    <KickTheHabitGridItem
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
      @click="setActivity(activity)"
      />
    </div>
</template>

<script setup lang="ts">
import { useActivityStore } from '~/stores/activities'
import type { WellnessActivity } from '~/types/wellnessActivity'

const activityStore = useActivityStore()
const timestamp = new Date();
const dd = String(timestamp.getDate()).padStart(2, '0')
const mm = String(timestamp.getMonth() + 1).padStart(2, '0')
const yyyy = timestamp.getFullYear()
const today = yyyy + '-' + mm + '-' + dd

const date = ref(today)
const activities = activityStore.activities

const selected = ref<WellnessActivity>({id: '', name: '', icon: '', description: ''})

function formatDateToInput(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${y}-${m}-${d}`;
}

function setActivity(activity:WellnessActivity) {
  selected.value.id = activity.id
  selected.value.name = activity.name
  selected.value.icon = activity.icon
  selected.value.description = activity.description
}

function resetActivity() {
  date.value = today
  selected.value.id = ''
  selected.value.name = ''
  selected.value.icon = ''
}

function addActivity() {
  activityStore.logActivity({id: selected.value.id, date: date.value})
  resetActivity()
}

</script>
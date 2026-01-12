import { defineStore } from 'pinia';
import type { WellnessActivity, LoggedActivity, WellnessScores } from '~/types/wellnessActivity';

interface ActivitiesState {
  activities: WellnessActivity[];
  loggedActivities: LoggedActivity[];
  scores: WellnessScores;
}

export const useActivityStore = defineStore('activities', {
  state: (): ActivitiesState => ({
    activities: <Array<WellnessActivity>>[
      {
        id: 'cardio',
        name: 'Cardio',
        icon: 'mingcute:run-fill',
        description: 'Brisk walk, running, cycling, skiing swimming etc.',
      },
      {
        id: 'strength',
        name: 'Strength Training',
        icon: 'mingcute:weightlifting-fill',
        description: 'Weight lifting, body weight exercises for strenght, pilates',
      },
      {
        id: 'anaerobic',
        name: 'Anaerobic Exercise',
        icon: 'mingcute:stair-stepper-fill',
        description: 'Sprinting in running, cycling, skiing, HIIT training etc.',
      },
      {
        id: 'stretching',
        name: 'Stretching',
        icon: 'mingcute:cooldown-fill',
        description: 'Streching, yoga, mobility training, balance training',
      },
      {
        id: 'sleep',
        name: 'Sleep',
        icon: 'mingcute:sleep-fill',
        description: '7 hours of sleep/night',
      },
      {
        id: 'mindfulness',
        name: 'Mindfulness',
        icon: 'mingcute:yoga-fill',
        description: '5 minutes of breathing exercise, short meditation, mindful walk in nature',
      },
      {
        id: 'eating',
        name: 'Healthy Eating',
        icon: 'mingcute:dinner-fill',
        description: 'Full day of healthy food choises',
      },
      {
        id: 'hobby',
        name: 'No-Screen Hobby',
        icon: 'mingcute:book-6-line',
        description: 'Reading a physical book, playing an instrument, drawing or crafts',
      },
      {
        id: 'social',
        name: 'Social Connection',
        icon: 'mingcute:teacup-fill',
        description: 'Live meeting with friends or colleagues',
      },
    ],
    loggedActivities: <Array<LoggedActivity>>[],
    scores: {
      weekly: [0,0,0,0,0],
      bingo: [0,0,0,0,0],
    }
  }),
  actions: {
    logActivity(activity: LoggedActivity) {
      this.loggedActivities.push(activity);
      this.saveToLocalStorage();
    },
    removeLoggedActivity(date: string, id: string) {
      this.loggedActivities = this.loggedActivities
        .filter(item => item.date !== date || item.id !== id)
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('loggedActivities', JSON.stringify(this.loggedActivities))
    },
    loadFromLocalStorage() {
      const storedActivities = localStorage.getItem('loggedActivities');
      this.loggedActivities = storedActivities ? JSON.parse(storedActivities) : [];
    }
  },
});

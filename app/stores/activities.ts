import { defineStore } from 'pinia';
import type { WellnessActivity } from '~/types/wellnessActivity';

interface loggedActivity {
  id: string;
  date: string;
}

interface ActivitiesState {
  activities: WellnessActivity[];
  loggedActivities: loggedActivity[];
}

export const useActivityStore = defineStore('cart', {
  state: (): ActivitiesState => ({
    activities: <Array<WellnessActivity>>[
      {
        id: 'cardio',
        name: 'Cardio',
        icon: 'mingcute:run-fill',
      },
      {
        id: 'strength',
        name: 'Strength Training',
        icon: 'mingcute:weightlifting-fill',
      },
      {
        id: 'anaerobic',
        name: 'Anaerobic Exercise',
        icon: 'mingcute:stair-stepper-fill',
      },
      {
        id: 'stretching',
        name: 'Stretching',
        icon: 'mingcute:cooldown-fill',
      },
      {
        id: 'sleep',
        name: 'Sleep',
        icon: 'mingcute:sleep-fill',
      },
      {
        id: 'mindfulness',
        name: 'Mindfulness',
        icon: 'mingcute:yoga-fill',
      },
      {
        id: 'eating',
        name: 'Healthy Eating',
        icon: 'mingcute:dinner-fill',
      },
      {
        id: 'hobby',
        name: 'No-Screen Hobby',
        icon: 'mingcute:book-6-line',
      },
      {
        id: 'social',
        name: 'Social Connection',
        icon: 'mingcute:teacup-fill',
      },
    ],
    loggedActivities: <Array<loggedActivity>>[]
  }),
  actions: {
    logActivity(activity: loggedActivity) {
      console.log('activity in store', activity);
      console.log('ids in store', this.activities.map(a => a.id));
      this.loggedActivities.push(activity);
      console.log('ids in store2', this.activities.map(a => a.id));

    },
    removeLoggedActivity(date: string) {
      this.loggedActivities = this.loggedActivities.filter((item) => item.date !== date);
    },
  },
});

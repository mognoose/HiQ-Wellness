import { defineStore } from 'pinia';
import type { WellnessActivity, LoggedActivity, WellnessScores } from '~/types/wellnessActivity';

interface ActivitiesState {
  period: Period;
  activities: WellnessActivity[];
  loggedActivities: LoggedActivity[];
  scores: WellnessScores;
  weeks: {start: Date, end: Date}[];
}

interface Period {
  start: Date;
  end: Date;
}

export const useActivityStore = defineStore('activities', {
  state: (): ActivitiesState => ({
    period: {
      start: new Date('2026-01-12'),
      end: new Date('2026-02-14'),
    },
    weeks: [],
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
      total: [0,0,0,0,0],
      grandTotal: 0,
    }
  }),
  actions: {
    logActivity(activity: LoggedActivity) {
      this.loggedActivities.push(activity);
      this.countScore();
      this.saveToLocalStorage();
    },
    removeLoggedActivity(date: string, id: string) {
      this.loggedActivities = this.loggedActivities
        .filter(item => item.date !== date || item.id !== id)
      this.countScore();
      this.saveToLocalStorage();
    },
    generateWeeks() {
      const weeklyRanges: { start: Date; end: Date }[] = [];
      const periodStart = new Date(this.period.start);
      const periodEnd = new Date(this.period.end);

      let currentWeekStart = new Date(periodStart);

      while (currentWeekStart <= periodEnd) {
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

        weeklyRanges.push({
          start: new Date(currentWeekStart),
          end: currentWeekEnd > periodEnd ? new Date(periodEnd) : currentWeekEnd,
        });

        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      }

      this.weeks = weeklyRanges;
    },
    countScore() {
      this.generateWeeks();
      const weeklyRanges: { start: Date; end: Date }[] = this.weeks;

      const weeklyScores: number[] = [];
      const bingoScores: number[] = [];
      const totalScores: number[] = [];

      for (const range of weeklyRanges) {
        const activitiesInWeek = this.loggedActivities.filter((activity) => {
          const activityDate = new Date(activity.date);
          return activityDate >= range.start && activityDate <= range.end;
        });

        const uniqueActivityIdsInWeek = new Set(
          activitiesInWeek.map((a) => a.id)
        );
        const weeklyScore = uniqueActivityIdsInWeek.size;
        weeklyScores.push(weeklyScore);

        if (weeklyScore === 9) {
          bingoScores.push(1);
          totalScores.push(10);
        } else {
          bingoScores.push(0);
          totalScores.push(weeklyScore);
        }
      }

      this.scores.weekly = weeklyScores;
      this.scores.bingo = bingoScores;
      this.scores.total = totalScores;
      this.scores.grandTotal = totalScores.reduce((partialSum, a) => partialSum + a, 0);
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

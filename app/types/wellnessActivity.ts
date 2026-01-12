export interface WellnessActivity {
  id: string,
  name: string,
  icon: string,
  description: string,
}

export interface LoggedActivity {
  id: string;
  date: string;
}

export interface WellnessScores {
  weekly: number[];
  bingo: number[];
}
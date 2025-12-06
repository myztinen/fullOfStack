export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
export type Visibility = "great" | "good" | "ok" | "poor";


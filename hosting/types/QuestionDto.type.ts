export type QustionDto = { queston: string; answer: string; id: string };

export interface Question {
  id: string;
  contents: string;
  level: number;
  category: string[];
}
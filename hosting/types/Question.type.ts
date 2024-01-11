export type QustionDto = { queston: string; answer: string; id: string };

export type QuestionRequest = { level: number, category: string[] }

export interface Question {
  id: string;
  contents: string;
  level: number;
  category: string[];
}
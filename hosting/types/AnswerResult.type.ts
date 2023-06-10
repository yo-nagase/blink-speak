export type AnswerResult = {
  id: string;
  grammer_score?: number;
  question?: string;
  natural_score?: number;
  comment_jpn?: string;
  comment_eng?: string;
  user_answer?: string;
  proposal_answer?: string;
  is_correct?: boolean;
  is_loading?: boolean;
  message?: string;
};

export enum QuestionType {
  Close,
  Open,
}

export interface Question {
  questionDescription: string;
  questionType: QuestionType;
  answer: string;
}

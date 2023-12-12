export enum QuestionType {
  Close = 'Close',
  Open = 'Open',
  Request = 'Request',
}

export interface Question {
  id: number;
  questionDescription: string;
  questionType: QuestionType;
  answer: string;
}

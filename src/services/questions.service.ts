import { Question } from '../types/services/question';
import http from '../utils/api';
import config from '../utils/config';

const getAllQuestions = () => {
  return http
    .get<Question[]>(config.api.endpoints.questions.allQuestions)
    .then((res) => res.data);
};

const removeQuestion = (id: number) => {
  return http
    .delete(config.api.endpoints.questions.removeUser(id))
    .then((res) => res.data);
};

const createQuestion = (data: Question) => {
  return http
    .post<Question>(config.api.endpoints.questions.createQuestion, data)
    .then((res) => res.data);
};

export const questionService = {
  getAllQuestions,
  removeQuestion,
  createQuestion,
};

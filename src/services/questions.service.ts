import { Question } from '../types/services/question';
import http from '../utils/api';
import config from '../utils/config';

const getAllQuestions = () => {
  return http
    .get<Question[]>(config.api.endpoints.questions.allQuestions)
    .then((res) => res.data);
};

export const questionSerive = {
  getAllQuestions,
};

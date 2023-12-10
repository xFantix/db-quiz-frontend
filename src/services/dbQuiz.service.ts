import http from '../utils/api';
import config from '../utils/config';

const configureDatabase = (payload: FormData) => {
  return http
    .post(config.api.endpoints.quizDatabase.configure, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
};

export const dbQuizService = {
  configureDatabase,
};

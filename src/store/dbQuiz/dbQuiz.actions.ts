import { createAsyncThunk } from '@reduxjs/toolkit';
import { dbQuizService } from '../../services/dbQuiz.service';
import { errorHandler } from '../hooks';

const configureDbQuiz = createAsyncThunk(
  'dbQuiz/configureDbQuiz',
  (data: FormData) => {
    return dbQuizService
      .configureDatabase(data)
      .then((data) => {
        return data;
      })
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

export const dbQuizActions = {
  configureDbQuiz,
};

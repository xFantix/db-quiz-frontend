import { createAsyncThunk } from '@reduxjs/toolkit';
import { questionSerive } from '../../services/questions.service';
import { errorHandler } from '../hooks';

const getAllQuestions = createAsyncThunk('questions/getAllQuestions', () => {
  return questionSerive
    .getAllQuestions()
    .then((data) => {
      return data;
    })
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error),
    );
});

export const questionActions = {
  getAllQuestions,
};

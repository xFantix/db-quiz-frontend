import { createAsyncThunk } from '@reduxjs/toolkit';
import { questionService } from '../../services/questions.service';
import { errorHandler } from '../hooks';
import { Question } from '../../types/services/question';

const getAllQuestions = createAsyncThunk('questions/getAllQuestions', () => {
  return questionService
    .getAllQuestions()
    .then((data) => {
      return data;
    })
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error),
    );
});

const removeQuestion = createAsyncThunk(
  'questions/removeQuestion',
  (id: number) => {
    return questionService
      .removeQuestion(id)
      .then(() => {
        return id;
      })
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

const createQuestion = createAsyncThunk(
  'questions/createQuestion',
  (data: Question) => {
    return questionService
      .createQuestion(data)
      .then((data) => {
        return data;
      })
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

export const questionActions = {
  getAllQuestions,
  removeQuestion,
  createQuestion,
};

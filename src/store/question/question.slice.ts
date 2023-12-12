import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestionStore } from '../../types/store/question.types';
import { questionActions } from './question.actions';
import { Question } from '../../types/services/question';

const initialState: QuestionStore = {
  questions: [],
};

export const questionSlice = createSlice({
  name: 'group',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      questionActions.getAllQuestions.fulfilled,
      (store: QuestionStore, action: PayloadAction<Question[]>) => {
        store.questions = action.payload;
      },
    );
    builder.addCase(
      questionActions.removeQuestion.fulfilled,
      (store: QuestionStore, action: PayloadAction<number>) => {
        store.questions = store.questions.filter(
          (el) => el.id !== action.payload,
        );
      },
    );
    builder.addCase(
      questionActions.createQuestion.fulfilled,
      (store: QuestionStore, action: PayloadAction<Question>) => {
        store.questions = [...store.questions, action.payload];
      },
    );
  },
  reducers: {},
});

export default questionSlice.reducer;

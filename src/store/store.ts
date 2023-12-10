import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import groupReducer from './group/group.slice';
import questionReducer from './question/question.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
    question: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

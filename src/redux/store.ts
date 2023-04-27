'use client';

import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/langSlice';
import vacanciesReducer from './vacancies/vacanciesSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    vacancies: vacanciesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


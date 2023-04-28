'use client';

import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/langSlice';
import vacanciesReducer from './vacancies/vacanciesSlice';
import { createWrapper, MakeStore, Context } from 'next-redux-wrapper';

export const store = configureStore<any>({
  reducer: {
    language: languageReducer,
    vacancies: vacanciesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const makeStore: MakeStore<RootState> = (context: Context) => store;

export const wrapper = createWrapper<RootState>(makeStore);
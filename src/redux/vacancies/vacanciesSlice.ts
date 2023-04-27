import { ActionReducerMapBuilder, AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getVacanciesPage, getVacancyBySlug } from './vacanciesOperations';

type InitialState = {
  vacanciesList: [];
  vacancyBySlug: [];
  loading: boolean;
  error: string;
};
type CallbackPending = (state: InitialState) => void;
type CallbackRejected = (state: InitialState, action: AnyAction) => void;

const initialState: InitialState = {
  vacanciesList: [],
  vacancyBySlug: [],
  loading: false,
  error: '',
};

const handlePending: CallbackPending = state => {
  state.loading = true;
};

const handleRejected: CallbackRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message ?? 'Unknown error';
};

export const vacanciesReducer = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder
      .addCase(getVacanciesPage.pending, handlePending)
      .addCase(getVacanciesPage.rejected, handleRejected)
      .addCase(getVacanciesPage.fulfilled, (state, action: PayloadAction<[]>) => {
        state.vacanciesList = action.payload;
        state.loading = false;
      });
    builder
      .addCase(getVacancyBySlug.pending, handlePending)
      .addCase(getVacancyBySlug.rejected, handleRejected)
      .addCase(getVacancyBySlug.fulfilled, (state, action: PayloadAction<[]>) => {
        state.vacancyBySlug = action.payload;
        state.loading = false;
      });
  },
});

export default vacanciesReducer.reducer;

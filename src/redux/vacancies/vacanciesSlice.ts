import { ActionReducerMapBuilder, AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getVacancies, getVacancyBySlug } from './vacanciesOperations';
import { IVacancy, IVacancyAttr } from '@/shared/types';

type InitialState = {
  vacanciesList: [];
  vacancyBySlug: IVacancy;
  loading: boolean;
  error: string;
};
type CallbackPending = (state: InitialState) => void;
type CallbackRejected = (state: InitialState, action: AnyAction) => void;

const initialState: InitialState = {
  vacanciesList: [],
  vacancyBySlug: {
    id: 0,
    attributes: {
      title: '',
      subTitle: '',
      cardDescription: '',
      isHot: false,
      vacancySlug: '',
      videoLink: '',
      categories: {
        data: []
      }
    }
  },
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
      .addCase(getVacancies.pending, handlePending)
      .addCase(getVacancies.rejected, handleRejected)
      .addCase(getVacancies.fulfilled, (state, action: PayloadAction<[]>) => {
        state.vacanciesList = action.payload;
        state.loading = false;
      });
    builder
      .addCase(getVacancyBySlug.pending, handlePending)
      .addCase(getVacancyBySlug.rejected, handleRejected)
      .addCase(getVacancyBySlug.fulfilled, (state, action: PayloadAction<IVacancy>) => {
        state.vacancyBySlug = action.payload;
        state.loading = false;
      });
  },
});

export default vacanciesReducer.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getVacancies } from './vacanciesOperations';

type InitialState = {
  vacanciesList: [];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  vacanciesList: [],
  loading: false,
  error: '',
};

export const vacanciesReducer = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getVacancies.pending, state => {
      state.loading = true;
    });
    builder.addCase(getVacancies.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload.error.message ?? 'Unknown error';
    });
    builder.addCase(getVacancies.fulfilled, (state, action: PayloadAction<[]>) => {
      state.vacanciesList = action.payload;
      state.loading = false;
    });
  },
});

export default vacanciesReducer.reducer;

import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const handleRejected = (state: InitialState, action: AnyAction) => {
  state.loading = false;
  state.error = action.error.message ?? 'Unknown error';
};

export const vacanciesReducer = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getVacancies.pending, state => {
      state.loading = true;
    });
    builder.addCase(getVacancies.rejected, handleRejected);
    builder.addCase(getVacancies.fulfilled, (state, action: PayloadAction<[]>) => {
      state.vacanciesList = action.payload;
      state.loading = false;
    });
  },
});

export default vacanciesReducer.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { getVacancies } from './vacanciesOperations';
// import axios from 'axios';

interface VacanciesState {
  vacanciesList: [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: VacanciesState = {
  vacanciesList: [],
  loading: 'idle',
};

export const vacanciesReducer = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    // getVacancies: async (state, action: PayloadAction<string>) => {
    //   try {
    //     const res = await axios.get(
    //       `${API}/vacancies?locale=RU&${requestPagStart}=0&${requestPagLimit}=-1&populate=*`
    //     );
    //     console.log(res.data.data);
    //     return res.data.data;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  },

  //   extraReducers: builder => {
  //     builder.addCase(getVacancies.pending, state => {
  //       state.loading = 'pending';
  //     });
  //     builder.addCase(getVacancies.rejected, state => {
  //       state.loading = 'failed';
  //     });
  //     builder.addCase(getVacancies.fulfilled, (state, action) => {
  //       state.vacanciesList = action.payload;
  //       state.loading = 'succeeded';
  //     });
  //   },
});

// export const { getVacancies } = vacanciesReducer.actions;

export default vacanciesReducer.reducer;

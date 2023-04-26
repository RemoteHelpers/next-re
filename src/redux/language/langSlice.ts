import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LangState {
  lang: string;
}

const initialState: LangState = {
  lang: 'RU',
};

export const languageReducer = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = languageReducer.actions;

export default languageReducer.reducer;

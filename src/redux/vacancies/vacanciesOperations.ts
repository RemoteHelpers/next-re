import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../language/langSelectors';

export const getVacancies: AsyncThunk<any, string, any> = createAsyncThunk(
  'vacancies/getVacancies',
  async (lang: string) => {
    console.log('file: vacanciesOperations.ts:9 ~ lang >>', lang);

    try {
      const res = await axios.get(
        `https://strapi.rem-s.com/api/vacancies?populate=*&locale=${lang}`
      );

      console.log('res.data.data >>', res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

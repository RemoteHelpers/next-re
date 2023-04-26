import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getVacancies: AsyncThunk<any, string, any> = createAsyncThunk(
  'vacancies/getAll',
  async (lang: string) => {
    try {
      const res = await axios.get(
        `https://strapi.rem-s.com/api/vacancies?populate=*&locale=${lang}`
      );

      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

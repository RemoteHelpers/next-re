import axios from 'axios';
import { API } from '@/constants';

const instance = axios.create({ baseURL: API, params: { populate: '*' } });

export const getMetadata = async () => {
  try {
    const { data } = await instance.get('/app-metadata');
    return data.data.attributes;
  } catch (error) {
    return error;
  }
};

import axios from 'axios';
import { API } from '@/constants';

const homeDataInstance = axios.create({
  baseURL: API,
});

export const getThankYouData = async (lang: string) => {
  try {
    const res = await homeDataInstance.get(`/thank-you?locale=${lang}&populate=*`);

    return res.data.data.attributes;
  } catch (error) {
    console.error('Error >>> ', error);
    return null;
  }
};

import axios from 'axios';
import { API, requestPagStart, requestPagLimit } from '@/constants';

export const getVacancies = async () => {
  try {
    const res = await axios.get(
      `${API}/vacancies?locale=RU&${requestPagStart}=0&${requestPagLimit}=-1&populate=*`
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

import axios from 'axios';
import { API } from '@/constants';
import type { IFeedbackFormData, IUploadFile } from '@/shared/types/FormTypes';

axios.defaults.baseURL = API;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const Api = {
  async feedBackForm(data: IFeedbackFormData): Promise<{
    id: number;
    attributes: IFeedbackFormData;
  }> {
    const res = await axios.post('/form-users', { data });
    return res.data.data;
  },

  async uploadFile(data: IUploadFile) {
    const res = await axios.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res?.data?.length !== 0) return res.data;
    return [];
  },
};

export default Api;

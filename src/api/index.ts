import axios from "axios";
import { API } from "@/constants";
import { TFeedbackFormData, TUploadFile } from "@/shared/types/FormFieldsTypes";

axios.defaults.baseURL = API;
axios.defaults.headers.post["Content-Type"] = "application/json";

const Api = {
  async feedBackForm(data: TFeedbackFormData): Promise<{
    id: number;
    attributes: TFeedbackFormData;
  }> {
    const res = await axios.post("/form-users", { data });

    return res.data.data;
  },

  async uploadFile(data: TUploadFile) {
    const res = await axios.post("/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res?.data?.length !== 0) {
      return res.data;
    }

    return []
  },
};

export default Api;
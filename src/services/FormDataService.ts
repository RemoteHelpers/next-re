import axios from "axios";
import { API } from "@/constants";

const formDataInstance = axios.create({
  baseURL: API,
});

export const getFormData = async (lang: string) => {
  try {
    const res = await formDataInstance.get(
      `/form?locale=${lang}&populate=*`
    );

    return res.data.data.attributes;
  } catch (error) {
    console.error("Error >>> ", error);
    return error;
  }
};
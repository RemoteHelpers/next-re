import axios from "axios";
import { API } from "@/constants";

const homeDataInstance = axios.create({
  baseURL: API,
});

export const getContactData = async (lang: string) => {
  try {
    const res = await homeDataInstance.get(
      `/contact?locale=${lang}&populate=Recruiters.img`
    );

    return res.data.data.attributes;
  } catch (error) {
    console.error("Error >>> ", error);
    return error;
  }
};

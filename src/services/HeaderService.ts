import axios from "axios";
import { API } from "@/constants";

const axiosInstance = axios.create({
	baseURL: API,
});

export const getHeaderData = async (lang: string) => {
	try {
		const res = await axiosInstance.get(`/header?locale=${lang}&populate=*`);
		return res.data.data.attributes as Promise<[]>;
	} catch (error) {
		console.error(error);
		return error;
	}
};

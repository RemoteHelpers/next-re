import axios from "axios";

import { API } from "@/constants";

const homeDataInstance = axios.create({
	baseURL: API,
});

export const getHomeData = async (lang: string, pop: string = "*") => {
	const params = {
		populate: pop,
	};
	try {
		const res = await homeDataInstance.get(
			`/home-page?locale=${lang}`,
			{ params }
		);
		return res.data.data.attributes;
	} catch (error) {
		console.error("Error >>> ", error);
		return error;
	}
};

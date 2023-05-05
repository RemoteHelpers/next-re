import axios from "axios";

import { API } from "@/constants";

const homeDataInstance = axios.create({
	baseURL: API,
});

export const getHomeData = async (lang: string) => {
	try {
		const res = await homeDataInstance.get(
			`/home-page?locale=${lang}&populate=Testimonials.personImg,Faq_Question,partnersSlider,heroStats.heroStatIcon`
		);

		return res.data.data.attributes;
	} catch (error) {
		console.error("Error >>> ", error);
		return error;
	}
};

import { IVacancy } from "@/shared/types";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getVacancies: AsyncThunk<any, string, any> = createAsyncThunk(
	"vacancies/getVacancies",
	async (lang: string): Promise<IVacancy[]> => {
		try {
			const res = await axios.get(
				`https://strapi.rem-s.com/api/vacancies?populate=*&locale=${lang}`
			);
			// console.log(res.data.data);
			return res.data.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

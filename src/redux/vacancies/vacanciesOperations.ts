import { AnyAction, AsyncThunk, Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API, requestPagStart, requestPagLimit } from "@/constants";

type AllVacansParams = {
	lang: string;
	pageStart?: number;
	perPage?: number;
};
type VacansyBySlugParams = {
	lang: string;
	slug: string;
};
type AsyncThunkConfig = {
	state?: unknown;
	dispatch?: Dispatch<AnyAction>;
	extra?: unknown;
	rejectValue?: unknown;
	serializedErrorType?: unknown;
	pendingMeta?: unknown;
	fulfilledMeta?: unknown;
	rejectedMeta?: unknown;
};

const vacanciesInstance = axios.create({
	baseURL: API,
});

export const getVacancies: AsyncThunk<any, AllVacansParams, AsyncThunkConfig> =
	createAsyncThunk(
		"vacancies/getPerPage",
		async ({ lang, pageStart = 0, perPage = 25 }, thunkApi) => {
			try {
				const res = await vacanciesInstance.get(
					`/vacancies?populate=*&locale=${lang}&${requestPagStart}=${pageStart}&${requestPagLimit}=${perPage}`
				);

				return res.data.data as Promise<{}>;
			} catch (error) {
				console.error(error);
				return thunkApi.rejectWithValue((error as Error).message);
			}
		}
	);

export const getVacancyBySlug: AsyncThunk<
	any,
	VacansyBySlugParams,
	AsyncThunkConfig
> = createAsyncThunk(
	"vacancies/getBySlug",
	async ({ lang, slug }, thunkApi) => {
		try {
			const res = await vacanciesInstance.get(
				`/vacancies?populate=*&locale=${lang}&filters[vacancySlug][$eq]=${slug}`
			);

			return res.data.data as Promise<{}>;
		} catch (error) {
			console.error(error);
			return thunkApi.rejectWithValue((error as Error).message);
		}
	}
);

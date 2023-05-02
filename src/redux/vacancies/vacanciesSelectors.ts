import type { RootState } from '@/redux/store';

export const selectVacancies = (state: RootState) => state.vacancies.vacanciesList;
export const selectVacancyBySlug = (state: RootState) => state.vacancies.vacancyBySlug;

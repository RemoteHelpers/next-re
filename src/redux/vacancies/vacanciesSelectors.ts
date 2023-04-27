import type { RootState } from '@/redux/store';

export const selectVacanciesPage = (state: RootState) => state.vacancies.vacanciesList;
export const selectVacancyBySlug = (state: RootState) => state.vacancies.vacancyBySlug;

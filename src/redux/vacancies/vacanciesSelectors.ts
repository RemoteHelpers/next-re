import type { RootState } from '@/redux/store';

export const selectLanguage = (state: RootState) => state.vacancies.vacanciesList;

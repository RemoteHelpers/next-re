import {
	FC,
	useEffect,
	useState,
	ReactElement,
	useContext,
	useCallback,
} from "react";
import { useRouter } from "next/router";
import s from "./VacanciesList.module.scss";
import type { PaginationInfo } from "../../../Vacancies/Vacancies";
import type {
	IVacanciesInfo,
	IVacancy,
	IVacancyKeywordTag,
} from "@/shared/types/VacanciesTypes";
import { VacancyItem } from "./components/VacancyItem";
import { Oops } from "./components/Oops/Oops";
import { GlobalContext } from "@/context";

type Props = {
	vacanciesInfo: IVacanciesInfo;
	currentCategory: string;
	searchQuery: string;
	paginationConfig: PaginationInfo;
	isHot: boolean;
};

export const VacanciesList: FC<Props> = ({
	vacanciesInfo,
	currentCategory,
	searchQuery,
	paginationConfig,
	isHot,
}) => {
	const { vacancies } = useContext(GlobalContext);
	const [vacanciesList, setVacanciesList] = useState(vacancies);
	const { vacansPerPage, currentPage, setTotalPages } = paginationConfig;
	const { locale } = useRouter();

	useEffect(() => {
		setVacanciesList(vacancies);
	}, [vacancies]);

	const changeTotalPages = (): void =>
		setTotalPages(Math.ceil(vacanciesList.length / vacansPerPage));

	const slicePerPage = (vacansArr: ReactElement[]): ReactElement[] => {
		const skipIndex = currentPage > 1 ? vacansPerPage * (currentPage - 1) : 0;
		const limitIndex = skipIndex + vacansPerPage;
		const sliced = vacansArr.slice(skipIndex, limitIndex);
		return sliced;
	};

	const sortByHot = useCallback((a: IVacancy, b: IVacancy): -1 | 1 | 0 => {
		if (a.attributes.isHot && !b.attributes.isHot) return -1;
		if (!a.attributes.isHot && b.attributes.isHot) return 1;
		return 0;
	}, []);

	const sortByDate = useCallback((a: IVacancy, b: IVacancy): number => {
		return (
			new Date(b.attributes.updatedAt).getTime() -
			new Date(a.attributes.updatedAt).getTime()
		);
	}, []);

	const hotVacancies = useCallback(() => {
		if (vacancies.length) {
			return vacancies.filter((el: IVacancy) => el.attributes.isHot);
		} else {
			return [];
		}
	}, [vacancies]);

	const vacanciesBySearch = useCallback(() => {
		return vacancies
			.filter(
				({ attributes }: IVacancy) =>
					attributes.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					attributes.vacancySlug
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					attributes.keyword_tags.data.some((keyword: IVacancyKeywordTag) =>
						keyword.attributes.keyPhrase
							.toLowerCase()
							.includes(searchQuery.toLowerCase())
					)
			)
			.sort(sortByDate)
			.sort(sortByHot);
	}, [vacancies, searchQuery]);

	const vacanciesByCategory = useCallback((): IVacancy[] => {
		if (vacancies.length) {
			return vacancies
				?.filter(
					(el: IVacancy) =>
						el.attributes.categories.data[0].attributes.categoryTitle ===
						currentCategory
				)
				.sort(sortByDate)
				.sort(sortByHot);
		} else {
			return [];
		}
	}, [vacancies, currentCategory]);

	const vacanicesByDate = useCallback((): IVacancy[] => {
		if (vacancies.length) {
			const allVacans = vacancies;
			return allVacans.sort(sortByDate);
		} else {
			return [];
		}
	}, [vacancies]);

	useEffect(() => {
		changeTotalPages();
	});

	useEffect(() => {
		if (searchQuery) setVacanciesList(vacanciesBySearch());
		else if (currentCategory) setVacanciesList(vacanciesByCategory());
		else if (isHot) setVacanciesList(hotVacancies());
		else if (!isHot) setVacanciesList(vacanicesByDate());
	}, [isHot, currentCategory, searchQuery, locale]);

	return (
		<ul className={s.list}>
			{vacanciesList.length ? (
				slicePerPage(
					vacanciesList.map(({ attributes }: IVacancy) => {
						const { createdAt } = attributes;
						return (
							<VacancyItem
								key={createdAt.toString()}
								attributes={attributes}
								vacanciesInfo={vacanciesInfo}
							/>
						);
					})
				)
			) : (
				<Oops vacanciesInfo={vacanciesInfo} />
			)}
		</ul>
	);
};

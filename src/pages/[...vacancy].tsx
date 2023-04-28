import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Vacancy } from "@/components/Vacancy";
import { wrapper, store } from "@/redux/store";
import { selectVacancies } from "@/redux/vacancies/vacanciesSelectors";
import type { IVacancy } from "@/shared/types";
import {
	getVacancies,
	getVacancyBySlug,
} from "@/redux/vacancies/vacanciesOperations";
import { selectLanguage } from "@/redux/language/langSelectors";

const VacancyPage: FC = ({ vacancy }: any) => {
	return (
		<Layout>
			<Vacancy vacancy={vacancy} />
		</Layout>
	);
};

export default VacancyPage;

// export const getStaticProps = wrapper.getStaticProps(
// 	(store) => async (context) => {
// 		const state = store.getState();
// 		const language = selectLanguage(state);
// 		const params = context.params;
// 		const slug = params?.vacancy?.slice(1)[0];
// 		console.log(slug);
// 		let vacancy = [];
// 		if (slug) {
// 			const res = await store.dispatch(
// 				getVacancyBySlug({
// 					lang: language,
// 					slug: slug || "",
// 				})
// 			);
// 			vacancy = res.payload;
// 		}

// 		return {
// 			props: {
// 				vacancy,
// 			},
// 			revalidate: 1,
// 		};
// 	}
// );

// export const getStaticPaths = async () => {
// 	const state = store.getState();
// 	const vacancies = selectVacancies(state);

// 	const paths = vacancies.map((vacancy: IVacancy) => ({
// 		params: {
// 			vacancy: [
// 				vacancy.attributes.categories.data[0].attributes.categorySlug,
// 				vacancy.attributes.vacancySlug,
// 			],
// 		},
// 	}));

// 	return {
// 		paths,
// 		fallback: "blocking",
// 	};
// };


export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		const state = store.getState();
		const params = context.params;
		const slug = params?.vacancy?.slice(1)[0];
		console.log(slug);
		let vacancy = [];
		if (slug) {
			const res = await store.dispatch(
				getVacancyBySlug({
					lang: context.locale || 'ru',
					slug: slug || "",
				})
			);
			vacancy = res.payload;
		}
		console.log(vacancy);
		return {
			props: {
				vacancy,
			},
		};
	}
);
import { FC } from "react";
import { Layout } from "@/components/Layout";
import { VacanciesList } from "@/components/VacanciesList";
import { wrapper, store } from "@/redux/store";
import { getVacancies } from "@/redux/vacancies/vacanciesOperations";
import { selectLanguage } from "@/redux/language/langSelectors";
import { useSelector } from "react-redux";
import { selectVacancies } from "@/redux/vacancies/vacanciesSelectors";
import { IVacancy } from "@/shared/types";
import { Languages } from "@/components/Layout/components/Header/Header";
import { GetServerSideProps } from "next";

const VacanciesPage: FC = ({ vacanciesData }: any) => {
	return (
		<Layout>
			<VacanciesList vacanciesData={vacanciesData} />
		</Layout>
	);
};

export default VacanciesPage;

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (context) => {
		const lang = context.locale === 'ua' ? 'uk' : context.locale;
		const res = await store.dispatch(getVacancies({ lang: lang || "ru" }));
		return {
			props: {
				vacanciesData: res.payload,
			},
		};
	});

// export const getStaticProps = wrapper.getStaticProps(
// 	(store) =>
// 		async (context): Promise<any> => {
// 			const state = store.getState();
// 			const language = selectLanguage(state);
// 			// console.log(language);
// 			console.log(context.locale);
// 			const res = await store.dispatch(getVacancies({ lang: language || 'ru' }));
// 			return {
// 				props: {
// 					vacanciesData: res.payload,
// 				},
// 				revalidate: 1,
// 			};
// 		}
// );



// export const getStaticPaths = async ({locales}: any) => {
// 	let newPaths = [];
// 	console.log("object");
// 	for (const lang in Languages) {
// 		newPaths.push({
// 			params: {
// 				language: lang
// 			}
// 		})
// 	}
// 	return {
// 		paths: newPaths,
// 		fallback: "blocking",
// 	};
// };

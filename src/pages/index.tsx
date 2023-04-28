import { useEffect, useContext, FC } from "react";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/language/langSelectors";

const Home: FC = () => {
	const router = useRouter();
	const lang = useSelector(selectLanguage);

	useEffect(() => {
		console.log(router);
		if (!router.locale) {
			router.replace(router.asPath, router.asPath, {
				locale: lang,
			});
		}
	}, [router]);
	return (
		<>
			<Layout>
				<h1>Home Page</h1>
			</Layout>
		</>
	);
};

export default Home;

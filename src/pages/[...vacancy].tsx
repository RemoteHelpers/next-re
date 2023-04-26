import { FC } from "react";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

const Vacancy: FC = () => {
	const router = useRouter();
	const { vacancy } = router.query;
	return (
		<Layout>
			<h1>{vacancy}</h1>
		</Layout>
	);
};

export default Vacancy;

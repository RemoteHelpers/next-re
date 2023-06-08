import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Thankyou } from "@/components/Thankyou";       
import { getThankyouData } from "@/services";
import { getCategories } from "@/services";

const ContactsPage: FC = ({ categories, thankyouData }: any) => {
	return (
		<Layout categories={categories}>
			<Thankyou thankyouData={thankyouData} />
		</Layout>
	);
};

export default ContactsPage;

export const getServerSideProps = async (context: any) => {
	const lang = context.locale;
	const categories = await getCategories(lang);
	const thankyouData = await getThankyouData(lang);

	return {
		props: {
			categories,
			thankyouData,
		},
	};
};

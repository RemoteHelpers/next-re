import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Contacts } from "@/components/Contacts";
import { getContactData } from "@/services";
import { getCategories } from "@/services";

const ContactsPage: FC = ({ categories, contacts }: any) => {
	return (
		<Layout categories={categories}>
			<Contacts contactsData={contacts} />
		</Layout>
	);

};

export default ContactsPage;

export const getServerSideProps = async (context: any) => {
	const lang = context.locale === "ua" ? "uk" : context.locale;
	const categories = await getCategories(lang);
	const contacts = await getContactData(lang);

	return {
		props: {
			categories,
			contacts,
		},
	};
};

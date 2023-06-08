import { FC, useState, useEffect } from "react";
import Custom404 from "@/components/Custom404";
import {
	getCategories,
	getNotFoundData,
} from "@/services";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { error } from "console";
import { ICategory } from "@/shared/types/CategoriesTypes";

const notFoundPage: FC<any> = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [notFound, setNotFound] = useState<any>();

	const { locale } = useRouter();	

	useEffect(() => {
		getCategories(locale!).then(res => {
			setCategories(res);
		}).catch(error => {
			console.log(error);
		});
		getNotFoundData(locale!).then((res) => {
			setNotFound(res);			
		}).catch((error) => {
			console.log(error);
		});
	}, [locale]);

	if (!categories.length) {
		return <></>;
	}

	return (
		<Layout categories={categories}>
			<Custom404 notFoundProps={notFound} />
		</Layout>
	);
};

export default notFoundPage;

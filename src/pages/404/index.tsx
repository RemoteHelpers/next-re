import { FC, useState, useEffect } from "react";
import Custom404 from "@/components/Custom404";
import {
    getHeaderData,
    getFooterData,
    getCategories,
    getAllVacancies,
    getNotFoundData,
} from "@/services";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";

const notFoundPage: FC<any> = () => {
    const [header, setHeader] = useState<any>(null);
    const [footer, setFooter] = useState<any>(null);
    const [notFound, setNotFound] = useState<any>(null);

    const { locale } = useRouter();

    const notFoundData = async () => {
        const header = await getHeaderData(locale!);
        const footer = await getFooterData(locale!);
        const categories = await getCategories(locale!);
        const vacancies = await getAllVacancies(locale!);
        const notFoundData = await getNotFoundData(locale!);

        setHeader({ header, categories, vacancies });
        setFooter(footer);
        setNotFound(notFoundData);
    };

    useEffect(() => {
        notFoundData();
    }, []);

    return (
        <Layout footerData={footer} headerData={header}>
            <Custom404 notFoundProps={notFound} />
        </Layout>
    );
};

export default notFoundPage;

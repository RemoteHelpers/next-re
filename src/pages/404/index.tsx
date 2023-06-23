import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { ICategory, IInitialData, INavUrlState, INotFoundData } from '@/shared/types';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getHeaderData,
  getNotFoundData,
} from '@/services';
import Custom404 from '@/components/Custom404';
import { Layout } from '@/components/Layout';
import { titleCompanyInfo } from '@/constants';

type Props = { navUrlState: INavUrlState };
const notFoundPage: FC<Props> = ({ navUrlState }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [notFound, setNotFound] = useState<INotFoundData>();
  const [initialData, setInitialLayoutData] = useState<IInitialData>();
  const { locale } = useRouter();

  useEffect(() => {
    Promise.all([
      getHeaderData(locale!),
      getFooterData(locale!),
      getAllVacancies(locale!),
      getCategories(locale!),
      getNotFoundData(locale!),
    ]).then(([header, footer, vacancies, categories, notFound]) => {
      setInitialLayoutData({ header, footer, vacancies } as IInitialData);
      setCategories(categories);
      setNotFound(notFound);
    });
  }, [locale]);

  return (
    <>
      <Head>
        <title>{404 + titleCompanyInfo}</title>
        <meta name="og:title" content={404 + titleCompanyInfo} />
      </Head>

      {initialData && (
        <Layout data={{ ...initialData, ...navUrlState }} categories={categories}>
          <Custom404 notFoundProps={{ ...(notFound as INotFoundData), ...navUrlState }} />
        </Layout>
      )}
    </>
  );
};

export default notFoundPage;

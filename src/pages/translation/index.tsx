import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';
import { IFooterData } from '@/shared/types/FooterTypes';
import { IHeaderData } from '@/shared/types/HeaderTypes';
import { IVacancy } from '@/shared/types/VacanciesTypes';
import type { GetServerSidePropsContext } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = { translations: IVacancy[]; footerData: IFooterData; headerData: IHeaderData };

export default function TranslationTest({ translations, footerData, headerData }: Props) {
  const router = useRouter();
  console.log('router', router);
  const locale = useLocale();
  console.log('locale', locale);
  console.log('translations', translations);
  const t = useTranslations('Test');

  return (
    <Layout footerData={footerData} headerData={headerData}>
      <div>
        <h1>Translation Page</h1>
        <p>{t('title')}</p>
        <p>{t('description')}</p>
        <p> {t('t')}</p>

        <Link href={router.asPath} locale="uk">
          Switch to UKRAINIAN
        </Link>
        <Link href={router.asPath} locale="en">
          Switch to ENGLISH
        </Link>
        <Link href={router.asPath} locale="sk">
          Switch to SLOVAKIAN
        </Link>
        <Link href={router.asPath} locale="pl">
          Switch to POLISH
        </Link>
        <Link href={router.asPath} locale="de">
          Switch to German
        </Link>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const vacancies = await getAllVacancies(locale);
  const footerData = await getFooterData(locale!);
  const header = await getHeaderData(locale!);
  const categories = await getCategories(locale!);

  return {
    props: {
      translations: (await import(`../../../translations/${locale}.json`)).default,
      footerData,
      headerData: {
        header,
        categories,
        vacancies,
      },
    },
  };
};

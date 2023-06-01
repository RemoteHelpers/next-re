import { GetServerSidePropsContext } from 'next';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IVacancy } from '@/shared/types/VacanciesTypes';
import type { IHeader } from '@/shared/types/HeaderTypes';
import { getAllVacancies, getCategories, getHeaderData } from '@/services';
import { generateSiteMap } from '@/shared/functions/sitemapGeneration';

const DOMAIN = process.env.DOMAIN || 'r-ez.com';
const MAP_LOCALE = 'pl';

function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const header = (await getHeaderData(MAP_LOCALE)) as IHeader;
  const categories = (await getCategories(MAP_LOCALE)) as ICategory[];
  const vacancies = (await getAllVacancies(MAP_LOCALE)) as IVacancy[];

  const sitemap = generateSiteMap({
    DOMAIN,
    MAP_LOCALE,
    header,
    categories,
    vacancies,
  });

  res.setHeader('Content-Type', 'text/xml');

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

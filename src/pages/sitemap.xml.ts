import { GetServerSidePropsContext } from 'next';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IVacancy } from '@/shared/types/VacanciesTypes';
import type { IHeader } from '@/shared/types/HeaderTypes';
import { getAllVacancies, getCategories, getHeaderData } from '@/services';
import { generateSiteMap } from '@/shared/functions/sitemapGeneration';

const DOMAIN = process.env.DOMAIN || 'r-ez.com';
const MAP_LOCALE = 'ru';

function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const fetchHeader: Promise<IHeader> = getHeaderData(MAP_LOCALE);
  const fetchCategories: Promise<ICategory[]> = getCategories(MAP_LOCALE);
  const fetchVacancies: Promise<IVacancy[]> = getAllVacancies(MAP_LOCALE);

  const [header, categories, vacancies] = await Promise.all([
    fetchHeader,
    fetchCategories,
    fetchVacancies,
  ]);

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

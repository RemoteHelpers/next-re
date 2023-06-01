import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IVacancy } from '@/shared/types/VacanciesTypes';
import type { ILanguage, IMenu } from '@/shared/types/HeaderTypes';
import type { IAltLink, IGenerConfig } from '../types/SitemapTypes';

const generateAlternateLink = ({
  DOMAIN,
  MAP_LOCALE,
  languagesList,
  mainRoute,
}: IAltLink): string => {
  return languagesList!
    .map(({ locale }: ILanguage): void | string => {
      if (locale === MAP_LOCALE) return;
      const comparedLocale = locale === 'ru' ? '' : `/${locale}`;
      const mainPath = mainRoute ? `/${mainRoute}` : '';

      return `<link
        rel="alternate"
        hreflang="${locale}"
        href="https://${DOMAIN}${comparedLocale}${mainPath}" />`;
    })
    .join('');
};

export const generateSiteMap = ({
  DOMAIN,
  MAP_LOCALE,
  header: { languagesList, menu: mainRoutes },
  categories,
  vacancies,
}: IGenerConfig) => {
  const BASE_URL = MAP_LOCALE === 'ru' ? `https://${DOMAIN}` : `https://${DOMAIN}/${MAP_LOCALE}`;
  const altLinkConfig: IAltLink = { DOMAIN, MAP_LOCALE, languagesList };

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
            >
      <url>
        <loc>${BASE_URL}</loc>
        ${generateAlternateLink(altLinkConfig)}
      </url>
      
      ${mainRoutes
        .map(({ path_id }: IMenu) => {
          if (!path_id.trim()) return;
          return `<url>
          <loc>${BASE_URL}/${path_id}</loc>
          ${generateAlternateLink({ ...altLinkConfig, mainRoute: path_id })}
        </url>`;
        })
        .join('')}
        
      ${categories
        .map(({ attributes: { categorySlug } }: ICategory) => {
          return `<url>
          <loc>${BASE_URL}/${categorySlug}</loc>
          ${generateAlternateLink({ ...altLinkConfig, mainRoute: categorySlug })}
        </url>`;
        })
        .join('')}
        
      ${vacancies
        .map(({ attributes }: IVacancy) => {
          const { categorySlug } = attributes.categories.data[0].attributes;
          return `<url>
          <loc>${BASE_URL}/${categorySlug}/${attributes.vacancySlug}</loc>
        </url>`;
        })
        .join('')}
    </urlset>
  `;
};

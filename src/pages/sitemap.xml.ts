import { GetServerSidePropsContext } from 'next';
import { getHeaderData } from '@/services';
import type { IHeader, ILanguage } from '@/shared/types/HeaderTypes';

const DOMAIN = process.env.DOMAIN || 'r-ez.com';

const generateIndexSiteMap = ({ locales }: { locales: ILanguage[] }) => {
  return `
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locales
        .map(({ locale }: ILanguage) => {
          return `
          <sitemap>
            <loc>https://${DOMAIN}/sitemap_${locale}.xml</loc>
          </sitemap>
      `;
        })
        .join('')}
    </sitemapindex>
  `;
};

function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const header: IHeader = await getHeaderData();

  const sitemap = generateIndexSiteMap({
    locales: header.languagesList,
  });

  res.setHeader('Content-Type', 'text/xml');

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

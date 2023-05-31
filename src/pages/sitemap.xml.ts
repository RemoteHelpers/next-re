import { GetServerSidePropsContext } from 'next';

const EXTERNAL_DATA_URL = 'https://r-ez.com';
const locales = ['uk', 'pl', 'en', 'sk', 'ru'];

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${locales.map(lang => {
       return `<url>
         <loc>${EXTERNAL_DATA_URL}${lang === 'ru' ? '' : `/${lang}`}</loc>
       </url>`;
     })}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  // We make an API call to gather the URLs for our site
  // const request = await fetch(EXTERNAL_DATA_URL);
  // const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

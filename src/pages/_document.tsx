import { Html, Head, Main, NextScript } from 'next/document';
import { GetServerSidePropsContext } from 'next';
// import { appMetadata } from '@/api/metadata';
import type { LocalesLiteral } from '@/shared/types/MetadataTypes';

export default function Document({ locale }: { locale: LocalesLiteral | undefined }) {
  // const appMeta = appMetadata[locale || 'en'];
  return (
    <Html>
      <Head />
      {/* <Head>
        <title>{appMeta.title}</title>
        <meta name="description" content={appMeta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={appMeta.canonical} />
        <meta property="og:locale" content={appMeta.og.locale} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={appMeta.og.title} />
        <meta property="og:description" content={appMeta.og.description} />
        <meta property="og:url" content={appMeta.og.url} />
        <meta property="og:site_name" content={appMeta.og.siteName} />
        <meta property="og:image" content={appMeta.og.image} />
      </Head> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return { props: { locale } };
}

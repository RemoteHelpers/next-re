import { Html, Head, Main, NextScript } from 'next/document';
import { GetServerSidePropsContext } from 'next';
import { appMetadata } from '@/api/metadata';
import type { IMetaData, LocalesLiteral } from '@/shared/types/MetadataTypes';

export default function Document({ defMeta }: { defMeta: IMetaData }) {
  return (
    <Html>
      <Head>
        <title>{defMeta.title}</title>
        <meta name="description" content={defMeta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={defMeta.canonical} />
        <meta property="og:locale" content={defMeta.og.locale} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defMeta.og.title} />
        <meta property="og:description" content={defMeta.og.description} />
        <meta property="og:url" content={defMeta.og.url} />
        <meta property="og:site_name" content={defMeta.og.siteName} />
        <meta property="og:image" content={defMeta.og.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const defMeta = appMetadata[locale as LocalesLiteral];
  return { props: { defMeta } };
}

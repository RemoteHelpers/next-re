import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { appMetadata } from '@/api/metadata';
import type { LocalesLiteral } from '@/shared/types/MetadataTypes';

type Props = {
  locale: LocalesLiteral;
  metaConfig?: {
    title?: string;
    description?: string;
  };
  children: ReactNode;
};

export const MetaWrapper: FC<Props> = ({ locale, children, metaConfig }) => {
  console.log('locale', locale);
  const appMeta = appMetadata[locale];
  return (
    <>
      <Head>
        <title>{metaConfig?.title ? metaConfig.title : appMeta.title}</title>
        <meta
          name="description"
          content={metaConfig?.description ? metaConfig.description : appMeta.description}
        />
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
      </Head>
      {children}
    </>
  );
};

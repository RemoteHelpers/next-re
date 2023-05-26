import { GlobalContext } from '@/context';
// import { NextIntlClientProvider } from 'next-intl';
import { Html, Head, Main, NextScript } from 'next/document';
import { useContext } from 'react';

// export function generateStaticParams() {
//   return [{ locale: 'pl' }, { locale: 'ru' }, { locale: 'uk' }, { locale: 'en' }];
// }
// { params: { locale } }: any

export default function Document() {
  // console.log('locale', locale);
  const { currentLang } = useContext(GlobalContext);

  return (
    <Html lang={currentLang}>
      <Head />
      <body>
        {/* <NextIntlClientProvider locale={locale}> */}
        <Main />
        {/* </NextIntlClientProvider> */}

        <NextScript />
      </body>
    </Html>
  );
}

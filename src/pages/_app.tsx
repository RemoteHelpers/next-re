import type { AppProps } from 'next/app';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import '@/shared/styles/globals.scss';
import { GlobalProvider } from '@/context';
import { MetaWrapper } from '@/components/MetaWrapper';
import type { LocalesLiteral } from '@/shared/types/MetadataTypes';

function App({ Component, pageProps }: AppProps) {
  console.log('pageProps', pageProps);
  // console.log('useRouter', useRouter);
  const { pathname, locale } = useRouter();

  // let greetings = 'hello world';

  let greetings = 'hello world';
  const getGreetings = useCallback(() => {
    switch (locale) {
      case 'uk':
        greetings = 'Привіт світе';
        break;

      case 'ru':
        greetings = 'адін народ';
        break;

      default:
        greetings = 'hello world';
        break;
    }

    return greetings;
  }, [locale]);

  // useEffect(() => {
  //   switch (locale) {
  //     case 'uk':
  //       greetings = 'Привіт світе';
  //       break;

  //     case 'ru':
  //       greetings = 'адін народ';
  //       break;

  //     default:
  //       greetings = 'hello world';
  //       break;
  //   }
  // }, [locale]);

  const updatedProps = { ...pageProps, greetings: getGreetings() };

  const switchTitle = () => {
    switch (pathname) {
      case '/':
        return 'Home PAGE';

      case '/about':
        return 'About PAGE';

      case '/[...vacancy]':
        const { seoData, title } = pageProps.vacancy.attributes;
        return seoData?.seoTitle ? seoData.seoTitle : `${title} - Remote Employees!`;

      default:
        return 'AHSKBKHSADBKJBKHASDKHBNK';
    }
  };

  const metaConfig = { title: switchTitle() };
  return (
    <MetaWrapper locale={locale as LocalesLiteral} metaConfig={metaConfig}>
      <GlobalProvider>
        <Component {...updatedProps} />
      </GlobalProvider>
    </MetaWrapper>
  );
}

export default App;

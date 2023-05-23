import { GlobalContext } from '@/context';
import { Html, Head, Main, NextScript } from 'next/document';
import { useContext } from 'react';

export default function Document() {
  const { currentLang } = useContext(GlobalContext);
  return (
    <Html lang={currentLang}>
      <Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
}

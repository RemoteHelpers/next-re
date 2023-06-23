import { FC, ReactNode, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import s from './Layout.module.scss';
import { Loader } from '../Loader';
import type { ILayoutData, IInitialData, ICategory, INavUrlState } from '@/shared/types';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  categories: ICategory[];
  data: IInitialData & INavUrlState;
};

export const Layout: FC<Props> = ({ children, categories, data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { locale, asPath } = useRouter();
  const { navURL, setNavURL } = data;
  const layoutData: ILayoutData = { ...data, setIsLoading };

  useEffect(() => {
    if (document) {
      console.log(JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent!));
    }
  }, []);

  useEffect(() => {
    if (!navURL) return;
    if (asPath === navURL || asPath === `/${navURL}`) setNavURL('');
    else setIsLoading(true);
  }, [navURL]);

  useEffect(() => {
    setIsLoading(false);
    setNavURL('');
  }, [locale, asPath]);

  return (
    <>
      <div className={s.wrapper}>
        <Header categories={categories} layoutData={layoutData} />
        <Main>{children}</Main>
        <Footer layoutData={layoutData} />
      </div>

      {isLoading && <Loader />}
    </>
  );
};

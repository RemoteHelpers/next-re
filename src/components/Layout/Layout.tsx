import { FC, ReactNode, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import s from './Layout.module.scss';
import { Loader } from '../Loader';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IGlobalData, IMainData } from '@/shared/types/GlobalTypes';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  categories: ICategory[];
  mainData: IMainData;
};

export const Layout: FC<Props> = ({ children, categories, mainData }) => {
  const { locale, asPath } = useRouter();
  const [navURL, setNavURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const globalData: IGlobalData = {
    ...mainData,
    setNavURL,
    setIsLoading,
  };

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
        <Header categories={categories} globalData={globalData} />
        <Main>{children}</Main>
        <Footer globalData={globalData} />
      </div>

      {isLoading && <Loader />}
    </>
  );
};

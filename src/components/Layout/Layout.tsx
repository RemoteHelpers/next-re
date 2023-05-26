import { FC, useContext, ReactNode } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import s from './Layout.module.scss';
import { Loader } from '../Loader';
import { GlobalContext } from '@/context';
import type { IFooterData } from '@/shared/types/FooterTypes';
import type { IHeaderData } from '@/shared/types/HeaderTypes';
// import { NextIntlClientProvider } from 'next-intl';

type Props = {
  children: ReactNode;
  footerData: IFooterData;
  headerData: IHeaderData;
  // params: { locale: string };
};

export const Layout: FC<Props> = ({ children, footerData, headerData }) => {
  const { header } = headerData;
  const { isLoading } = useContext(GlobalContext);

  return (
    <>
      <div className={s.wrapper}>
        <Header headerData={headerData} />
        <Main>{children}</Main>
        <Footer footerData={footerData} header={header} />
      </div>

      {isLoading && <Loader />}
    </>
  );
};

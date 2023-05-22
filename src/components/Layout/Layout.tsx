import { FC, useContext } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
// import type { MainProps } from "./components/Main";
import s from './Layout.module.scss';
import { Loader } from '../Loader';
import { GlobalContext } from '@/context';

// export type LayoutProps = MainProps & {};

export const Layout = ({ children, footerData, headerData }: any) => {
  const { isLoading } = useContext(GlobalContext);
  const { header } = headerData;
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

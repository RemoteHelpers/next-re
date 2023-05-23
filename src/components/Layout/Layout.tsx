import { useContext } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import s from './Layout.module.scss';
import { Loader } from '../Loader';
import { GlobalContext } from '@/context';

export const Layout = ({ children, footerData, headerData }: any) => {
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

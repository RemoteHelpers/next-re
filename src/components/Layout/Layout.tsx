import { FC, useContext, ReactNode, useEffect } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import s from './Layout.module.scss';
import { Loader } from '../Loader';
import { GlobalContext } from '@/context';
import type { IFooterData } from '@/shared/types/FooterTypes';
import type { IHeaderData } from '@/shared/types/HeaderTypes';

type Props = {
  children: ReactNode;
  headerData: IHeaderData;
};

export const Layout: FC<Props> = ({ children, headerData }) => {
  const { isLoading } = useContext(GlobalContext);

  useEffect(() => {
    if (document) {      
      console.log(JSON.parse(document.getElementById("__NEXT_DATA__")?.textContent!));      
    }
  }, [])

  return (
    <>
      <div className={s.wrapper}>
        <Header headerData={headerData} />
        <Main>{children}</Main>
        <Footer/>
      </div>

      {isLoading && <Loader />}
    </>
  );
};

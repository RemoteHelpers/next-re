import { FC, useContext, ReactNode, useEffect } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import s from './Layout.module.scss';
import { Loader } from '../Loader';
import { GlobalContext } from '@/context';
import { ICategory } from '@/shared/types/CategoriesTypes';

type Props = {
  children: ReactNode;
  categories: ICategory[];
};

export const Layout: FC<Props> = ({ children, categories }) => {
  const { isLoading } = useContext(GlobalContext);

  useEffect(() => {
    if (document) {      
      console.log(JSON.parse(document.getElementById("__NEXT_DATA__")?.textContent!));      
    }
  }, [])

  return (
    <>
      <div className={s.wrapper}>
        <Header categories={categories} />
        <Main>{children}</Main>
        <Footer/>
      </div>

      {isLoading && <Loader />}
    </>
  );
};

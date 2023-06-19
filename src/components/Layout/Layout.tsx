import { FC, useContext, ReactNode, useEffect } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import s from './Layout.module.scss';
import { Loader } from '../Loader';
import { GlobalContext } from '@/context';
import { ICategory } from '@/shared/types/CategoriesTypes';
import { IFooterData } from '@/shared/types/FooterTypes';
import { IHeader } from '@/shared/types/HeaderTypes';
import { IVacancy } from '@/shared/types/VacanciesTypes';
import { IFormData } from '@/shared/types/FormTypes';

type Props = {
  children: ReactNode;
  categories: ICategory[];
  header: IHeader;
  footer: IFooterData;
  // vacancies: IVacancy[];
  // formData: IFormData;
  // mainData: any;
};

export const Layout: FC<Props> = ({ children, categories, footer, header }) => {
  const { isLoading } = useContext(GlobalContext);

  useEffect(() => {
    if (document) {
      console.log(JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent!));
    }
  }, []);

  return (
    <>
      <div className={s.wrapper}>
        <Header categories={categories} />
        <Main>{children}</Main>
        <Footer footer={footer} />
      </div>

      {isLoading && <Loader />}
    </>
  );
};

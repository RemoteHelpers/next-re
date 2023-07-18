import type { FC, RefObject } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import s from './Category.module.scss';
import { VacancyItem } from '../Vacancies/components/VacanciesList/components/VacancyItem';
import mainCat from '@/shared/images/Form/MainForm/main-cat.png';
import type { IMainData, ICategory, IVacanciesInfo, IVacancy } from '@/shared/types';
const FormFields = dynamic(() => import('../FormFields/FormFields'));

type Props = {
  category: ICategory;
  vacanciesInfo: IVacanciesInfo;
  mainData: IMainData;
  formRef: RefObject<HTMLDivElement>;
};
export const Category: FC<Props> = ({ category, vacanciesInfo, mainData, formRef }) => {
  if (!category.attributes) return <></>;
  const { categorySlug, vacancies } = category.attributes;
  const { header, formData, setNavURL } = mainData;

  return (
    <section className={s.category}>
      <div className={s.container}>
        <div className={s.vacancies_list}>
          {vacancies &&
            vacancies.data.map(
              (vacancy: IVacancy) =>
                vacancy.attributes.isHot && (
                  <VacancyItem
                    key={vacancy.id}
                    attributes={vacancy.attributes}
                    vacanciesInfo={vacanciesInfo}
                    category={categorySlug}
                    setNavURL={setNavURL}
                  />
                )
            )}
          {vacancies &&
            vacancies.data.map(
              (vacancy: IVacancy) =>
                !vacancy.attributes.isHot && (
                  <VacancyItem
                    key={vacancy.id}
                    attributes={vacancy.attributes}
                    vacanciesInfo={vacanciesInfo}
                    category={categorySlug}
                    setNavURL={setNavURL}
                  />
                )
            )}
        </div>
        
        <div className={s.formContent}>
          <div className={s.form_wrapper} ref={formRef}>
            <FormFields
              formData={formData}
              imageCatProps={header?.mainCat.data.attributes.url}
              coloredField={false}
            />
            <Image className={s.main_cat} src={mainCat} alt={'main cat'} />
          </div>
        </div>
      </div>
    </section>
  );
};

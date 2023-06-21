import { FC, useMemo, useRef } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import s from './Category.module.scss';
import { VacancyItem } from '../Vacancies/components/VacanciesList/components/VacancyItem';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import FormFields from '../FormFields/FormFields';
import mainCat from '@/shared/images/Form/MainForm/main-cat.png';
import type { IMainData, ICategory, IVacanciesInfo, IVacancy } from '@/shared/types';

type Props = { category: ICategory; vacanciesInfo: IVacanciesInfo; mainData: IMainData };
export const Category: FC<Props> = ({ category, vacanciesInfo, mainData }) => {
  if (!category.attributes) return <></>;

  const { categoryTitle, categorySlug, description, vacancies } = category.attributes;
  const { header, formData } = mainData;
  const { menu, categoryButton } = header;
  const breadcrumbsItems = useMemo((): ItemType[] => {
    if (!menu) return [];

    return [
      {
        title: <Link href={'/'}>{menu[0].title}</Link>,
      },
      {
        title: <Link href={`/${menu[1].path_id}`}>{menu[1].title}</Link>,
      },
      {
        title: categoryTitle,
      },
    ];
  }, [header, categoryTitle]);
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <section className={s.category}>
      <div className={s.container}>
        <div className={s.content}>
          <Breadcrumbs items={breadcrumbsItems} />
          <h1 className={s.title}>{categoryTitle}</h1>
          <ReactMarkdown className={s.description}>{description}</ReactMarkdown>
          <button
            className={s.btn}
            onClick={() => {
              formRef!.current!.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
              });
            }}
          >
            {categoryButton}
          </button>
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
                    />
                  )
              )}
          </div>
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

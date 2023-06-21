import { FC, useMemo, useRef } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import s from './Vacancy.module.scss';
import laptopCat from './assets/laptop_cat.svg';
import { VacanciesIcon } from '@/shared/components/IconComponents/Vacancies';
import { VacancyItem } from '../Vacancies/components/VacanciesList/components/VacancyItem';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { VacancyForm } from '../VacancyForm';
import type { IVacancy, IVacanciesInfo } from '@/shared/types/VacanciesTypes';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IMainData } from '@/shared/types/GlobalTypes';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

type Props = {
  vacancy: IVacancy;
  vacanciesInfo: IVacanciesInfo;
  category: ICategory;
  mainData: IMainData;
};

export const Vacancy: FC<Props> = ({ vacancy, vacanciesInfo, category, mainData }) => {
  if (!vacancy.attributes) return <></>;

  const { cardDescription, description, isHot, subTitle, title, titleH1, vacancySlug, videoLink } =
    vacancy.attributes;
  const { menu, isHotValue, seeMore } = mainData.header;
  const { categorySlug, categoryTitle, vacancies } = category.attributes;
  const formRef = useRef<HTMLDivElement>(null);

  const breadcrumbsItems = useMemo((): ItemType[] => {
    if (!menu) return [];
    return [
      {
        title: <Link href={'/'}>{menu[0]?.title}</Link>,
      },
      {
        title: <Link href={`/${menu[1].path_id}`}>{menu[1]?.title}</Link>,
      },
      {
        title: <Link href={`/${categorySlug}`}>{categoryTitle}</Link>,
      },
      {
        title: title,
      },
    ];
  }, [menu, categorySlug, categoryTitle]);

  return (
    <section className={s.vacancy}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.head}>
            <Breadcrumbs items={breadcrumbsItems} />
            {isHot && (
              <div className={s.hot_mark}>
                <VacanciesIcon name="fire" />
                <span className={s.hot_mark_text}>{isHotValue}</span>
              </div>
            )}
          </div>
          <div className={s.short}>
            <div className={s.short_info}>
              <h1 className={s.title}>{titleH1}</h1>
              <h3 className={s.subtitle}>{subTitle}</h3>
              <ReactMarkdown className={s.short_desc}>{cardDescription}</ReactMarkdown>
              <button
                type="button"
                className={s.short_btn}
                onClick={() =>
                  formRef?.current?.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                  })
                }
              >
                {mainData.formData.respondBtn}
              </button>
            </div>
            {videoLink ? (
              <div className={s.short_video}>
                <ReactPlayer className={s.video_iframe} url={videoLink} controls />
              </div>
            ) : (
              <div className={s.cat_placeholder}>
                <Image src={laptopCat} alt="laptop_cat" />
              </div>
            )}
          </div>
          <ReactMarkdown className={s.description}>{description}</ReactMarkdown>
          <div className={s.form_wrapper} ref={formRef}>
            <VacancyForm formData={mainData.formData} header={mainData.header} />
          </div>
        </div>
        <div className={s.vacancies_list}>
          {vacancies &&
            vacancies.data.map((vacancy: IVacancy, index: number) => {
              const { vacancySlug: slug } = vacancy.attributes;
              const condition = slug !== vacancySlug && index < 3;
              if (condition) {
                return (
                  <VacancyItem
                    key={vacancy.id}
                    attributes={vacancy.attributes}
                    vacanciesInfo={vacanciesInfo}
                    category={categorySlug}
                  />
                );
              }
            })}
        </div>
        <Link href={`/${menu[1].path_id}`} className={s.see_more}>
          {seeMore}
        </Link>
      </div>
    </section>
  );
};

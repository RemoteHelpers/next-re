import { IAbout } from '@/shared/types/AboutTypes';
import { ICategory } from '@/shared/types/CategoriesTypes';
import { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import s from './Specializations.module.scss';

type Props = {
  about: IAbout;
  categories: ICategory[];
};

export const Specializations: FC<Props> = ({ about, categories }) => {
  console.log('about', about);

  return (
    <section>
      <div>
        <h2>{about.WhatWeDoTitle}</h2>
        <p>{about.SecondDescription}</p>
        {/* <ReactMarkdown>{about.SecondDescription}</ReactMarkdown> */}
      </div>

      <Swiper pagination={true} className={s.swiper} modules={[Pagination]} slidesPerView={1}>
        {categories.map(({ attributes }: ICategory, i: number) => (
          <SwiperSlide className={s.swiperSlide} key={attributes.categorySlug}>
            <h3>{attributes.categoryTitle}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

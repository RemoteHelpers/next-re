import { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import s from './Specializations.module.scss';
import type { IAbout } from '@/shared/types/AboutTypes';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import { SpecializationsIcon } from '@/shared/components/IconComponents/Specializations';
import { SpecializationCard } from './components';

type Props = {
  about: IAbout;
  categories: ICategory[];
};

export const Specializations: FC<Props> = ({ about, categories }) => {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.sectionTitle}>{about.WhatWeDoTitle}</h2>
        <p className={s.sectionDescription}>{about.SecondDescription}</p>

        <ul className={s.list}>
          {categories.map(({ attributes }: ICategory) => {
            if (attributes.categorySlug === 'other') return;
            return (
              <li className={s.item} key={`item_${attributes.categorySlug}`}>
                <SpecializationCard category={attributes} about={about} />
              </li>
            );
          })}
        </ul>

        <Swiper
          className={`${s.swiper} about_specializations-swiper`}
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            el: '.about_swiper-pagination',
          }}
          navigation={{
            nextEl: '.about_next-slide-btn',
            prevEl: '.about_prev-slide-btn',
          }}
        >
          {categories.map(({ attributes }: ICategory) => {
            if (attributes.categorySlug === 'other') return;
            return (
              <SwiperSlide className={s.slide} key={`slide_${attributes.categorySlug}`}>
                <div className={`${s.slideContent} content`}>
                  <SpecializationCard category={attributes} about={about} />
                </div>
              </SwiperSlide>
            );
          })}

          <nav className={s.sliderBtns}>
            <button type="button" className={`${s.prevSlideBtn} about_prev-slide-btn`}>
              <SpecializationsIcon name="arrow-prev" />
            </button>

            <button type="button" className={`${s.nextSlideBtn} about_next-slide-btn`}>
              <SpecializationsIcon name="arrow-next" />
            </button>
          </nav>

          <div className={`${s.sliderPag} about_swiper-pagination`} />
        </Swiper>
      </div>
    </section>
  );
};

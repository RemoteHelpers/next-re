import { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import s from './Specializations.module.scss';
import type { IAboutData, ICategory, INavUrlState } from '@/shared/types';
import { SpecializationsIcon } from '@/shared/components/IconComponents/Specializations';
const SpecializationCard = dynamic(() => import('./SpecializationCard'))

type Props = { about: IAboutData; categories: ICategory[]; navUrlState: INavUrlState };
const Specializations: FC<Props> = ({ about, categories, navUrlState }) => {
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
                <SpecializationCard category={attributes} about={about} navUrlState={navUrlState} />
              </li>
            );
          })}
        </ul>

        <Swiper
          className={`${s.swiper} about_specializations-swiper`}
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ el: '.about_swiper-pagination' }}
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
                  <SpecializationCard category={attributes} about={about} navUrlState={navUrlState} />
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

export default Specializations
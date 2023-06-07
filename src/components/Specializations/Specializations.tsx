import { FC, useContext } from 'react';
import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import s from './Specializations.module.scss';
import type { IAbout } from '@/shared/types/AboutTypes';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import { SpecializationsIcon } from '@/shared/components/IconComponents/Specializations';
import { GlobalContext } from '@/context';

type Props = {
  about: IAbout;
  categories: ICategory[];
};

export const Specializations: FC<Props> = ({ about, categories }) => {
  const { setIsLoading } = useContext(GlobalContext);
  const showLoader = () => setIsLoading(true);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.sectionTitle}>{about.WhatWeDoTitle}</h2>
        <p className={s.sectionDescription}>{about.SecondDescription}</p>

        <ul className={s.list}>
          {categories.map(({ attributes }: ICategory) => {
            const { categorySlug, categoryTitle, description } = attributes;
            if (categorySlug === 'other') return;
            return (
              <li className={s.item} key={`item_${categorySlug}`}>
                <SpecializationsIcon name={categorySlug} />
                <h3 className={s.title}>{categoryTitle}</h3>
                <p className={s.description}>{description}</p>
                {/* <ReactMarkdown children={description} /> */}

                <Link href={`/${categorySlug}`} className={s.link} onClick={showLoader}>
                  <span>Узнать больше</span>
                  <SpecializationsIcon name="arrow" />
                </Link>
              </li>
            );
          })}
        </ul>

        <Swiper
          className={`${s.swiper} about_specializations-swiper`}
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          centeredSlides={true}
          navigation={{
            nextEl: '.about_next-slide-btn',
            prevEl: '.about_prev-slide-btn',
          }}
          pagination={{
            el: '.about_swiper-pagination',
          }}
        >
          {categories.map(({ attributes }: ICategory) => {
            const { categorySlug, categoryTitle, description } = attributes;
            if (categorySlug === 'other') return;
            return (
              <SwiperSlide className={s.slide} key={`slide_${categorySlug}`}>
                <div className={`${s.slideContent} content`}>
                  <div className={`${s.slideFade} content--fade`} />

                  <SpecializationsIcon name={categorySlug} />
                  <h3 className={s.title}>{categoryTitle}</h3>
                  <p className={s.description}>{description}</p>
                  {/* <ReactMarkdown children={description} /> */}

                  <Link href={`/${categorySlug}`} className={s.link} onClick={showLoader}>
                    <span>Дізнатися більше</span>
                    <SpecializationsIcon name="arrow-more" />
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}

          <div className={s.sliderBtns}>
            <button type="button" className={`${s.prevSlideBtn} about_prev-slide-btn`}>
              <SpecializationsIcon name="arrow-prev" />
            </button>

            <button type="button" className={`${s.nextSlideBtn} about_next-slide-btn`}>
              <SpecializationsIcon name="arrow-next" />
            </button>
          </div>

          <div className={`${s.sliderPag} about_swiper-pagination`} />
        </Swiper>
      </div>
    </section>
  );
};

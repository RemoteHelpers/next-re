import { FC, useContext, useEffect } from 'react';
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
import Link from 'next/link';
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

        {/* <div className={s.swiperWrapper}> */}
        <Swiper
          className={s.swiper}
          modules={[Pagination, Navigation, Autoplay]}
          // pagination={false}
          slidesPerView={1}
          spaceBetween={60}
          centeredSlides={true}
          navigation={{
            nextEl: '.next-slide-btn',
            prevEl: '.prev-slide-btn',
          }}
          pagination={{
            el: '.swiper-pagination-about',
          }}
        >
          {categories.map(({ attributes }: ICategory, i: number) => {
            const { categorySlug, categoryTitle, description } = attributes;
            if (categorySlug === 'other') return;
            return (
              <SwiperSlide className={s.swiperSlide} key={`slide_${categorySlug}`}>
                <SpecializationsIcon name={categorySlug} />

                <h3 className={s.title}>{categoryTitle}</h3>

                <p className={s.description}>{description}</p>

                <Link href={`/${categorySlug}`} className={s.link} onClick={showLoader}>
                  <span>Дізнатися більше</span>
                  <SpecializationsIcon name="arrow-more" />
                </Link>
                {/* <ReactMarkdown children={description} /> */}
              </SwiperSlide>
            );
          })}

          <div className={s.sliderNav}>
            <button type="button" className={`prev-slide-btn ${s.prevSlideBtn}`}>
              <SpecializationsIcon name="arrow-prev" />
            </button>

            <button type="button" className={`next-slide-btn ${s.nextSlideBtn}`}>
              <SpecializationsIcon name="arrow-next" />
            </button>
          </div>

          <div className="swiper-pagination-about"></div>
        </Swiper>

        {/* </div> */}
      </div>
    </section>
  );
};

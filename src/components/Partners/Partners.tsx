import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import s from './Partners.module.scss';
import Image from 'next/image';
import { PhotoAPI } from '@/constants';
import type { IImage } from '@/shared/types';

type Props = {
  title: string;
  slides: IImage[];
};

export const Partners: FC<Props> = ({ title, slides }) => {
  return (
    <section className={s.partners}>
      <div className={s.container}>
        <h2 className={s.title}>{title}</h2>
        <Swiper
          slideActiveClass={s.active_slide}
          className={s.swiper}
          slidesPerView={2}
          spaceBetween={65}
          loop
          speed={800}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 150,
            },
          }}
        >
          {slides.map((slide: IImage) => {
            return (
              <SwiperSlide className={s.slide} key={slide.id}>
                <Image
                  className={s.slide_image}
                  src={PhotoAPI + slide.attributes.url}
                  alt={slide.attributes.alternativeText}
                  width={slide.attributes.width}
                  height={slide.attributes.height}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import styles from './Testimonials.module.scss';

import '../../../node_modules/swiper/swiper.scss';
import '../../../node_modules/swiper/modules/pagination/pagination.scss';
import '../../../node_modules/swiper/modules/navigation/navigation.scss';

import { TestimonialsIcon } from '@/shared/components/IconComponents/Testimonials';

import { PhotoAPI } from '@/constants';
import Image from 'next/image';
import type { IHomeData } from '@/shared/types/HomeTypes';

type Props = {
  testimonials: IHomeData;
};

const Feedbacks: FC<Props> = ({ testimonials }) => {
  const [currentId, setCurrentId] = useState<any>();

  const handleSlideClick = (event: any) => {
    setCurrentId(event.target.id);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.testimonials_title}>{testimonials.testimonialsTitle}</h2>
      <Swiper
        className={styles.swiper_wrapper}
        modules={[Navigation, Autoplay]}
        centeredSlides={false}
        loop
        speed={1000}
        slidesPerView={1}
        spaceBetween={20}
        navigation={{
          nextEl: '.next-slider',
          prevEl: '.prev-slider',
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          1440: {
            slidesPerView: 3,
            centeredSlides: true,
          },
        }}
      >
        {testimonials.Testimonials &&
          testimonials.Testimonials.map((item: any) => (
            <SwiperSlide
              key={item.id}
              className={styles.swiper_slide}
              onClick={handleSlideClick}
              id={item.id}
            >
              <article>
                <div>
                  <TestimonialsIcon id="quotes" />
                </div>
                <header className={styles.slide_description}>
                  {item.id == currentId ? (
                    <span
                      style={{ pointerEvents: 'all', height: '100%' }}
                      onClick={() => setCurrentId(!currentId)}
                    >
                      {item.Description}
                    </span>
                  ) : (
                    `${item.Description.slice(0, 150)}...`
                  )}
                </header>
                <main className={styles.slide_employee}>
                  <Image
                    src={PhotoAPI + item.personImg.data.attributes.url}
                    alt=""
                    width={100}
                    height={100}
                    className={styles.employee_img}
                  />
                  <div>
                    <h2>{item.name}</h2>
                    <p>{item.Specialization}</p>
                  </div>
                </main>
              </article>
            </SwiperSlide>
          ))}
        <div className={styles.slider_arrows}>
          <span className="prev-slider">
            <TestimonialsIcon id="prev" />
          </span>
          <span className="next-slider">
            <TestimonialsIcon id="next" />
          </span>
        </div>
      </Swiper>
    </section>
  );
};

export default Feedbacks;

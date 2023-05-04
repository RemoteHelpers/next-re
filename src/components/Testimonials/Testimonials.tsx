import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styles from "./Testimonials.module.scss";

import "../../../node_modules/swiper/swiper.scss";
import "../../../node_modules/swiper/modules/pagination/pagination.scss";
import "../../../node_modules/swiper/modules/navigation/navigation.scss";

import { TestimonialsIcon } from "@/shared/components/IconComponents/Testimonials";

import { PhotoAPI } from "@/constants";
import Image from "next/image";

const Feedbacks = ({ testimonials }: any) => {
  console.log(testimonials);

  return (
    <section className={styles.container}>
      <h2>{testimonials.testimonialsTitle}</h2>
      <Swiper
        className={styles.swiper_wrapper}
        modules={[Navigation]}
        // Autoplay
        centeredSlides
        loop
        speed={1000}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        // pagination={{ clickable: true, type: "fraction" }}
        slidesPerView={3}
        spaceBetween={20}
        navigation={{
          nextEl: ".next-slider",
          prevEl: ".prev-slider",
        }}
      >
        {testimonials.Testimonials &&
          testimonials.Testimonials.map((item: any) => (
            <SwiperSlide key={item.id} className={styles.swiper_slide}>
              <article>
                <div>
                  <TestimonialsIcon id="quotes" />
                </div>
                <header className={styles.slide_description}>
                  {item.Description}
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

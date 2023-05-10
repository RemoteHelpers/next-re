import type { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper';
import "swiper/css";
import s from "./Partners.module.scss";
import Image from "next/image";
import { PhotoAPI } from "@/constants";

interface PartnersProps {
	title: string;
	slides: any;
}

export const Partners: FC<PartnersProps> = ({
	title,
	slides,
}: PartnersProps) => {
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
					}}>
					{slides.map((slide: any) => {
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

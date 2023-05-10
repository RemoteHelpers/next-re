import type { FC } from "react";
import { Sphere } from "./components/Sphere";
import { IVacCat } from "@/shared/types";
import s from "./Spheres.module.scss";

interface SpheresProps {
	title: string;
	categories: IVacCat[];
}

export const Spheres: FC<SpheresProps> = ({
	title,
	categories,
}: SpheresProps) => {
	return (
		<section className={s.spheres}>
			<div className={s.container}>
				<h2 className={s.title}>{title}</h2>
				<div className={s.spheres_cards}>
                    {categories.map((cat) => {
                        if (cat.attributes.categorySlug === "other") {
                            return null;
                        }
						return (
							<Sphere
								key={cat.id}
								categorySlug={cat.attributes.categorySlug}
								categoryTitle={cat.attributes.categoryTitle}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

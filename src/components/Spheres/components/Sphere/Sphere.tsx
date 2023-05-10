import Link from "next/link";
import type { FC } from "react";
import s from "./Sphere.module.scss";
import { CategoryIcon } from "@/shared/components/IconComponents/CategoryIcon";

interface SphereProps {
	categorySlug: string;
	categoryTitle: string;
}

export const Sphere: FC<SphereProps> = ({
	categorySlug,
	categoryTitle,
}: SphereProps) => {
	return (
		<Link href={`/${categorySlug}`} className={s.sphere}>
			<CategoryIcon id={categorySlug} />
			<h5 className={s.title}>{categoryTitle}</h5>
		</Link>
	);
};

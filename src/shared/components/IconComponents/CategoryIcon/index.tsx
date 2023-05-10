import { FC } from "react";
import designers from "@/shared/icons/home/spheres/designers.png";
import developers from "@/shared/icons/home/spheres/developers.png";
import translators from "@/shared/icons/home/spheres/translators.png";
import managers from "@/shared/icons/home/spheres/managers.png";
import marketers from "@/shared/icons/home/spheres/marketers.png";
import tutors from "@/shared/icons/home/spheres/tutors.png";
import Image from "next/image";

interface CategoryIconProps {
	id: string;
}

export const CategoryIcon: FC<CategoryIconProps> = ({ id }: CategoryIconProps) => {
	switch (id) {
		case "designers":
			return <Image src={designers} alt="designers" />;

		case "developers":
			return <Image src={developers} alt="developers" />;

		case "translators":
			return <Image src={translators} alt="translators" />;

		case "managers":
			return <Image src={managers} alt="managers" />;

		case "marketers":
			return <Image src={marketers} alt="marketers" />;

		case "tutors":
			return <Image src={tutors} alt="tutors" />;

		case "other":
			return <Image src={marketers} alt="marketers" />;

		default:
			return <></>;
	}
};
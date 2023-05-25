import type { FC } from "react";
import s from "./Breadcrumbs.module.scss";
import { Breadcrumb } from "antd";
import { BreadcrumbsIcon } from "../IconComponents/BreadcrumbsIcon";

interface BreadcrumbsProps {
	items: any[];
	className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
	items,
	className,
	...props
}) => {
	return (
		<Breadcrumb
			items={items}
			separator={<BreadcrumbsIcon id="separator" />}
			className={`${s.breadcrumbs} ${className}`}
			{...props}
		/>
	);
};

import React, { FC, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLang } from "@/redux/language/langSlice";
import { selectLanguage } from "@/redux/language/langSelectors";
import { getVacancies } from "@/redux/vacancies/vacanciesOperations";
import { AppDispatch } from "@/redux/store";
import s from "./Header.module.scss";
import Image from "next/image";
import logo from "./assets/logo.svg";
import Link from "next/link";
import { JsxChild } from "typescript";
import { useRouter } from "next/router";
interface INavItem {
	title: string;
	path: string;
}


const navItems: INavItem[] = [
	{
		title: "Вакансії",
		path: "/vacancies",
		
	},
	{
		title: "Про нас",
		path: "/about",
	},
	{
		title: "Контакти",
		path: "/contacts",
	},
	{
		title: "Відеоінтерв'ю",
		path: "/videointerview",
	},
];

export enum Languages {
	"ru",
	"ua",
	"en",
}

type Props = {};
export const Header: FC = ({}: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const lang = useSelector(selectLanguage);
	const router = useRouter();	

	const comparePath = useCallback(
		(currentPath: string, path: string): boolean => {
			return currentPath.split("/").at(-1) === path.split("/").at(-1);
		},
		[]
	);

	const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		dispatch(changeLang(e.target.value));
		router.push(router.asPath, router.asPath, { locale: e.target.value });
	};

	return (
		<header className={s.header}>
			<div className={s.container}>
				<Link href="/" className={s.logo}>
					<Image src={logo} alt="RemotEmployees Logo" />
				</Link>
				<div className={s.controls}>
					<nav className={s.nav}>
						{navItems.map((item: INavItem) => {
							return (
								<Link
									key={item.path}
									href={{
										pathname: `${item.path}`,
										
									}}
									className={
										comparePath(router.pathname, item.path)
											? `${s.nav_item} ${s.active}`
											: `${s.nav_item}`
									}>
									{item.title}
								</Link>
							);
						})}
					</nav>
					<select onChange={changeLanguage} value={router.locale} name="" id="">
						<option value={Languages[0].toString()}>RU</option>
						<option value={Languages[1].toString()}>UA</option>
						<option value={Languages[2].toString()}>US</option>
					</select>
				</div>
			</div>
		</header>
	);
};

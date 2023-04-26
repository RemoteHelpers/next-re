import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLang } from "@/redux/language/langSlice";
import { selectLanguage } from "@/redux/language/langSelectors";
import { getVacancies } from "@/redux/vacancies/vacanciesOperations";
import { AppDispatch } from "@/redux/store";
import s from "./Header.module.scss";

type Props = {};

export const Header: FC = ({}: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const lang = useSelector(selectLanguage);

	const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		dispatch(changeLang(e.target.value));
	};

	useEffect(() => {
		dispatch(getVacancies(lang.toLowerCase()));
	}, [lang]);

	return (
		<header>
			<p>{lang}</p>

			<select onChange={changeLanguage} value={lang} name="" id="">
				<option value="RU">RU</option>
				<option value="UK">UA</option>
				<option value="EN">US</option>
			</select>
		</header>
	);
};

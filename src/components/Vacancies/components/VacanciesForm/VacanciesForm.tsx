import FormFields from "@/components/FormFields/FormFields";
import { FC, useContext } from "react";
import formCat from "@/shared/images/Form/MainForm/main-cat.png";
import s from "./VacanciesForm.module.scss";
import Image from "next/image";
import { GlobalContext } from "@/context";

interface VacanciesFormProps {
}

export const VacanciesForm: FC<VacanciesFormProps> = ({ }) => {
	const {formData} = useContext(GlobalContext);
	return (
        <section className={s.vacancies_form}>
            <h2 className={s.form_title}>{formData?.title}</h2>
			<div className={s.form_wrapper}>
				<Image className={s.form_cat} src={formCat} alt={"form cat"} />
				<FormFields />
			</div>
		</section>
	);
};

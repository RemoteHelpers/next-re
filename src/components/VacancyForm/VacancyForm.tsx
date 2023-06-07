import Image from "next/image";
import FormFields from "../FormFields/FormFields";
import styles from "./VacancyForm.module.scss";

import { PhotoAPI } from "@/constants";

export const VacancyForm = ({ formData, header }: any) => {
    return (
        <section className={styles.vacancy_wrapper}>
            <FormFields formData={formData} imageCatProps={header?.vacancyCat.data.attributes.url} coloredField={false} />
            <Image
                className={styles.vacancy_cat}
                src={PhotoAPI + header?.vacancyCat.data.attributes.url}
                alt="Vacancy-cat"
                width={450}
                height={365}
            />
        </section>
    );
};

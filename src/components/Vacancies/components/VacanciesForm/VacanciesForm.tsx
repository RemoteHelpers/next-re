import FormFields from '@/components/FormFields/FormFields';
import { FC } from 'react';
import formCat from '@/shared/images/Form/MainForm/main-cat.png';
import s from './VacanciesForm.module.scss';
import Image from 'next/image';
import type { IMainData } from '@/shared/types/GlobalTypes';

interface VacanciesFormProps {
  mainData: IMainData;
}

export const VacanciesForm: FC<VacanciesFormProps> = ({ mainData }) => {
  const { formData, header } = mainData;
  return (
    <section className={s.vacancies_form}>
      <h2 className={s.form_title}>{formData?.title}</h2>
      <div className={s.form_wrapper}>
        <Image className={s.form_cat} src={formCat} alt={'form cat'} />
        <FormFields
          imageCatProps={header?.vacancyCat.data.attributes.url}
          coloredField={true}
          formData={formData}
        />
      </div>
    </section>
  );
};

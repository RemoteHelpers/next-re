import Image from 'next/image';
import FormFields from '../FormFields/FormFields';
import styles from './MainForm.module.scss';
import mainCat from '@/shared/images/Form/MainForm/main-cat.png';
import type { IFormData } from '@/shared/types/FormTypes';

import { PhotoAPI } from '@/constants';

type Props = {
  formData: IFormData;
  formRef?: React.RefObject<HTMLElement>;
  imageCatProps: any;
};

const MainForm: React.FC<Props> = ({ formData, formRef, imageCatProps }) => {
  return (
    <section className={styles.container} ref={formRef}>
      <h2 className={styles.main_title}>{formData?.title}</h2>
      <main className={styles.main_wrapper}>
        <Image
          className={styles.main_cat}
          src={PhotoAPI + imageCatProps}
          alt="Main-cat"
          width={500}
          height={440}
        />
        <FormFields formData={formData} imageCatProps={imageCatProps} coloredField={true} />
      </main>
    </section>
  );
};

export default MainForm;

import Image from 'next/image';
import FormFields from '../FormFields/FormFields';
import styles from './MainForm.module.scss';

import { PhotoAPI } from '@/constants';
import type { IFormData } from '@/shared/types/FormTypes';

type Props = {
  formRef?: React.RefObject<HTMLElement>;
  imageCatProps: any;
  formData: IFormData;
};

const MainForm: React.FC<Props> = ({ formRef, imageCatProps, formData }) => {
  return (
    <section className={styles.container} ref={formRef}>
      <h2 className={styles.main_title}>{formData?.title}</h2>
      <main className={styles.main_wrapper}>
        {imageCatProps && (
          <Image
            className={styles.main_cat}
            src={PhotoAPI + imageCatProps}
            alt="Main-cat"
            width={500}
            height={440}
          />
        )}
        <FormFields imageCatProps={imageCatProps} coloredField={true} formData={formData} />
      </main>
    </section>
  );
};

export default MainForm;

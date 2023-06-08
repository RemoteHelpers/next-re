import Image from 'next/image';
import FormFields from '../FormFields/FormFields';
import styles from './MainForm.module.scss';
import mainCat from '@/shared/images/Form/MainForm/main-cat.png';
import { useContext } from 'react';
import { GlobalContext } from '@/context';

import { PhotoAPI } from '@/constants';

type Props = {
  formRef?: React.RefObject<HTMLElement>;
  imageCatProps: any;
};

const MainForm: React.FC<Props> = ({ formRef, imageCatProps }) => {
  const { formData } = useContext(GlobalContext);
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
        <FormFields imageCatProps={imageCatProps} coloredField={true} />
      </main>
    </section>
  );
};

export default MainForm;

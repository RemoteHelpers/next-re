import Image from 'next/image';
import FormFields from '../FormFields/FormFields';
import styles from './MainForm.module.scss';
import mainCat from '@/shared/images/Form/MainForm/main-cat.svg';
import type { IFormData } from '@/shared/types/FormTypes';

type Props = {
  formData: IFormData;
  formRef: React.RefObject<HTMLElement>;
};

const MainForm: React.FC<Props> = ({ formData, formRef }) => {
  return (
    <section className={styles.container} ref={formRef}>
      <h2 className={styles.main_title}>{formData?.title}</h2>
      <main className={styles.main_wrapper}>
        <Image className={styles.main_cat} src={mainCat} alt={'main cat'} />
        <FormFields formData={formData} />
      </main>
    </section>
  );
};

export default MainForm;

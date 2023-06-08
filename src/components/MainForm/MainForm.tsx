import Image from 'next/image';
import FormFields from '../FormFields/FormFields';
import styles from './MainForm.module.scss';
import mainCat from '@/shared/images/Form/MainForm/main-cat.png';
import { useContext } from 'react';
import { GlobalContext } from '@/context';

type Props = {
  formRef?: React.RefObject<HTMLElement>;
};

const MainForm: React.FC<Props> = ({ formRef }) => {
  const { formData } = useContext(GlobalContext);
  return (
    <section className={styles.container} ref={formRef}>
      <h2 className={styles.main_title}>{formData?.title}</h2>
      <main className={styles.main_wrapper}>
        <Image className={styles.main_cat} src={mainCat} alt={'main cat'} />
        <FormFields />
      </main>
    </section>
  );
};

export default MainForm;

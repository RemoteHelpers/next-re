import dynamic from 'next/dynamic';
import styles from "./Questions.module.scss";
const FAQ = dynamic(() => import('@/shared/components/FAQ'))

const Questions = ({ questions }: any) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.faq_title}>{questions?.faqTitle}</h1>
      <FAQ faqProps={questions.Faq_Question} />
    </section>
  );
};
export default Questions
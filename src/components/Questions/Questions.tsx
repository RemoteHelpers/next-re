import styles from "./Questions.module.scss";
import { FAQ } from "@/shared/components/FAQ";

export const Questions = ({ questions }: any) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.faq_title}>{questions?.faqTitle}</h1>
      <FAQ faqProps={questions.Faq_Question} />
    </section>
  );
};

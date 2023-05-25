import { FC, ReactNode } from 'react';
import { Collapse } from 'antd';
import styles from './Questions.module.scss';
import { QuestionVector } from '@/shared/components/IconComponents/Questions';
import type { IFaqQuestion, IHomeData } from '@/shared/types/HomeTypes';

type Props = {
  questions: IHomeData;
};

export const Questions: FC<Props> = ({ questions }) => {
  const { Panel } = Collapse;

  const concatTitle = (num: number, title: string, icon: ReactNode) => {
    return (
      <div className={styles.collapse_title}>
        <div className={styles.collapse_text}>
          <strong>0{num + 1}</strong>
          <h3>{title}</h3>
        </div>
        <div className="collapse_icon">{icon}</div>
      </div>
    );
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.faq_title}>{questions?.faqTitle}</h1>
      {questions.Faq_Question &&
        questions.Faq_Question.map((item: IFaqQuestion, index: number) => (
          <Collapse key={item.id} className={styles.collapse}>
            <Panel
              showArrow={false}
              header={concatTitle(index, item.Question, <QuestionVector id="vector" />)}
              key={item.id}
            >
              {item.Answer}
            </Panel>
          </Collapse>
        ))}
    </section>
  );
};

import { ReactNode } from "react";
import { Collapse } from "antd";
import styles from "./Questions.module.scss";
import { QuestionVector } from "@/shared/components/IconComponents/Questions";

export const Questions = ({ questions }: any) => {
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
      <h1>{questions?.faqTitle}</h1>
      {questions.Faq_Question &&
        questions.Faq_Question.map((item: any, index: number) => (
          <Collapse key={item.id} className={styles.collapse}>
            <Panel
              showArrow={false}
              header={concatTitle(
                index,
                item.Question,
                <QuestionVector id="vector" />
              )}
              key={item.id}
            >
              {item.Answer}
            </Panel>
          </Collapse>
        ))}
    </section>
  );
};

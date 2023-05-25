import { Collapse } from "antd";
import styles from "./FAQ.module.scss";
import { QuestionVector } from "@/shared/components/IconComponents/Questions";
import ReactMarkdown from "react-markdown";

const concatTitle = (num: number, title: string, icon: React.ReactNode) => {
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

export const FAQ = ({ faqProps }: any) => {
  const { Panel } = Collapse;
  return (
    <>
      {faqProps &&
        faqProps.map((item: any, index: number) => (
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
              <ReactMarkdown children={item.Answer} />
            </Panel>
          </Collapse>
        ))}
    </>
  );
};

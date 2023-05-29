import styles from "./Thankyou.module.scss";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { PhotoAPI } from "@/constants";
import Link from "next/link";

export const Thankyou = ({ thankyouData }: any) => {
  return (
    <section className={styles.container}>
      <div className={styles.thankyou_wrapper}>
        <main className={styles.info_wrapper}>
          <ReactMarkdown
            className={styles.title}
            children={thankyouData?.title}
          />
          <div className={styles.sub_text}>
            <div className={styles.sub_text_first}>
              <div className={styles.sub_text_flex}>
                <h2>{thankyouData?.subTitle}</h2>
                <p>{thankyouData?.paragraph}</p>
              </div>
              <Link href={"/videointerview"}>{thankyouData?.linkText}</Link>
            </div>
            <div className={styles.sub_text_second}>
              <div className={styles.sub_text_flex}>
                <h2>{thankyouData?.titleViber}</h2>
                <p>{thankyouData?.paragraphViber}</p>
              </div>
              <Link href={thankyouData?.buttonLink}>
                {thankyouData?.linkViber}
              </Link>
            </div>
          </div>
        </main>
        <div className={styles.image_wrapper}>
          <Image
            className={styles.cat}
            src={PhotoAPI + thankyouData?.thankYouCat?.data[0]?.attributes.url}
            alt={"Thank you cat"}
            width={390}
            height={480}
            quality={100}
          />
        </div>
      </div>
    </section>
  );
};

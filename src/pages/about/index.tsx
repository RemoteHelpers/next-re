import { FC } from "react";
import styles from "@/styles/_about/styles.module.scss";
import Layout from "@/components/Layout";

const About: FC = () => {
  return (
    <Layout>
      <h1 className={styles.title}>About Page</h1>
    </Layout>
  );
};

export default About;

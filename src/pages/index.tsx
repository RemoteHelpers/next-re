import Layout from "@/components/Layout";
import styles from "@/styles/_home/styles.module.scss";

export default function Home() {
  return (
    <>
      <Layout>
        <h1 className={styles.title}>Home Page</h1>
      </Layout>
    </>
  );
}

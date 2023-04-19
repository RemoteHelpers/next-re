import { useEffect, useContext, FC } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/_home/styles.module.scss";
import { GlobalContext } from "@/context/globalContext";

const Home: FC = () => {
  const { vacancies } = useContext(GlobalContext);

  useEffect(() => {
    console.log(vacancies);
  }, []);

  return (
    <>
      <Layout>
        <h1 className={styles.title}>Home Page</h1>
      </Layout>
    </>
  );
};

export default Home;

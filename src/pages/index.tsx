import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Questions } from "@/components/Questions";
import { getHomeData } from "@/services";

const Home: FC = ({ homeData }: any) => {
  return (
    <>
      <Layout>
        <h1>Home Page</h1>
        <Questions questions={homeData} />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale === "ua" ? "uk" : context.locale;
  const homeData = await getHomeData(lang);

  return {
    props: {
      homeData,
    },
  };
};

import { FC } from "react";
import { getHomeData } from "@/services";
import { Layout } from "@/components/Layout";
import { Questions } from "@/components/Questions";
import Testimonials from "@/components/Testimonials/Testimonials";

const Home: FC = ({ homeData }: any) => {
  return (
    <>
      <Layout>
        <Questions questions={homeData} />
        <Testimonials testimonials={homeData} />
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

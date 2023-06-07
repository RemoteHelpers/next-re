import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getFormData } from '@/services';
import { VideointerviewPage } from '@/components/VideoInterview';
import { getVideointerviewData } from '@/services';

const Videointerview: FC<any> = ({ categories, vacancies, videoData, formData }) => {
  return (
    <Layout headerData={{ categories, vacancies }}>
      <VideointerviewPage videoData={videoData} formData={formData} />
    </Layout>
  );
};

export default Videointerview;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const videoData = await getVideointerviewData(lang);
  const formData = await getFormData(lang);
  return {
    props: {
      categories,
      vacancies,
      videoData,
      formData
    },
  };
};

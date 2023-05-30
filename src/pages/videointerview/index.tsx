import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getFormData, getHeaderData } from '@/services';
import { VideointerviewPage } from '@/components/VideoInterview';
import { getVideointerviewData } from '@/services';

const Videointerview: FC<any> = ({ categories, vacancies, footerData, header, videoData, formData }) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <VideointerviewPage videoData={videoData} formData={formData} />
    </Layout>
  );
};

export default Videointerview;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const header = await getHeaderData(lang);
  const videoData = await getVideointerviewData(lang);
  const formData = await getFormData(lang);
  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
      videoData,
      formData
    },
  };
};

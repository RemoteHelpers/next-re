import { FC } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import type { IVideointerview, IHeader, IFormData } from '@/shared/types';
import styles from './Videointerview.module.scss';
import videoCat from '@/shared/images/Videointerview/videointerviewCat.png';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
const FAQ = dynamic(() => import('@/shared/components/FAQ'))
const MainForm = dynamic(() => import('../MainForm/MainForm'))


type Props = { videoData: IVideointerview; header: IHeader; formData: IFormData };
export const VideointerviewPage: FC<Props> = ({ videoData, header, formData }) => {

  return (
    <>
      <section className={styles.container}>
        <main className={styles.top_section}>
          <article>
            <h1 className={styles.title}>{videoData?.title}</h1>
            <ReactMarkdown
              children={videoData?.firstDescription}
              className={styles.first_description}
            />
            <Image src={videoCat} alt={'Video cat'} className={styles.mobile_cat} />
            <ReactMarkdown
              children={videoData?.secondDescription}
              className={styles.second_description}
            />
          </article>
          <Image src={videoCat} alt={'Video cat'} className={styles.video_cat} quality={100} />
        </main>
      </section>
      <div className={styles.main_section}>
        <div className={styles.block_container}>
          <div className={styles.faq_wrapper}>
            <h1 className={styles.faq_title}>{videoData?.videoFaqTitle}</h1>
            <FAQ faqProps={videoData.videointerview_faq} />
          </div>
        </div>
      </div>
      <div className={styles.instruction}>
        <div className={styles.block_container}>
          <div className={styles.instruction_wrapper}>
            <div className={styles.instruction_video}>
              <ReactPlayer
                className={styles.instruction_iframe}
                url={videoData?.firstVideo}
                controls
              />
            </div>
            <div className={styles.instruction_info}>
              <h2>{videoData?.secondTitle}</h2>
              <ReactMarkdown children={videoData?.thirdDescription} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.block_container}>
        {videoData?.videoList.length === 0 || (
          <div className={styles.video_examples}>
            <h2>{videoData?.thirdTitle}</h2>
            <div className={styles.video_examples_wrapper}>
              {videoData?.videoList.map((videoItem: any) => (
                <ReactPlayer
                  className={styles.instruction_iframe}
                  url={videoItem.videoLink}
                  key={videoItem.id}
                  controls
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.video_form}>
        <MainForm formData={formData} imageCatProps={header?.videoCat.data.attributes.url} />
      </div>
    </>
  );
};

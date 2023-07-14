import { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import type { IVideointerview, IHeader, IFormData } from '@/shared/types';
import styles from './Videointerview.module.scss';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
const FAQ = dynamic(() => import('@/shared/components/FAQ'))
const MainForm = dynamic(() => import('../MainForm/MainForm'))


type Props = { videoData: IVideointerview; header: IHeader; formData: IFormData };
export const VideointerviewPage: FC<Props> = ({ videoData, header, formData }) => {

  return (
    <>
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
                light={true}
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
                  light={true}
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

import { FC } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import type { IVideointerview } from '@/shared/types';
import styles from './VideointerviewHero.module.scss';
import videoCat from '@/shared/images/Videointerview/videointerviewCat.png';

type Props = { videoData: IVideointerview };
export const VideointerviewHero: FC<Props> = ({ videoData }) => {
  return (
    <section className={styles.container}>
      <div className={styles.top_section}>
        <article>
          <h1 className={styles.title}>{videoData?.title}</h1>
          <ReactMarkdown
            children={videoData?.firstDescription}
            className={styles.first_description}
          />
          <Image src={videoCat} alt={'Video cat'} className={styles.mobile_cat} priority />
          <ReactMarkdown
            children={videoData?.secondDescription}
            className={styles.second_description}
          />
        </article>
        <Image
          src={videoCat}
          alt={'Video cat'}
          className={styles.video_cat}
          quality={100}
          priority
        />
      </div>
    </section>
  );
};

import { FC, RefObject } from 'react';
import dynamic from 'next/dynamic';
import s from './AboutUs.module.scss';
import type { IAbout } from '@/shared/types/AboutTypes';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

type Props = {
  about: IAbout;
  pageTitle: string;
  formRef: RefObject<HTMLElement>;
};

const features = [
  {
    count: '300+',
    descr: 'сотрудников',
  },
  {
    count: '38+',
    descr: 'проектов',
  },
  {
    count: '99+',
    descr: 'клиентов',
  },
];

export const AboutUs: FC<Props> = ({ about, pageTitle, formRef }) => {
  const scrollToForm = (): void => {
    if (!formRef?.current) return;
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={s.section}>
      <div className={s.background} />

      <div className={s.container}>
        <h1 className={s.pageTitle}>{pageTitle}</h1>

        <div className={s.mainAboutBlock}>
          <div className={s.upperWrapper}>
            <div className={s.mainTextBlock}>
              <h2 className={s.title}>{about.aboutCompanyTitle}</h2>
              <p className={s.description}>{about.aboutCompanyDescription}</p>
            </div>

            {about.videoUrl ? (
              <div className={s.previewWrap}>
                <div className={s.playerWrap}>
                  <div className={s.previewBorder} />
                  <ReactPlayer className={s.videoPlayer} url={about.videoUrl} />
                </div>
              </div>
            ) : (
              <div className={s.catImgWrap} />
            )}
          </div>

          <div className={s.lowerWrapper}>
            <div className={s.mainTextBlock}>
              <h2 className={s.title}>{about.whyUsTitle}</h2>
              <p className={s.description}>{about.whyUsDescription}</p>

              <button type="button" className={s.joinBtn} onClick={scrollToForm}>
                {about.joinText}
              </button>
            </div>

            <div className={s.catImgWrap} />
          </div>
        </div>

        <ul className={s.features}>
          {features.map(({ count, descr }) => {
            return (
              <li key={`${count}_${descr}`} className={s.feature}>
                <h3 className={s.featureCount}>{count}</h3>
                <p className={s.featureDescr}>{descr}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

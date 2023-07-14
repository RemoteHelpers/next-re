import { FC, RefObject } from 'react';
import dynamic from 'next/dynamic';
import s from './AboutUs.module.scss';
import type { IAboutData, IAboutLocalization } from '@/shared/types/AboutTypes';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

type Props = { about: IAboutData; pageTitle: string; formRef: RefObject<HTMLElement>; };

const AboutUs: FC<Props> = ({ about, pageTitle, formRef }) => {
  const scrollToForm = (): void => {
    if (!formRef?.current) return;
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const findEnVideoUrl = () =>
    about.localizations.data.find(
      ({ attributes }: IAboutLocalization) => attributes.locale === 'en'
    )?.attributes.videoUrl;

  const videoUrl = about.videoUrl ? about.videoUrl : findEnVideoUrl();

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

            {videoUrl && (
              <div className={s.previewWrap}>
                <div className={s.playerWrap}>
                  <div className={s.previewBorder} />
                  <ReactPlayer className={s.videoPlayer} url={videoUrl} light={true} />
                </div>
              </div>
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
          {about.features.map(({ count, description }) => {
            return (
              <li key={`${count}_${description}`} className={s.feature}>
                <h3 className={s.featureCount}>{count}</h3>
                <p className={s.featureDescr}>{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AboutUs;

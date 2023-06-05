import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { IAbout } from '@/shared/types/AboutTypes';
import s from './AboutUs.module.scss';
import catAbout_S from './assets/aboutCat_small.svg';
import catAbout_L from './assets/aboutCat_large.svg';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { features } from 'process';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

type Props = {
  about: IAbout;
  pageTitle: string;
};

const tempData = {
  why: {
    title: 'Почему выбирают нас',
    descr:
      'Наша компания уже более трех лет предоставляет услуги в области IT технологий и маркетинга. Мы сотрудничаем с компаниями со всего мира и поддерживаем положительную репутацию на западном рынке труда.',
    btn: 'Присоединиться',
  },
  features: [
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
  ],
};

export const AboutUs: FC<Props> = ({ about, pageTitle }) => {
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

            {about.videoUrl && (
              <div className={s.previewWrap}>
                <div className={s.playerWrap}>
                  <div className={s.previewBorder} />
                  <ReactPlayer className={s.videoPlayer} url={about.videoUrl} />
                </div>
              </div>
            )}
          </div>

          <div className={s.lowerWrapper}>
            <div className={s.mainTextBlock}>
              <h2 className={s.title}>{about.whyUsTitle}</h2>
              <p className={s.description}>{about.whyUsDescription}</p>

              <button type="button" className={s.joinBtn}>
                {tempData.why.btn}
              </button>
            </div>

            <div className={s.catImgWrap} />
          </div>
        </div>

        <ul className={s.features}>
          {tempData.features.map(({ count, descr }) => {
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

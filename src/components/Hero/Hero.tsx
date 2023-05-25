import type { FC, RefObject } from 'react';
import { InfoBlock } from './components/InfoBlock';
import { DesignBlock } from './components/DesignBlock';
import s from './Hero.module.scss';
import type { IHomeData } from '@/shared/types/HomeTypes';

interface HeroProps {
  data: IHomeData;
  formRef: RefObject<HTMLElement>;
}

export const Hero: FC<HeroProps> = ({ data, formRef }) => {
  return (
    <section className={s.hero}>
      <div className={s.container}>
        <DesignBlock data={data} />
        <InfoBlock data={data} formRef={formRef} />
      </div>
    </section>
  );
};

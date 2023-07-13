import type { FC, RefObject } from 'react';
import s from './Hero.module.scss';
import type { IHomeData } from '@/shared/types/HomeTypes';
import { DesignBlock } from './components/DesignBlock';
import { InfoBlock } from './components/InfoBlock';

type Props = { data: IHomeData; formRef: RefObject<HTMLElement>; }
const Hero: FC<Props> = ({ data, formRef }) => {
  return (
    <section className={s.hero}>
      <div className={s.container}>
        <DesignBlock data={data} />
        <InfoBlock data={data} formRef={formRef} />
      </div>
    </section>
  );
};

export default Hero
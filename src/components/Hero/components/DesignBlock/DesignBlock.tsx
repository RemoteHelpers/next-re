import { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useWebAnimations from '@wellyshen/use-web-animations';
import Image from 'next/image';
import s from './DesignBlock.module.scss';
import type { IHeroStat, IHomeData } from '@/shared/types/HomeTypes';
import { StatItem } from './components/StatItem';
import crazy_cat from '@/shared/images/home/hero/crazy_cat.svg';
import like from '@/shared/icons/home/hero/like.svg';
import smile from '@/shared/icons/home/hero/smile.svg';
import globe from '@/shared/icons/home/hero/globe.svg';

const icons = [
  {
    name: 'like',
    src: like,
    animation: null as any,
  },
  {
    name: 'smile',
    src: smile,
    animation: null as any,
  },
  {
    name: 'globe',
    src: globe,
    animation: null as any,
  },
];

const circleAppearKeyframes = [
  {
    opacity: 0,
    transform: 'scale(0.3)',
    offset: 0,
  },
  {
    opacity: 1,
    offset: 0.3,
  },
  {
    transform: 'scale(1.1)',
    offset: 0.7,
  },
  {
    opacity: 1,
    transform: 'scale(1)',
    offset: 1,
  },
];
const circleAppearOpts: number | (KeyframeAnimationOptions & { pseudoElement?: string }) = {
  duration: 800,
  iterations: 1,
  easing: 'ease-in-out',
  fill: 'forwards',
};

const bgCircleAppearKeyframes = [
  {
    opacity: 0,
    transform: 'scale(0)',
  },
  {
    opacity: 0,
    transform: 'scale(0.3)',
    offset: 0.2,
  },
  {
    opacity: 1,
    offset: 0.44,
  },
  {
    transform: 'scale(1.1)',
    offset: 0.76,
  },
  {
    opacity: 1,
    transform: 'scale(1)',
    offset: 1,
  },
];
const bgCircleAppearOpts: number | (KeyframeAnimationOptions & { pseudoElement?: string }) = {
  duration: 1000,
  iterations: 1,
  easing: 'ease-in-out',
  fill: 'forwards',
};

const catAppearKeyframes = [
  {
    transform: 'translate(60%, 0%)',
    offset: 0,
    easing: 'ease-in-out',
  },
  {
    transform: 'translate(60%, 0%)',
    offset: 0.333,
    easing: 'ease-in-out',
  },
  {
    transform: 'translate(-55%, 0%)',
    offset: 0.57,
    easing: 'ease-in-out',
  },
  {
    transform: 'translate(-35%, 0%)',
    offset: 0.76,
    easing: 'ease-in-out',
  },
  {
    transform: 'translate(-45%, 0%)',
    offset: 1,
    easing: 'ease-in-out',
  },
];
const catAppearOpts: number | (KeyframeAnimationOptions & { pseudoElement?: string }) = {
  duration: 2000,
  iterations: 1,
  easing: 'ease-in-out',
  fill: 'forwards',
};

const rotateKeyframes = [
  {
    transform: 'rotate(0deg)',
  },
  {
    transform: 'rotate(360deg)',
  },
];
const rotateOpts: number | (KeyframeAnimationOptions & { pseudoElement?: string }) = {
  delay: 800,
  duration: 20000,
  iterations: 1,
  composite: 'add',
  easing: 'linear',
};

type Props = {
  data: IHomeData;
};

export const DesignBlock: FC<Props> = ({ data }) => {
  const router = useRouter();
  const circleRef = useRef<HTMLDivElement>(null);
  const bgCircleRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  /* animation for black circle */
  const circleAppearAnim = useWebAnimations<HTMLDivElement>({
    ref: circleRef,
  });
  const circleAnim = useWebAnimations<HTMLDivElement>({
    ref: circleRef,
  });
  for (let i = 0; i < icons.length; i++) {
    icons[i].animation = useWebAnimations<HTMLDivElement>({
      keyframes: rotateKeyframes,
      animationOptions: { ...rotateOpts, direction: 'reverse' },
    });
  }
  /* animation for blue background and a cat inside*/
  const bgCircleAppearAnim = useWebAnimations<HTMLDivElement>({
    ref: bgCircleRef,
  });
  const catAppearAnim = useWebAnimations<HTMLDivElement>({
    ref: catRef,
  });

  useEffect(() => {
    circleAppearAnim.getAnimation()?.finish();
    circleAppearAnim.animate({
      keyframes: circleAppearKeyframes,
      animationOptions: circleAppearOpts,
    });
    circleAnim.getAnimation()?.finish();
    circleAnim.animate({
      keyframes: rotateKeyframes,
      animationOptions: rotateOpts,
    });
    bgCircleAppearAnim.getAnimation()?.finish();
    bgCircleAppearAnim.animate({
      keyframes: bgCircleAppearKeyframes,
      animationOptions: bgCircleAppearOpts,
    });
    catAppearAnim.getAnimation()?.finish();
    catAppearAnim.animate({
      keyframes: catAppearKeyframes,
      animationOptions: catAppearOpts,
    });
    icons.forEach(icon => {
      icon.animation.getAnimation().finish();
      icon.animation.animate({
        keyframes: rotateKeyframes,
        animationOptions: {
          ...rotateOpts,
          direction: 'reverse',
        },
      });
    });
  }, [router.locale]);

  useEffect(() => {
    if (circleAnim.playState === 'finished') {
      circleAnim.animate({
        keyframes: rotateKeyframes,
        animationOptions: {
          ...rotateOpts,
          delay: 0,
        },
      });
    }
    icons.forEach(icon => {
      if (icon.animation.playState === 'finished') {
        icon.animation.animate({
          keyframes: rotateKeyframes,
          animationOptions: {
            ...rotateOpts,
            delay: 0,
            direction: 'reverse',
          },
        });
      }
    });
  }, [circleAnim, circleAnim.playState, icons]);

  return (
    <div className={s.design}>
      <div className={s.circle} ref={circleRef}>
        {data.heroStats.map((item: IHeroStat, index: number) => (
          <StatItem
            key={item.id}
            id={index + ''}
            image={item.heroStatIcon.data.attributes}
            value={item.heroStatValue}
            text={item.heroStatText}
          />
        ))}
        {icons.map(({ name, src, animation }) => (
          <div className={s.icon} id={s[name]} ref={animation?.ref} key={name}>
            <Image src={src} alt={name} />
          </div>
        ))}
      </div>
      <div className={s.bg_circle} ref={bgCircleRef}>
        <div className={s.cat} ref={catRef}>
          <Image src={crazy_cat} alt="cat"></Image>
        </div>
      </div>
    </div>
  );
};

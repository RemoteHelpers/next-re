import React from 'react';
import s from './Oops.module.scss';
import Image from 'next/image';
import sadCat from './assets/sad-cat.svg';

type Props = { vacanciesInfo: any };

export const Oops = ({ vacanciesInfo }: Props) => {
  return (
    <div className={s.container}>
      <p className={s.title}>{vacanciesInfo.oopsTitle}</p>
      <p className={s.description}>{vacanciesInfo.oopsDescription}</p>
      <Image className={s.catsImage} src={sadCat} alt="oops-cat"></Image>
    </div>
  );
};

import React from 'react';
import s from './BadRequest.module.scss';

type Props = {};

export const BadRequest = ({}: Props) => {
  return (
    <div className={s.container}>
      <p className={s.title}>Oops!</p>
      <p className={s.description}>It seems, that there is no matches by your request</p>
    </div>
  );
};

import { FC } from 'react';
import Image from 'next/image';
import designers from './assets/Illustrator.svg';
import developers from './assets/Developer.svg';
import translators from './assets/Translation.svg';
import managers from './assets/Management.svg';
import marketers from './assets/Marketing.svg';
import tutors from './assets/Tuition.svg';

type Props = {
  name: string;
};

export const HeaderIcon: FC<Props> = ({ name }) => {
  switch (name) {
    case 'left-arrow':
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 20L7 12L15 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'designers':
      return <Image src={designers} alt="designers"></Image>;
    case 'developers':
      return <Image src={developers} alt="developers"></Image>;
    case 'translators':
      return <Image src={translators} alt="translators"></Image>;
    case 'managers':
      return <Image src={managers} alt="managers"></Image>;
    case 'marketers':
      return <Image src={marketers} alt="marketers"></Image>;
    case 'tutors':
      return <Image src={tutors} alt="tutors"></Image>;

    default:
      return <></>;
  }
};

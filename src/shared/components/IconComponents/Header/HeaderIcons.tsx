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
    case 'internationalization':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
          <circle cx="39.5" cy="40" r="29" stroke="#FF6501" strokeWidth="4" />
          <path
            stroke="#FF6501"
            strokeWidth="4"
            d="M39 11.521c8.816 6.672 14.5 17.17 14.5 28.978 0 11.53-5.42 21.811-13.882 28.5"
          />
          <path
            stroke="#FF6501"
            strokeWidth="4"
            d="M39.007 12C30.773 18.689 25.5 28.97 25.5 40.5c0 11.987 5.2 21.846 14 28.5M11.5 30h55M11.5 50h55"
          />
        </svg>
      );

    default:
      return <></>;
  }
};

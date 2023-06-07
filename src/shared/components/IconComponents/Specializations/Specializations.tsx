import { FC } from 'react';
import Image from 'next/image';
import designers from './assets/designers.svg';
import developers from './assets/developers.svg';
import managers from './assets/managers.svg';
import marketers from './assets/marketers.svg';
import translators from './assets/translators.svg';
import tutors from './assets/tutors.svg';

type Props = {
  name: string;
};

export const SpecializationsIcon: FC<Props> = ({ name }) => {
  switch (name) {
    case 'designers':
      return <Image src={designers} alt={`${name} icon`} />;
    case 'developers':
      return <Image src={developers} alt={`${name} icon`} />;
    case 'managers':
      return <Image src={managers} alt={`${name} icon`} />;
    case 'marketers':
      return <Image src={marketers} alt={`${name} icon`} />;
    case 'translators':
      return <Image src={translators} alt={`${name} icon`} />;
    case 'tutors':
      return <Image src={tutors} alt={`${name} icon`} />;
    case 'arrow-more':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" fill="none">
          <path stroke="#FF6501" strokeLinecap="round" strokeLinejoin="round" d="m1 17 8-8-8-8" />
        </svg>
      );
    case 'arrow-prev':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none">
          <circle
            cx="25"
            cy="25"
            r="24"
            fill="#fbfbfd"
            strokeWidth="2"
            transform="rotate(180 25 25)"
          />
          <path d="M38 26a1 1 0 1 0 0-2v2Zm-25.707-1.707a1 1 0 0 0 0 1.414l6.364 6.364a1 1 0 0 0 1.414-1.414L14.414 25l5.657-5.657a1 1 0 0 0-1.414-1.414l-6.364 6.364ZM38 24H13v2h25v-2Z" />
        </svg>
      );
    case 'arrow-next':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none">
          <circle
            cx="25"
            cy="25"
            r="24"
            fill="#fbfbfd"
            strokeWidth="2"
            transform="matrix(1 0 0 -1 0 50)"
          />
          <path d="M12 26a1 1 0 1 1 0-2v2Zm25.707-1.707a1 1 0 0 1 0 1.414l-6.364 6.364a1 1 0 0 1-1.414-1.414L35.586 25l-5.657-5.657a1 1 0 0 1 1.414-1.414l6.364 6.364ZM12 24h25v2H12v-2Z" />
        </svg>
      );

    default:
      return <></>;
  }
};

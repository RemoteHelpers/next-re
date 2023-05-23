import { FC } from 'react';
import Image from 'next/image';
import designers from './assets/Illustrator.svg';
import developers from './assets/Developer.svg';
import translators from './assets/Translation.svg';
import managers from './assets/Management.svg';
import marketers from './assets/Marketing.svg';
import tutors from './assets/Tuition.svg';
import ua from './assets/Ukrainian.svg';
import pl from './assets/Polish.svg';
import en from './assets/English.svg';
import ruzz from './assets/ruzzian.svg';
import sk from './assets/Slovak.svg';

type Props = {
  name: string;
};

export const BurgerMenuIcon: FC<Props> = ({ name }) => {
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

export const LangSelectorIcon: FC<Props> = ({ name }) => {
  switch (name) {
    case 'internationalization':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0V0ZM20.647 7H17.426C16.705 5.32899 15.7556 3.76609 14.605 2.356C17.1515 3.04893 19.3223 4.71747 20.647 7ZM16.5 12C16.4918 13.0181 16.3314 14.0293 16.024 15H7.97601C7.66866 14.0293 7.50821 13.0181 7.50001 12C7.50821 10.9819 7.66866 9.97068 7.97601 9H16.024C16.3314 9.97068 16.4918 10.9819 16.5 12ZM8.77801 17H15.222C14.3732 18.6757 13.2882 20.2208 12 21.588C10.7114 20.2212 9.62625 18.676 8.77801 17ZM8.77801 7C9.62677 5.32427 10.7119 3.77916 12 2.412C13.2886 3.77877 14.3738 5.32396 15.222 7H8.77801ZM9.40001 2.356C8.24767 3.76578 7.29659 5.3287 6.57401 7H3.35301C4.67886 4.71643 6.85166 3.04775 9.40001 2.356ZM2.46101 9H5.90001C5.64076 9.97915 5.50636 10.9871 5.50001 12C5.50636 13.0129 5.64076 14.0209 5.90001 15H2.46101C1.84635 13.0472 1.84635 10.9528 2.46101 9ZM3.35301 17H6.57401C7.29659 18.6713 8.24767 20.2342 9.40001 21.644C6.85166 20.9522 4.67886 19.2836 3.35301 17ZM14.605 21.644C15.7556 20.2339 16.705 18.671 17.426 17H20.647C19.3223 19.2825 17.1515 20.9511 14.605 21.644ZM21.539 15H18.1C18.3592 14.0209 18.4936 13.0129 18.5 12C18.4936 10.9871 18.3592 9.97915 18.1 9H21.537C22.1517 10.9528 22.1517 13.0472 21.537 15H21.539Z" />
        </svg>
      );
    case 'uk':
      return <Image src={ua} alt="ukrainian flag icon" width={30}></Image>;
    case 'en':
      return <Image src={en} alt="english flag icon" width={30}></Image>;
    case 'ru':
      return <Image src={ruzz} alt="ruzzian icon" width={30}></Image>;
    case 'pl':
      return <Image src={pl} alt="polish flag icon" width={30}></Image>;
    case 'sk':
      return <Image src={sk} alt="slovak flag icon" width={30}></Image>;

    default:
      return <></>;
  }
};

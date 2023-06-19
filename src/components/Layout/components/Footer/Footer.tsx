import { FC, useContext } from 'react';
import s from './Footer.module.scss';
import Image from 'next/image';
import footerLogo from './assets/footerLogo.svg';
import Link from 'next/link';
import { FooterIcon } from '@/shared/components/IconComponents/Footer';
import { GlobalContext } from '@/context';
import type { IFooterData } from '@/shared/types/FooterTypes';
import type { IHeader } from '@/shared/types/HeaderTypes';
import type { IMenu } from '@/shared/types/HeaderTypes';

type Props = {
  footer: IFooterData;
};

export const Footer: FC<Props> = ({ footer }) => {
  const {
    setNavURL,
    header: { menu },
    // footer: footerData,
  } = useContext(GlobalContext);

  const footerData = footer;

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footer_info}>
          <Link href="/" onClick={() => setNavURL('/')}>
            <Image
              src={footerLogo}
              alt={'Remote Employees'}
              width={400}
              height={60}
              className={s.footer_logo}
            />
          </Link>
          <span className={s.line}></span>
          <div className={s.footer_links}>
            {menu?.map((link: IMenu) => {
              if (!link.path_id.trim()) return;
              return (
                <Link
                  key={link.path_id}
                  href={{
                    pathname: `${link.path_id}`,
                  }}
                  className={s.footer_link}
                  onClick={() => setNavURL(link.path_id)}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
          <div className={s.footer_contacts}>
            <p>{footerData?.footerAdress}</p>
            <p>{footerData?.footerMail}</p>
            <p>{footerData?.footerNumber}</p>
            <div className={s.footer_icons}>
              <Link
                href={{
                  pathname: footerData?.footerInsta,
                }}
                target="_blank"
              >
                <FooterIcon id="inst" />
              </Link>
              <Link
                href={{
                  pathname: footerData?.footerFB,
                }}
                target="_blank"
              >
                <FooterIcon id="facebook" />
              </Link>
              <Link
                href={{
                  pathname: `https://t.me/${footerData?.footerNumber}`,
                }}
                target="_blank"
              >
                <FooterIcon id="telegram" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

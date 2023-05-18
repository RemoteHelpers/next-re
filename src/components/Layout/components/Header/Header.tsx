import React, { FC, useCallback, useState } from 'react';
import s from './Header.module.scss';
import Image from 'next/image';
import re_logo from './assets/re_logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BurgerMenu } from './components/BurgerMenu';
import { SelectLang } from './components/SelectLang';
export interface INavItem {
  title: string;
  path: string;
}
export const navItems: INavItem[] = [
  {
    title: 'Вакансії',
    path: '/vacancies',
  },
  {
    title: 'Про нас',
    path: '/about',
  },
  {
    title: 'Контакти',
    path: '/contacts',
  },
  {
    title: "Відеоінтерв'ю",
    path: '/videointerview',
  },
];

type Props = {
  headerData: any;
};
export const Header: FC<Props> = ({ headerData }) => {
  console.log('headerData', headerData);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const { menu, chooseLangValue } = headerData.header;
  const router = useRouter();

  const comparePath = useCallback((currentPath: string, path: string): boolean => {
    return currentPath.split('/').at(-1) === path.split('/').at(-1);
  }, []);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link href="/" className={s.logo}>
          <Image src={re_logo} alt="RemotEmployees Logo" className={s.logoImg} />
          <p className={s.logoText}>
            <span className={s.logoName}>Remote Employees</span>
            <span className={s.logoDescr}>The outstaffing company</span>
          </p>
        </Link>

        <div className={s.controls}>
          <nav className={s.nav}>
            {menu.map(({ title, path_id }: any) => {
              if (!path_id.trim()) return;
              return (
                <Link
                  key={path_id}
                  href={{
                    pathname: `${path_id}`,
                  }}
                  className={
                    comparePath(router.pathname, path_id)
                      ? `${s.nav_item} ${s.active}`
                      : `${s.nav_item}`
                  }
                >
                  {title}
                </Link>
              );
            })}
          </nav>

          <SelectLang chooseLangValue={chooseLangValue} isBurgerMenu={isBurgerMenu} />

          <button
            type="button"
            onClick={() => setIsBurgerMenu(!isBurgerMenu)}
            className={isBurgerMenu ? s.burgerBtn_clicked : s.burgerBtn}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <BurgerMenu menuState={{ isBurgerMenu, setIsBurgerMenu }} headerData={headerData} />
    </header>
  );
};

import React, { FC, useCallback, useState, useContext } from 'react';
import s from './Header.module.scss';
import Image from 'next/image';
import re_logo from './assets/re_logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BurgerMenu } from './components/BurgerMenu';
import { SelectLang } from './components/SelectLang';
import { DesktopMenu } from './components/DesktopMenu';
import { GlobalContext } from '@/context';

type Props = {
  headerData: any;
};
export const Header: FC<Props> = ({ headerData }) => {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const [isDesktopMenuShown, setIsDesktopMenuShown] = useState(false);
  const { menu, chooseLangValue } = headerData.header;
  const router = useRouter();
  const { setNavURL } = useContext(GlobalContext);

  const openMenu = (path: string) => {
    if (path === 'vacancies' && !isDesktopMenuShown) setIsDesktopMenuShown(true);
  };

  const comparePath = useCallback((currentPath: string, path: string): boolean => {
    return currentPath.split('/').at(-1) === path.split('/').at(-1);
  }, []);

  return (
    <>
      <header
        className={isDesktopMenuShown ? s.headerWithMenu : s.header}
        onClick={() => setIsDesktopMenuShown(false)}
      >
        <div className={s.container}>
          <Link href="/" className={s.logo} onClick={() => setNavURL('/')}>
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
                    onClick={() => setNavURL(path_id)}
                    onMouseOver={() => openMenu(path_id)}
                    onTouchStart={() => openMenu(path_id)}
                  >
                    {title}
                  </Link>
                );
              })}
            </nav>

            <SelectLang chooseLangValue={chooseLangValue} isDesktopMenuShown={isDesktopMenuShown} />

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

      <DesktopMenu
        desktopMenuState={{ isDesktopMenuShown, setIsDesktopMenuShown }}
        headerData={headerData}
      />
    </>
  );
};

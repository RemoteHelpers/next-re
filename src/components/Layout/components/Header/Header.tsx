import { FC, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './Header.module.scss';
import re_logo from './assets/re_logo.svg';
import { BurgerMenu } from './components/BurgerMenu';
import { SelectLang } from './components/SelectLang';
import { DesktopMenu } from './components/DesktopMenu';
import type { ILayoutData, ICategory, IMenu } from '@/shared/types';

type Props = { categories: ICategory[]; layoutData: ILayoutData };

export const Header: FC<Props> = ({ categories, layoutData }) => {
  const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false);
  const [isDesktopMenuShown, setIsDesktopMenuShown] = useState<boolean>(false);
  const router = useRouter();
  const { header, setNavURL } = layoutData;

  const openMenu = (path: string): void => {
    if (path === 'vacancies' && !isDesktopMenuShown) setIsDesktopMenuShown(true);
  };

  const comparePath = useCallback(
    (currPathId: string, menuPathId: string): boolean => {
      if (!currPathId || !menuPathId) return false;
      const currPath = currPathId.split('/');
      const menuPath = menuPathId.split('/');
      return currPath[currPath.length - 1] === menuPath[menuPath.length - 1];
    },
    [header]
  );

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
              {header.menu.map(({ title, path_id }: IMenu) => {
                if (!path_id.trim()) return;
                return (
                  <Link
                    key={path_id}
                    href={`/${path_id}`}
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

            <SelectLang isDesktopMenuShown={isDesktopMenuShown} layoutData={layoutData} />

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

        <BurgerMenu
          menuState={{ isBurgerMenu, setIsBurgerMenu }}
          categories={categories}
          layoutData={layoutData}
        />
      </header>

      <DesktopMenu
        desktopMenuState={{ isDesktopMenuShown, setIsDesktopMenuShown }}
        categories={categories}
        layoutData={layoutData}
      />
    </>
  );
};

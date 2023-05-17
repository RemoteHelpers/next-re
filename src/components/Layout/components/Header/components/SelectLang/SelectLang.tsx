import React, { useState, useEffect } from 'react';
import s from './SelectLang.module.scss';
import { useRouter } from 'next/router';
import { LangSelectorIcon } from '@/shared/components/IconComponents/Header';

type Props = {
  chooseLangValue: string;
  isBurgerMenu: boolean;
};

type Languages = {
  lang: string;
  locale: string;
}[];

const languages: Languages = [
  {
    lang: 'русский',
    locale: 'ru',
  },
  {
    lang: 'Українська',
    locale: 'ua',
  },
  {
    lang: 'Polski',
    locale: 'pl',
  },
  {
    lang: 'English',
    locale: 'en',
  },
  {
    lang: 'Slovenský',
    locale: 'sk',
  },
];

export const SelectLang: React.FC<Props> = ({ chooseLangValue, isBurgerMenu }) => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string>(router.locale?.toUpperCase()!);
  const [isSelectorShown, setIsSelectorShown] = useState<boolean>(false);

  const hideLanguages = (): void => {
    if (isSelectorShown) setIsSelectorShown(false);
  };
  const handleSelection = (locale: string): void => {
    if (currentLang.toLowerCase() === locale) return;
    setCurrentLang(locale.toUpperCase());
    router.push(router.asPath, router.asPath, { locale });
    hideLanguages();
  };

  useEffect(() => {
    if (isBurgerMenu) hideLanguages();
    else if (document) {
      if (isSelectorShown) document.addEventListener('scroll', hideLanguages);
      else document.removeEventListener('scroll', hideLanguages);
    }
  }, [isSelectorShown, isBurgerMenu]);

  return (
    <div className={s.langSelector}>
      <button
        type="button"
        className={isSelectorShown ? s.mainBtn_clicked : s.mainBtn}
        onClick={() => setIsSelectorShown(!isSelectorShown)}
      >
        {currentLang}
        <LangSelectorIcon name="internationalization" />
      </button>

      <nav className={isSelectorShown ? s.menu_shown : s.menu}>
        <h3 className={s.langsTitle}>{chooseLangValue}</h3>

        <ul className={s.list}>
          {languages.map(({ lang, locale }) => {
            return (
              <li className={s.item} key={lang} id={lang} onClick={() => handleSelection(locale)}>
                <LangSelectorIcon name={locale} />

                <p className={s.language}>{lang}</p>

                <div className={s.plugBox}>
                  {locale === currentLang.toLowerCase() && <div className={s.plug}></div>}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

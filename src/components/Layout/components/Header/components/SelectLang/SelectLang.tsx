import { FC, useState, useEffect, useRef, useContext } from 'react';
import s from './SelectLang.module.scss';
import { useRouter } from 'next/router';
import { LangSelectorIcon } from '@/shared/components/IconComponents/Header';
import { GlobalContext } from '@/context';

type Props = {
  chooseLangValue: string;
  isDesktopMenuShown: boolean;
};

type Languages = {
  lang: string;
  locale: string;
}[];

const languages: Languages = [
  {
    lang: 'Українська',
    locale: 'uk',
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
  {
    lang: 'русский',
    locale: 'ru',
  },
];

export const SelectLang: FC<Props> = ({ chooseLangValue, isDesktopMenuShown }) => {
  const [isSelectorShown, setIsSelectorShown] = useState<boolean>(false);
  const [needAddListeners, setNeedAddListeners] = useState<boolean>(false);
  const [needRemoveListeners, setNeedRemoveListeners] = useState<boolean>(false);
  const { setIsLoading, currentLang, setCurrentLang } = useContext(GlobalContext);
  const router = useRouter();
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const langItemRef = useRef<HTMLLIElement>(null);

  const handleSelectBtn = () => {
    if (!isSelectorShown) {
      setIsSelectorShown(true);
      if (!needAddListeners) setNeedAddListeners(true);
    } else setIsSelectorShown(false);
  };

  const listenerHandler = ({ target }: Event): void => {
    if (target === langBtnRef.current || target === langItemRef.current) return;
    setNeedAddListeners(false);
    setNeedRemoveListeners(true);
    if (isSelectorShown) setIsSelectorShown(false);
  };

  const handleSelection = (locale: string): void => {
    if (currentLang.toLowerCase() === locale) return;
    setCurrentLang(locale === 'uk' ? 'UA' : locale.toUpperCase());
    router.replace(router.asPath, router.asPath, { locale });
    setIsSelectorShown(false);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!document) return;
    if (isSelectorShown) {
      document.addEventListener('mouseup', listenerHandler, { once: true });
      document.addEventListener('scroll', listenerHandler, { once: true });
    }
  }, [isSelectorShown, needRemoveListeners, needAddListeners]);

  useEffect(() => {
    if (isDesktopMenuShown) setIsSelectorShown(false);
  }, [isDesktopMenuShown]);

  return (
    <div className={s.langSelector}>
      <button
        ref={langBtnRef}
        type="button"
        className={isSelectorShown ? s.mainBtn_clicked : s.mainBtn}
        onClick={handleSelectBtn}
      >
        {currentLang}
        <LangSelectorIcon name="internationalization" />
      </button>

      <nav className={isSelectorShown ? s.menu_shown : s.menu}>
        <h3 className={s.langsTitle}>{chooseLangValue}</h3>

        <ul className={s.list}>
          {languages.map(({ lang, locale }) => {
            const uk = currentLang === 'UA' && 'uk';
            const isCurrentLocale =
              locale === uk ? true : locale === currentLang.toLowerCase() ? true : false;

            return (
              <li
                className={s.item}
                key={lang}
                id={lang}
                onClick={() => handleSelection(locale)}
                ref={langItemRef}
              >
                <LangSelectorIcon name={locale} />

                <p className={s.language}>{lang}</p>

                <div className={s.plugBox}>{isCurrentLocale && <div className={s.plug}></div>}</div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

import { FC, useState, useEffect, useRef } from 'react';
import s from './SelectLang.module.scss';
import { useRouter } from 'next/router';
import { LangSelectorIcon } from '@/shared/components/IconComponents/Header';
import type { ILanguage } from '@/shared/types/HeaderTypes';
import type { IGlobalData } from '@/shared/types/GlobalTypes';

type Props = { isDesktopMenuShown: boolean; globalData: IGlobalData };

export const SelectLang: FC<Props> = ({ isDesktopMenuShown, globalData }) => {
  const router = useRouter();
  const initialLang = router.locale === 'uk' ? 'UA' : router.locale!.toUpperCase();
  const [currentLang, setCurrentLang] = useState<string>(initialLang);
  const [isSelectorShown, setIsSelectorShown] = useState<boolean>(false);
  const [needAddListeners, setNeedAddListeners] = useState<boolean>(false);
  const [needRemoveListeners, setNeedRemoveListeners] = useState<boolean>(false);
  const { setIsLoading, header } = globalData;
  const { chooseLangValue, languagesList: languages } = header;
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

  const handleSelection = (selectedLocale: string): void => {
    if (currentLang.toLowerCase() === selectedLocale) return;
    setCurrentLang(selectedLocale === 'uk' ? 'UA' : selectedLocale.toUpperCase());
    router.replace(router.asPath, router.asPath, { locale: selectedLocale });
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
          {languages?.map(({ language, locale }: ILanguage) => {
            const uk = currentLang === 'UA' && 'uk';
            const isCurrentLocale =
              locale === uk ? true : locale === currentLang.toLowerCase() ? true : false;

            return (
              <li
                className={s.item}
                key={language}
                id={language}
                onClick={() => handleSelection(locale)}
                ref={langItemRef}
              >
                <LangSelectorIcon name={locale} />

                <p className={s.language}>{language}</p>

                <div className={s.plugBox}>{isCurrentLocale && <div className={s.plug}></div>}</div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

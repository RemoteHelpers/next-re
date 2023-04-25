import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '@/styles/_header/styles.module.scss';
import { changeLang } from '@/redux/language/langSlice';
import { selectLanguage } from '@/redux/language/langSelectors';

const Header: FC = () => {
  const dispatch = useDispatch();
  const lang = useSelector(selectLanguage);

  const changeLanguage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeLang(e.target.value));
  };

  return (
    <header className={styles.header}>
      <p>{lang}</p>

      <select onChange={changeLanguage} value={lang} name="" id="">
        <option value="RU">RU</option>
        <option value="UA">UA</option>
        <option value="US">US</option>
      </select>
    </header>
  );
};

export default Header;

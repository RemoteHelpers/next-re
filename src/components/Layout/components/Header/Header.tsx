import { FC, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLang } from '@/redux/language/langSlice';
import { selectLanguage } from '@/redux/language/langSelectors';
import { getVacancies } from '@/redux/vacancies/vacanciesOperations';
import { AppDispatch } from '@/redux/store';
import s from './Header.module.scss';
import { selectVacancies } from '@/redux/vacancies/vacanciesSelectors';
import axios from 'axios';

type Props = {};

export const Header: FC<Props> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector(selectLanguage);
  const vacanciesList = useSelector(selectVacancies);

  const changeLanguage = (e: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(changeLang(e.target.value));
  };

  useEffect(() => {
    dispatch(getVacancies(lang));
  }, [lang]);

  return (
    <header>
      <select onChange={changeLanguage} name="" id="">
        <option value="RU">RU</option>
        <option value="UK">UA</option>
        <option value="EN">US</option>
      </select>

      {vacanciesList &&
        vacanciesList.map((el: any) => {
          return <div key={el.id}>{el.attributes.title}</div>;
        })}
    </header>
  );
};

export async function getStaticProps() {
  console.log('entered getStaticProps');
  const lang = useSelector(selectLanguage);
  const dispatch = useDispatch<AppDispatch>();
  await dispatch(getVacancies(lang));
  const vacanciesList = useSelector(selectVacancies);
  return {
    props: {
      vacanciesList,
    },
    revalidate: 10,
  };
}

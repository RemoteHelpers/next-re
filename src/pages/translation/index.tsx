import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';
import type { IFooterData } from '@/shared/types/FooterTypes';
import type { IHeaderData } from '@/shared/types/HeaderTypes';
import type { GetServerSidePropsContext } from 'next';
import { createTranslator, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { FastIntl } from './components/FastIntl';

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`@/../translations/${locale}.json`)).default;
  // You can use the core (non-React) APIs when you have to use next-intl outside of components.
  const t = createTranslator({ locale, messages });
  return {
    title: t('Main.title'),
  };
}

type Messages = typeof import('@/../translations/en.json');
declare interface IntlMessages extends Messages {}
type Props = { translations: IntlMessages; footerData: IFooterData; headerData: IHeaderData };

export default function TranslationTest({ translations, footerData, headerData }: Props) {
  // console.log('translations', translations);
  // const [arrayOfItems, setArrayOfItems] = useState<[string][]>([]);
  // const locale = useLocale();
  // console.log('locale', locale);
  const [pluralValue, setPluralValue] = useState<number>(0);
  const [selectValue, setSelectValue] = useState<string>('');
  const [selectordinal, setSelectordinal] = useState<string | number>('one');
  const tTest = useTranslations('Test');
  const tArray = useTranslations('Array');
  const tList = useTranslations('Langs');
  const tItems = useTranslations('Langs.list');

  // const langKeys = Object.keys(translations.Langs?.list || {});
  const langValues = Object.values(translations.Langs?.list || {});

  const changePlural = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setPluralValue(+value);

  const changeSelect = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectValue(value);

  const changeSelectordinal = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setSelectordinal(value);

  return (
    <Layout footerData={footerData} headerData={headerData}>
      <div>
        {/* <FastIntl /> */}

        <div
          style={{
            borderBottom: '1px solid black',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1>Translation Page</h1>
            <br />

            <p>
              {tTest.rich('title', {
                name: 'MOTO',
                important: chunks => <b>{chunks}</b>,
                very: chunks => <i>{chunks}</i>,
              })}
            </p>
            <p>{tTest('description')}</p>
            {/* <p>{translations.Test.description}</p> */}
            <p>{tTest('info.count', { num: headerData.vacancies.length })}</p>
            <p>{tTest('variants.escaped')}</p>
          </div>

          <div style={{ borderLeft: '1px solid black', padding: '0 1rem' }}>
            <br />

            <h3>Числовий вибір</h3>
            <div style={{ display: 'flex' }}>
              <input type="number" onChange={changePlural} value={pluralValue} />
              <p>{tTest('variants.plural', { numMessages: pluralValue })}</p>
            </div>

            <h3>Варіанти на вибір</h3>
            <div style={{ display: 'flex' }}>
              <select onChange={changeSelect}>
                <option value="">Choose gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              <p>{tTest('variants.select', { gender: selectValue })}</p>
            </div>

            <h3>Множинні варіанти (або не працює, або не розумію як)</h3>
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                onChange={changeSelectordinal}
                value={selectordinal}
                placeholder="one | two | few | other"
              />

              <p>{tTest('variants.selectordinal', { year: selectordinal })}</p>
            </div>
          </div>
        </div>
        <br />

        <div style={{ borderBottom: '1px solid black' }}>
          <h2>Список масивів різної довжини</h2>
          <ul>
            {tArray.rich('items', {
              item: (chunks: any) => <li>{chunks}</li>,
            })}
          </ul>
          <br />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h2>{tList('heading')} (статична довжина)</h2>
            <ul>
              {['uk', 'en', 'pl', 'sk', 'ru'].map(lang => (
                <li key={lang} style={{ padding: '0.5rem' }}>
                  <p>{tItems(`${lang}.title`)}</p>
                  <p>{tItems(`${lang}.descr`)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>
              {translations.Langs?.heading} (<i>Можна плюнути і зробити так</i>)
            </h2>
            <ul>
              {langValues.length > 0 &&
                langValues.map(({ title, descr }: any, index) => (
                  <li key={index} style={{ padding: '0.5rem' }}>
                    <p>{title}</p>
                    <p>{descr}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const fetchVacancies = getAllVacancies(locale);
  const fetchFooterData = getFooterData(locale!);
  const fetchHeader = getHeaderData(locale!);
  const fetchCategories = getCategories(locale!);

  const [vacancies, footerData, header, categories] = await Promise.all([
    fetchVacancies,
    fetchFooterData,
    fetchHeader,
    fetchCategories,
  ]);

  return {
    props: {
      translations: (await import(`@/../translations/${locale}.json`)).default,
      footerData,
      headerData: {
        vacancies,
        header,
        categories,
      },
    },
  };
};

import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Languages = {
  descr: string;
  locale: string;
}[];

const languages: Languages = [
  {
    descr: 'Switch to UKRAINIAN',
    locale: 'uk',
  },
  {
    descr: 'Switch to POLISH',
    locale: 'pl',
  },
  {
    descr: 'Switch to ENGLISH',
    locale: 'en',
  },
  {
    descr: 'Switch to SLOVAKIAN',
    locale: 'sk',
  },
  {
    descr: 'Switch to ruzzian',
    locale: 'ru',
  },
];

export const FastIntl = () => {
  const router = useRouter();
  return (
    <>
      <nav>
        {languages.map((lang, i) => (
          <Link
            key={`${i}_${lang.descr}`}
            href={router.asPath}
            locale={lang.locale}
            style={{ padding: '1rem' }}
          >
            {lang.descr}
          </Link>
        ))}
      </nav>
    </>
  );
};

import type { AppProps } from 'next/app';
import '@/shared/styles/globals.scss';
import { GlobalProvider } from '@/context';
import Head from 'next/head';
import { useRouter } from 'next/router';

type LocalesLiteral = 'uk' | 'pl' | 'en' | 'sk' | 'ru';
type AppMetadata = {
  common: {
    viewport: string;
    icon: string;
    og: {
      type: string;
    };
    article: {
      modifiedTime: string;
    };
    twitter: {
      card: string;
    };
  };
} & Record<
  LocalesLiteral,
  {
    title: string;
    description: string;
    canonical: string;
    og: {
      locale: string;
      title: string;
      description: string;
      url: string;
      siteName: string;
      image: string;
    };
    twitter: {
      label1: string;
      data1: string;
    };
  }
>;

const appMetadata: AppMetadata = {
  common: {
    viewport: 'width=device-width, initial-scale=1',
    icon: '/favicon.ico',

    og: {
      type: 'website',
    },

    article: {
      modifiedTime: Date.now().toString(),
    },

    twitter: {
      card: 'summary_large_image',
    },
  },

  uk: {
    title: 'Аутстафінгова Компанія України - RemotEmployees!',
    description:
      'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
    canonical: 'https://r-ez.com/ua/',

    og: {
      locale: 'uk_UA',
      title: 'Аутстафінгова Компанія України - RemotEmployees!',
      description:
        'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
      url: 'https://r-ez.com/ua/',
      siteName: 'RemotEmployeesUA',
      image: 'https://ua.remotemployees.com/wp-content/uploads/2022/05/Frame-30.svg',
    },

    twitter: {
      label1: 'Прибл. час читання',
      data1: '94 хвилини',
    },
  },

  en: {
    title: 'Аутстафінгова Компанія України - RemotEmployees!',
    description:
      'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
    canonical: 'https://r-ez.com/ua/',

    og: {
      locale: 'uk_UA',
      title: 'Аутстафінгова Компанія України - RemotEmployees!',
      description:
        'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
      url: 'https://r-ez.com/ua/',
      siteName: 'RemotEmployeesUA',
      image: 'https://ua.remotemployees.com/wp-content/uploads/2022/05/Frame-30.svg',
    },

    twitter: {
      label1: 'Прибл. час читання',
      data1: '94 хвилини',
    },
  },

  pl: {
    title: 'Аутстафінгова Компанія України - RemotEmployees!',
    description:
      'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
    canonical: 'https://r-ez.com/ua/',

    og: {
      locale: 'uk_UA',
      title: 'Аутстафінгова Компанія України - RemotEmployees!',
      description:
        'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
      url: 'https://r-ez.com/ua/',
      siteName: 'RemotEmployeesUA',
      image: 'https://ua.remotemployees.com/wp-content/uploads/2022/05/Frame-30.svg',
    },

    twitter: {
      label1: 'Прибл. час читання',
      data1: '94 хвилини',
    },
  },

  sk: {
    title: 'Аутстафінгова Компанія України - RemotEmployees!',
    description:
      'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
    canonical: 'https://r-ez.com/ua/',

    og: {
      locale: 'uk_UA',
      title: 'Аутстафінгова Компанія України - RemotEmployees!',
      description:
        'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
      url: 'https://r-ez.com/ua/',
      siteName: 'RemotEmployeesUA',
      image: 'https://ua.remotemployees.com/wp-content/uploads/2022/05/Frame-30.svg',
    },

    twitter: {
      label1: 'Прибл. час читання',
      data1: '94 хвилини',
    },
  },

  ru: {
    title: 'Аутстафінгова Компанія України - RemotEmployees!',
    description:
      'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
    canonical: 'https://r-ez.com/ua/',

    og: {
      locale: 'uk_UA',
      title: 'Аутстафінгова Компанія України - RemotEmployees!',
      description:
        'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
      url: 'https://r-ez.com/ua/',
      siteName: 'RemotEmployeesUA',
      image: 'https://ua.remotemployees.com/wp-content/uploads/2022/05/Frame-30.svg',
    },

    twitter: {
      label1: 'Прибл. час читання',
      data1: '94 хвилини',
    },
  },
};

function App({ Component, pageProps }: AppProps) {
  const locale = useRouter().locale! as LocalesLiteral;

  return (
    <GlobalProvider>
      <Head>
        <title>{appMetadata[locale].title}</title>
        <meta name="description" content={appMetadata[locale].description} />
        <meta name="viewport" content={appMetadata.common.viewport} />
        <link rel="icon" href={appMetadata.common.icon} />
        <link rel="canonical" href={appMetadata[locale].canonical} />
        <meta property="og:locale" content={appMetadata[locale].og.locale} />
        <meta property="og:type" content={appMetadata.common.og.type} />
        <meta property="og:title" content={appMetadata[locale].og.title} />
        <meta property="og:description" content={appMetadata[locale].og.description} />
        <meta property="og:url" content={appMetadata[locale].og.url} />
        <meta property="og:site_name" content={appMetadata[locale].og.siteName} />
        <meta property="article:modified_time" content={appMetadata.common.article.modifiedTime} />
        {/* дата останніх змін */}
        <meta property="og:image" content={appMetadata[locale].og.image} />
        <meta name="twitter:card" content={appMetadata.common.twitter.card} />
        <meta name="twitter:label1" content={appMetadata[locale].twitter.label1} />
        <meta name="twitter:data1" content={appMetadata[locale].twitter.data1} />
      </Head>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default App;

import { AppMetadata } from '@/shared/types/MetadataTypes';

const time = new Date();

export const appMetadata: AppMetadata = {
  common: {
    viewport: 'width=device-width, initial-scale=1',
    icon: '/favicon.ico',

    og: {
      type: 'website',
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

    article: {
      modifiedTime: time.toISOString(), // у форматі ISO: "2023-05-09T09:38:09+00:00"
    },

    twitter: {
      label1: 'Прибл. час читання',
      data1: '94 хвилини',
    },
  },

  pl: {
    title: 'Outstaffingowa firma Ukrainy - RemotEmployees!',
    description:
      'Outstaffingowa firma RemotEmployees oferuje Ci pracę zdalną przy międzynarodowych projektach, możliwość pracy z dowolnego miejsca na świecie!',
    canonical: 'https://r-ez.com/pl/',

    og: {
      locale: 'pl_PL',
      title: 'Outstaffingowa firma Ukrainy - RemotEmployees!',
      description:
        'Outstaffingowa firma RemotEmployees oferuje Ci pracę zdalną przy międzynarodowych projektach, możliwość pracy z dowolnego miejsca na świecie!',
      url: 'https://r-ez.com/pl/',
      siteName: 'RemotEmployeesPL',
      image: 'http://pl.remotemployees.com/wp-content/uploads/2022/05/Frame-34.svg',
    },

    article: {
      modifiedTime: time.toISOString(), // у форматі ISO: "2023-05-09T09:38:09+00:00"
    },

    twitter: {
      label1: 'Est. reading time',
      data1: '78 minutes',
    },
  },

  en: {
    title: 'Ukrainian outstaffing company - RemotEmployees EN',
    description:
      'Ukrainian outstaffing company working in the field of marketing, web development and design offers a job in IT remotely.',
    canonical: 'https://r-ez.com/en/',

    og: {
      locale: 'en_US',
      title: 'Ukrainian outstaffing company - RemotEmployees EN',
      description:
        'Ukrainian outstaffing company working in the field of marketing, web development and design offers a job in IT remotely.',
      url: 'https://r-ez.com/en/',
      siteName: 'RemotEmployees EN',
      image: 'http://en.remotemployees.com/wp-content/uploads/2021/06/achievement.svg',
    },

    article: {
      modifiedTime: time.toISOString(), // у форматі ISO: "2023-05-09T09:38:09+00:00"
    },

    twitter: {
      label1: 'Est. reading time',
      data1: '80 minutes',
    },
  },

  sk: {
    title: 'Outstaffingova spoločnosť - RemotEmployees SK',
    description:
      'Outstaffingová spoločnosť RemotEmployees vám ponúka prácu na diaľku na medzinárodných projektoch, možnosť pracovať odkiaľkoľvek na svete!',
    canonical: 'https://r-ez.com/sk/',

    og: {
      locale: 'sk_SK',
      title: 'Outstaffingova spoločnosť - RemotEmployees SK',
      description:
        'Outstaffingová spoločnosť RemotEmployees vám ponúka prácu na diaľku na medzinárodných projektoch, možnosť pracovať odkiaľkoľvek na svete!',
      url: 'https://r-ez.com/sk/',
      siteName: 'RemotEmployees SK',
      image: 'http://sk.remotemployees.com/wp-content/uploads/2022/05/Tablet.svg',
    },

    article: {
      modifiedTime: time.toISOString(), // у форматі ISO: "2023-05-09T09:38:09+00:00"
    },

    twitter: {
      label1: 'Est. reading time',
      data1: '78 minutes',
    },
  },

  ru: {
    title: 'Аутстаффинговая Компания Украины - Получи работу!',
    description:
      'Аутстаффинговая компания Украины, работающая в сфере маркетинга, web разработки и дизайна предлагает Вам перспективную работу в IT удаленно.',
    canonical: 'https://r-ez.com/',

    og: {
      locale: 'ru_RU',
      title: 'Аутстаффинговая Компания Украины - Получи работу!',
      description:
        'Аутстаффинговая компания Украины, работающая в сфере маркетинга, web разработки и дизайна предлагает Вам перспективную работу в IT удаленно.',
      url: 'https://r-ez.com/',
      siteName: 'RemotEmployees',
      image: 'http://www.remotemployees.com/wp-content/uploads/2022/05/Frame_32.svg',
    },

    article: {
      modifiedTime: time.toISOString(), // у форматі ISO: "2023-05-09T09:38:09+00:00"
    },

    twitter: {
      label1: 'Est. reading time',
      data1: '77 minutes',
    },
  },
};

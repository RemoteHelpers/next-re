import { AppMetadata } from '@/shared/types/MetadataTypes';
const time = new Date();
const baseURL = 'https://r-ez.com/';

export const appMetadata: AppMetadata = {
  uk: {
    title: 'Аутстафінгова Компанія України - RemotEmployees!',
    description:
      'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
    canonical: `${baseURL}uk/`,

    og: {
      locale: 'uk_UA',
      title: 'Аутстафінгова Компанія України - RemotEmployees!',
      description:
        'Аутстафінгова компанія RemotEmployees пропонує Вам дистанційну роботу на міжнародних проектах, можливість працювати з будь-якої точки світу!',
      url: `${baseURL}uk/`,
      siteName: 'RemotEmployees',
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
    canonical: `${baseURL}pl/`,

    og: {
      locale: 'pl_PL',
      title: 'Outstaffingowa firma Ukrainy - RemotEmployees!',
      description:
        'Outstaffingowa firma RemotEmployees oferuje Ci pracę zdalną przy międzynarodowych projektach, możliwość pracy z dowolnego miejsca na świecie!',
      url: `${baseURL}pl/`,
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
    title: 'Ukrainian outstaffing company - RemotEmployees',
    description:
      'Ukrainian outstaffing company working in the field of marketing, web development and design offers a job in IT remotely.',
    canonical: `${baseURL}en/`,

    og: {
      locale: 'en_GB',
      title: 'Ukrainian outstaffing company - RemotEmployees',
      description:
        'Ukrainian outstaffing company working in the field of marketing, web development and design offers a job in IT remotely.',
      url: `${baseURL}en/`,
      siteName: 'RemotEmployees EN',
      image: 'http://en.remotemployees.com/wp-content/uploads/2021/06/achievement.svg',
    },

    article: {
      modifiedTime: time.toISOString(), // todo у форматі ISO: "2023-05-09T09:38:09+00:00"
    },

    twitter: {
      label1: 'Est. reading time',
      data1: '80 minutes',
    },
  },

  sk: {
    title: 'Outstaffingova spoločnosť - RemotEmployees',
    description:
      'Outstaffingová spoločnosť RemotEmployees vám ponúka prácu na diaľku na medzinárodných projektoch, možnosť pracovať odkiaľkoľvek na svete!',
    canonical: `${baseURL}sk/`,

    og: {
      locale: 'sk_SK',
      title: 'Outstaffingova spoločnosť - RemotEmployees',
      description:
        'Outstaffingová spoločnosť RemotEmployees vám ponúka prácu na diaľku na medzinárodných projektoch, možnosť pracovať odkiaľkoľvek na svete!',
      url: `${baseURL}sk/`,
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
    title: 'Аутстаффинговая Компания Украины - RemotEmployees!',
    description:
      'Аутстаффинговая компания Украины, работающая в сфере маркетинга, web разработки и дизайна предлагает Вам перспективную работу в IT удаленно.',
    canonical: `${baseURL}`,

    og: {
      locale: 'ru_RU',
      title: 'Аутстаффинговая Компания Украины - RemotEmployees!',
      description:
        'Аутстаффинговая компания Украины, работающая в сфере маркетинга, web разработки и дизайна предлагает Вам перспективную работу в IT удаленно.',
      url: `${baseURL}`,
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

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'uk', 'pl', 'sk', 'ru'],
  defaultLocale: 'ru',

  // domains: [
  //   {
  //     domain: 'ru.localhost:3000',
  //     defaultLocale: 'ru',
  //   },
  //   {
  //     domain: 'en.localhost:3000',
  //     defaultLocale: 'en',
  //   },
  //   {
  //     domain: 'uk.localhost:3000',
  //     defaultLocale: 'uk',
  //   },
  //   {
  //     domain: 'pl.localhost:3000',
  //     defaultLocale: 'pl',
  //   },
  //   {
  //     domain: 'sk.localhost:3000',
  //     defaultLocale: 'sk',
  //   },
  // ],
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'uk', 'ru', 'sk', 'pl'],
    defaultLocale: 'ru',
    localeDetection: false,
    // domains: [
    //   {
    //     domain: 'localhost:3000',
    //     locales: ['ru'],
    //   },
    //   {
    //     domain: 'en.localhost:3000',
    //     locale: 'en',
    //   },
    //   {
    //     domain: 'uk.localhost:3000',
    //     locale: 'uk',
    //   },
    //   {
    //     domain: 'pl.localhost:3000',
    //     locale: 'pl',
    //   },
    //   {
    //     domain: 'sk.localhost:3000',
    //     locale: 'sk',
    //   },
    // ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.rem-s.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

// const withNextIntl = require('next-intl/plugin')();
// module.exports = withNextIntl({
//   reactStrictMode: true,
//   i18n: {
//     locales: ['en', 'uk', 'ru', 'sk', 'pl'],
//     defaultLocale: 'ru',
//     localeDetection: false,
//     // domains: [
//     //   {
//     //     domain: 'localhost:3000',
//     //     defaultLocale: 'ru',
//     //   },
//     //   {
//     //     domain: 'en.localhost:3000',
//     //     defaultLocale: 'en',
//     //   },
//     //   {
//     //     domain: 'uk.localhost:3000',
//     //     defaultLocale: 'uk',
//     //   },
//     //   {
//     //     domain: 'pl.localhost:3000',
//     //     defaultLocale: 'pl',
//     //   },
//     //   {
//     //     domain: 'sk.localhost:3000',
//     //     defaultLocale: 'sk',
//     //   },
//     // ],
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'strapi.rem-s.com',
//         pathname: '/**',
//       },
//     ],
//   },
//   // rewrites() {
//   //   return [
//   //     {
//   //       source: '/uk/about',
//   //       destination: '/uk/uaaboutua',
//   //     },
//   //   ];
//   // },
// });

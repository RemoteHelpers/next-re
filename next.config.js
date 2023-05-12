/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ua', 'ru'],
    defaultLocale: 'ru',
    localeDetection: false,
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

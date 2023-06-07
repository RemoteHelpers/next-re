/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'uk', 'ru', 'sk', 'pl'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.rem-s.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

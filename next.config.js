/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["en", "ua", "ru"],
		defaultLocale: "ru",
		domains: [
			{
				domain: "localhost",
				defaultLocale: "ru",
			},
			{
				domain: "localhost",
				defaultLocale: "en",
			},
			{
				domain: "localhost",
				defaultLocale: "ua",
			},
		],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "strapi.rem-s.com",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;

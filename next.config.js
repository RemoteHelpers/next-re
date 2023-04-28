/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["en", "uk", "ru"],
		defaultLocale: "ru",
	},
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    fontLoaders: [
      { loader: '@next/font/goole', options: { subsets: ['latin'] } },
    ],
  },
}

module.exports = nextConfig

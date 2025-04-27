const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    appDir: true, // Enable the app directory
  },
});


module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
};
const withImages = require('next-images')
module.exports = withImages()

module.exports = nextConfig;

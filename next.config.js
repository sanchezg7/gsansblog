const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // SSG
  // assetPrefix: isProd ? '/gsansblog/' : '',
  // basePath: isProd ? '/gsansblog' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;
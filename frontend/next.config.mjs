/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProduction ? '/moa-note' : '',
  trailingSlash: true,
};


export default nextConfig;

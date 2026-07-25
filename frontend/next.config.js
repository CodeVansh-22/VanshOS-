/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion'],
  },
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com', 'via.placeholder.com'],
    minimumCacheTTL: 86400,
  },
};

module.exports = nextConfig;

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  pageExtensions: ["jsx"],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    autoPrerender: false,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js"],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  presets: ["next/babel"],
};

module.exports = nextConfig;

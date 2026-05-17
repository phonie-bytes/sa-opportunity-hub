/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Fixed for GitHub Pages deployment
  basePath: '/power-save-sa',
  assetPrefix: '/power-save-sa/',
};

export default nextConfig;

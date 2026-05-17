/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If you are deploying to a GitHub Project page (e.g. username.github.io/repo-name/),
  // you must set the 'basePath' to your repository name.
  // basePath: '/your-repo-name',
};

export default nextConfig;

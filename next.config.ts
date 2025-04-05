import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'components'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};

export default nextConfig;

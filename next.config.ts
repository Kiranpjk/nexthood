import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Self-contained server bundle in .next/standalone, used by the Dockerfile.
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

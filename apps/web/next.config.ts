import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['next'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
